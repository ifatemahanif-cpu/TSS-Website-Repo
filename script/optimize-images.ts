/**
 * Builds small, static copies of the CMS images.
 *
 * Uploaded images live as base64 in Postgres and are handed back by
 * /api/images/:id at whatever size they arrived. Nothing ever resized the ones
 * already in there, so a single article page was pulling 15–20 MB of originals —
 * including a 9 MB photograph behind a sixty-pixel thumbnail. That weight, not
 * the loading strategy, is why pictures crawled in one at a time.
 *
 * The obvious fix is to shrink the stored rows, but that needs the database
 * password, and this project's DATABASE_URL is marked Sensitive in Vercel, which
 * makes it write-only by design. So this shrinks them at build time instead and
 * writes the results to dist/public/img/, where they are served as ordinary
 * static files off the CDN. The originals in the database are never touched,
 * which also means there is nothing to back up and nothing to undo.
 *
 * WHY CANVAS AND NOT SHARP
 *
 * Same reason the upload path uses it: the serverless handler is bundled by
 * esbuild into a committed api/server.cjs with everything off the allowlist
 * marked external, and adding a native module to that path is a deploy risk.
 * Prerendering already runs headless Chrome, so a canvas is right there, and it
 * is the exact technique already proven in client/src/lib/image-upload.ts.
 *
 * Three sizes come out of each source:
 *   /img/<id>.webp     longest edge up to 1600 — article heroes, body pictures
 *   /img/<id>.sm.webp  longest edge up to 480  — listing cards, thumbs, avatars
 *   /img/<id>.lg.webp  WIDTH up to 1600        — portraits, and only portraits
 *
 * WHY THE THIRD ONE EXISTS, AND WHY IT MEASURES WIDTH.
 *
 * A cap on the LONGEST edge is a cap on the height of a tall photograph, and
 * the height is not what a portrait card is short of. Aakanksha's is 3000x4500;
 * capped at 1600 on its longest edge it comes out 1067 wide. Her /team card
 * draws it into a ~510px box, crops to 4:3, then applies transform: scale(1.45)
 * to bring her to the same distance as the two head-and-shoulders cards beside
 * her. On a retina screen that is 510 x 1.45 x 2 = 1479 device pixels of width,
 * against 1067 available — the browser would invent the difference, and the one
 * portrait on the page that is already zoomed would be the one that looked
 * soft. Measured with live/imgneed.mjs across desktop@2x and phone@3x: 1479px
 * is the widest requirement anywhere on the team and portfolio pages, so 1600
 * clears every one of them with room to spare.
 *
 * It is a separate variant rather than a change to the existing rule because
 * six blog images are portrait AND already at the 1600 height cap; widening the
 * rule for everyone would have grown all six for no one's benefit. /blog is
 * 0.45 MB and is not a problem that needs solving twice.
 *
 * Anything missing here falls back to /api/images/<id> on the client, so a post
 * published between builds still shows its picture; the deploy hook that fires
 * on publish then generates the static copies a couple of minutes later.
 *
 * SEPARATELY, optimizeStaticAssets() below handles the OTHER kind of image on
 * this site — see its own note.
 */
import path from "path";
import { mkdir, writeFile, readdir, stat } from "fs/promises";
import type { Page } from "puppeteer-core";

const FULL_EDGE = 1600;
const SMALL_EDGE = 480;
/** A WIDTH cap. Everything else here caps the longest edge; this one does not. */
const WIDE_WIDTH = 1600;
const QUALITY = 0.82;

/** Re-encoding these would flatten an animation or rasterise a vector. */
const PASSTHROUGH = new Set(["image/gif", "image/svg+xml"]);

/**
 * Every /api/images/<id> the public site can ask for.
 *
 * `portraits` is the subset reached through the portfolios API — the /team
 * cards and the three personal pages. Those are the ones that get the extra
 * width-capped variant, because they are the only place a stored photograph is
 * drawn as a tall portrait and then zoomed into.
 *
 * Portfolios were missing here entirely until 25 Aug 2026. It was a defensible
 * gap while those three pages had one internal link each; the footer rework put
 * them in the map on every page, and /team was measured at 4.71 MB against
 * /blog's 0.45 MB — the heaviest page on the site by a factor of ten.
 */
