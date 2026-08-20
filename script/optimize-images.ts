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
 * Two sizes come out of each source:
 *   /img/<id>.webp     up to 1600px — article heroes and in-body pictures
 *   /img/<id>.sm.webp  up to 480px  — listing cards, related thumbs, avatars
 *
 * Anything missing here falls back to /api/images/<id> on the client, so a post
 * published between builds still shows its picture; the deploy hook that fires
 * on publish then generates the static copies a couple of minutes later.
 */
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import type { Page } from "puppeteer-core";

const FULL_EDGE = 1600;
const SMALL_EDGE = 480;
const QUALITY = 0.82;

/** Re-encoding these would flatten an animation or rasterise a vector. */
const PASSTHROUGH = new Set(["image/gif", "image/svg+xml"]);

/**
 * Every /api/images/<id> the public site can ask for: post hero images, pictures
 * inside post bodies, and author portraits.
 */
export async function collectImageIds(origin: string): Promise<number[]> {
  const ids = new Set<number>();
  const add = (value: unknown) => {
    if (typeof value !== "string") return;
    for (const m of value.matchAll(/\/api\/images\/(\d+)/g)) ids.add(Number(m[1]));
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

  return [...ids].sort((a, b) => a - b);
}

/**
 * Draws one source image into a canvas at each target width and returns the
 * encoded bytes. Runs inside the page so it is same-origin with the proxied API
 * and the canvas is never tainted.
 *
 * Evaluate code is passed as a string on purpose: tsx/esbuild injects a __name
 * helper into serialized functions that does not exist in the browser.
 */
async function encode(page: Page, id: number): Promise<{ full: string; small: string; type: string } | null> {
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

    const draw = (maxEdge) => {
      const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      // WebP carries alpha, so transparent logos stay transparent — the reason
      // this does not just re-encode everything to JPEG.
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", ${QUALITY}).split(",")[1];
    };

    const out = { full: draw(${FULL_EDGE}), small: draw(${SMALL_EDGE}), type };
    bitmap.close();
    return out;
  })()`);

  if (!result || (result as any).skip) return null;
  return result as { full: string; small: string; type: string };
}

export async function optimizeImages(page: Page, origin: string, dist: string): Promise<number> {
  const ids = await collectImageIds(origin);
  console.log(`[images] ${ids.length} referenced images to optimise`);

  const outDir = path.join(dist, "img");
  await mkdir(outDir, { recursive: true });

  let written = 0;
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const id of ids) {
    let encoded;
    try {
      encoded = await encode(page, id);
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
    written++;
  }

  console.log(
    `[images] wrote ${written} of ${ids.length} (${(outputBytes / 1048576).toFixed(2)} MB of static copies)`,
  );
  return written;
}