export async function collectImageIds(
  origin: string,
): Promise<{ all: number[]; portraits: number[] }> {
  const ids = new Set<number>();
  const portraits = new Set<number>();
  const add = (value: unknown, into?: Set<number>) => {
    if (typeof value !== "string") return;
    for (const m of value.matchAll(/\/api\/images\/(\d+)/g)) {
      ids.add(Number(m[1]));
      into?.add(Number(m[1]));
    }
  };

  let page = 1;
  let totalPages = 1;
  do {
    const res = await fetch(`${origin}/api/blog/posts?limit=100&page=${page}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`posts HTTP ${res.status}`);
    const data = await res.json();
    for (const post of data.posts ?? []) {
      add(post.featuredImage);
      add(post.content);
      add(post.excerpt);
    }
    totalPages = data.totalPages ?? 1;
    page++;
  } while (page <= totalPages);

  const authors = await fetch(`${origin}/api/blog/authors`, { headers: { accept: "application/json" } });
  if (authors.ok) for (const a of await authors.json()) add(a.photo);

  /* THE PUBLIC PAIR, not /api/cms/portfolios — that one is behind requireAuth
     and answers 401 to a build, which is exactly how the first version of this
     silently skipped every portrait. `summaries` is what /team renders from;
     the per-slug row is what each personal page renders from and is the only
     place the case pictures, brand logos and about photos appear.

     Whole rows are stringified rather than named fields because all of it is
     nested JSON and any part of it can hold an /api/images/<id>. */
  const summaries = await fetch(`${origin}/api/portfolios/summaries`, {
    headers: { accept: "application/json" },
  });
  if (!summaries.ok) {
    console.warn(`[images] portfolio summaries HTTP ${summaries.status} — portrait sizes skipped`);
  } else {
    const rows = await summaries.json();
    add(JSON.stringify(rows), portraits);
    for (const row of rows) {
      if (!row?.slug) continue;
      const one = await fetch(`${origin}/api/cms/portfolios/${row.slug}`, {
        headers: { accept: "application/json" },
      });
      if (one.ok) add(JSON.stringify(await one.json()), portraits);
      else console.warn(`[images] portfolio ${row.slug} HTTP ${one.status}`);
    }
  }

  return {
    all: [...ids].sort((a, b) => a - b),
    portraits: [...portraits].sort((a, b) => a - b),
  };
}

/**
 * Draws one source image into a canvas at each target width and returns the
 * encoded bytes. Runs inside the page so it is same-origin with the proxied API
 * and the canvas is never tainted.
 *
 * Evaluate code is passed as a string on purpose: tsx/esbuild injects a __name
 * helper into serialized functions that does not exist in the browser.
 */
async function encode(
  page: Page,
  id: number,
  wide: boolean,
): Promise<{ full: string; small: string; wide: string | null; type: string } | null> {
  const result = await page.evaluate(`(async () => {
    const res = await fetch("/api/images/${id}");
    if (!res.ok) return null;
    const type = res.headers.get("content-type") || "";
    if (${JSON.stringify([...PASSTHROUGH])}.includes(type)) return { skip: true, type };

    const blob = await res.blob();
    let bitmap;
    try {
      bitmap = await createImageBitmap(blob);
    } catch {
      return null;
    }

    const at = (scale) => {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      // WebP carries alpha, so transparent logos stay transparent — the reason
      // this does not just re-encode everything to JPEG.
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", ${QUALITY}).split(",")[1];
    };
    // never upscale: a source narrower than the cap is already its own best copy
    const draw = (maxEdge) => at(Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height)));
    const drawWide = (maxWidth) => at(Math.min(1, maxWidth / bitmap.width));

    const out = {
      full: draw(${FULL_EDGE}),
      small: draw(${SMALL_EDGE}),
      wide: ${wide} ? drawWide(${WIDE_WIDTH}) : null,
      type,
    };
    bitmap.close();
    return out;
  })()`);

  if (!result || (result as any).skip) return null;
  return result as { full: string; small: string; wide: string | null; type: string };
}

export async function optimizeImages(page: Page, origin: string, dist: string): Promise<number> {
  const { all, portraits } = await collectImageIds(origin);
  const isPortrait = new Set(portraits);
  console.log(
    `[images] ${all.length} referenced images to optimise (${portraits.length} portrait)`,
  );

  const outDir = path.join(dist, "img");
  await mkdir(outDir, { recursive: true });

  let written = 0;
  let outputBytes = 0;

  for (const id of all) {
    let encoded;
    try {
      encoded = await encode(page, id, isPortrait.has(id));
    } catch (err) {
      console.warn(`[images] #${id} could not be read, leaving it on the API:`, (err as Error).message);
      continue;
    }
    if (!encoded) continue;

    const full = Buffer.from(encoded.full, "base64");
    const small = Buffer.from(encoded.small, "base64");
    await writeFile(path.join(outDir, `${id}.webp`), full);
    await writeFile(path.join(outDir, `${id}.sm.webp`), small);
    outputBytes += full.length + small.length;

    if (encoded.wide) {
      const wide = Buffer.from(encoded.wide, "base64");
      await writeFile(path.join(outDir, `${id}.lg.webp`), wide);
      outputBytes += wide.length;
    }
    written++;
  }

  console.log(
    `[images] wrote ${written} of ${all.length} (${(outputBytes / 1048576).toFixed(2)} MB of static copies)`,
  );
  return written;
}

/* ---------------------------------------------------------------------------
   THE OTHER KIND OF IMAGE ON THIS SITE

   Everything above is /api/images/<id> — base64 rows in Postgres. But the team
   and portfolio portraits are mostly NOT those. server/seedPortfolios.ts seeds
   plain path strings like "/assets/54b8c761-…jpg" into the portfolios table,
   and build.ts copies attached_assets/ wholesale into dist/public/assets/. So
   they are ordinary static files whose URLs happen to live in the database, and
   imageSrc() never sees them because they do not match /api/images/<id>.

   That is where most of the weight actually was. Of /team's 4.71 MB, 2.07 MB
   was one file: attached_assets/54b8c761-…jpg, a 3024x4032 photograph drawn
   into a 510px card.

   These are resized IN dist, in place, keeping the same filename and the same
   format. Same filename because the URL is stored in the database and cannot be
   rewritten from here; same format because Vercel sets content-type from the
   extension, so WebP bytes served as .jpg would simply fail to decode. The
   sources in attached_assets/ are never touched, which is the same bargain the
   CMS pass makes: nothing to back up, nothing to undo, and a rebuild restores
   the whole thing from scratch.
   --------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
   A FILE ALREADY <= WIDE_WIDTH IS LEFT EXACTLY AS IT ARRIVED, AND ONE FILE
   DEPENDS ON THAT.

   attached_assets/54b8c761-…jpg — Fatema's portrait — is deliberately checked in
   at exactly 1600px wide, pre-resized and pre-sharpened, so this pass skips it
   and its pixels reach the browser untouched.

   That is not fussiness. The canvas downscale below is a single drawImage from
   3024px to 1600px, and measured against a Lanczos resample of the same source
   it loses about 21% of the image's fine detail — enough that the portrait read
   as visibly hazy next to the other two Shapers. Both obvious repairs were
   tried and are WORSE, not better: imageSmoothingQuality "high" and stepped
   halving each land at 68% of the source's detail against this path's 79%.
   Chrome's high-quality filter is a smoother low-pass; it is more correct and
   it looks softer. Do not "fix" the resize — it has already been measured.

   So the repair lives in the file: resized with Lanczos and sharpened offline,
   then encoded at q82 to land on 297KB, which is the 285KB it replaced. If that
   file is ever re-exported ABOVE 1600px wide, this pass will grab it and quietly
   undo all of that. The 3024x4032 master is in git history.
   --------------------------------------------------------------------------- */

/** Re-encodable raster formats, mapped to the mime the canvas must emit back. */
const STATIC_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function optimizeStaticAssets(page: Page, dist: string): Promise<number> {
  const dir = path.join(dist, "assets");
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return 0;
  }

  let touched = 0;
  let saved = 0;

  for (const name of names) {
    const mime = STATIC_TYPES[path.extname(name).toLowerCase()];
    if (!mime) continue;

    const file = path.join(dir, name);
    const before = (await stat(file)).size;
    /* Below this a re-encode is churn: the decode, the resize and the encode
       all cost build time, and there is no page to speed up at the other end. */
    if (before < 150 * 1024) continue;

    let out: string | null;
    try {
      out = (await page.evaluate(
        `(async () => {
          const res = await fetch("/assets/${encodeURIComponent(name)}");
          if (!res.ok) return null;
          const bitmap = await createImageBitmap(await res.blob());
          if (bitmap.width <= ${WIDE_WIDTH}) { bitmap.close(); return null; }

          const scale = ${WIDE_WIDTH} / bitmap.width;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(bitmap.width * scale);
          canvas.height = Math.round(bitmap.height * scale);
          canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          bitmap.close();
          // PNG ignores the quality argument and stays lossless, which is what
          // keeps a transparent logo transparent rather than matted onto black.
          return canvas.toDataURL(${JSON.stringify(mime)}, ${QUALITY}).split(",")[1];
        })()`,
      )) as string | null;
    } catch (err) {
      console.warn(`[assets] ${name} could not be read, left as it is:`, (err as Error).message);
      continue;
    }
    if (!out) continue;

    const buf = Buffer.from(out, "base64");
    /* A re-encode is not guaranteed to be smaller — a screenshot PNG can come
       back heavier than it went in. Only keep the new one if it actually won. */
    if (buf.length >= before) continue;

    await writeFile(file, buf);
    saved += before - buf.length;
    touched++;
  }

  console.log(
    `[assets] resized ${touched} static file(s), ${(saved / 1048576).toFixed(2)} MB saved`,
  );
  return touched;
}
