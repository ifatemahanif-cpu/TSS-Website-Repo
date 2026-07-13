import express from "express";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";

/**
 * Prerenders the public routes of the built SPA to static HTML so that
 * search engines and AI crawlers (which do not execute JavaScript) can
 * read the page content.
 *
 * How it works: serves dist/public locally, proxies /api/* to the
 * production API so CMS-backed sections render with real content, then
 * snapshots each route with headless Chrome and writes the result to
 * dist/public/<route>/index.html. Vercel serves those static files
 * before the SPA rewrite kicks in.
 *
 * If Chrome cannot be launched (e.g. an unexpected build environment),
 * the step logs a warning and the build continues as a plain SPA.
 */

const PROD_API = "https://www.storyshaperscollective.com";
const PORT = 45173;
const DIST = path.resolve(process.cwd(), "dist", "public");

// Per-route head overrides. Pages whose components already set their own
// document.title (team, portfolios) are left as rendered.
const ROUTES: Array<{
  route: string;
  title?: string;
  description?: string;
}> = [
  { route: "/" },
  {
    route: "/our-story",
    title: "Our Story | The Story Shapers",
    description:
      "How three senior marketers left the agency and corporate ladder to build a collective that does brand strategy the way they always knew it should be done.",
  },
  { route: "/team" },
  {
    route: "/contact",
    title: "Contact | The Story Shapers",
    description:
      "Tell us where things feel off. We'll tell you what we see and where to begin. Get in touch with The Story Shapers.",
  },
  {
    route: "/join",
    title: "Join the Collective | The Story Shapers",
    description:
      "The Story Shapers is a collective of senior strategists who've chosen to work together instead of alone. Here's what being a collaborator looks like.",
  },
  {
    route: "/blog",
    title: "Blog | The Story Shapers",
    description:
      "Notes on brand strategy, positioning, messaging and content systems from The Story Shapers collective.",
  },
  { route: "/fatema" },
  { route: "/shaili" },
  { route: "/aakanksha" },
];

async function getBrowser() {
  if (process.platform === "darwin") {
    const puppeteer = await import("puppeteer-core");
    return puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    });
  }
  // Linux (Vercel build container): use the serverless-compatible Chromium build
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = await import("puppeteer-core");
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

function startServer(): Promise<{ close: () => void }> {
  const app = express();

  // Proxy API calls to production so CMS content renders at build time
  app.use("/api", async (req, res) => {
    try {
      const upstream = await fetch(`${PROD_API}/api${req.url}`, {
        headers: { accept: "application/json" },
      });
      res.status(upstream.status);
      res.set("content-type", upstream.headers.get("content-type") ?? "application/json");
      res.send(Buffer.from(await upstream.arrayBuffer()));
    } catch (err) {
      res.status(502).json({ error: "prerender proxy failed" });
    }
  });

  app.use(express.static(DIST));
  app.use((_req, res) => res.sendFile(path.join(DIST, "index.html")));

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => resolve({ close: () => server.close() }));
  });
}

export async function prerender() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    console.warn("[prerender] dist/public/index.html not found, skipping");
    return;
  }

  const serverHandle = await startServer();
  let browser;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const { route, title, description } of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      // Evaluate code is passed as strings: tsx/esbuild injects a __name
      // helper into serialized functions that doesn't exist in the browser.

      // Trigger scroll-based reveal animations so nothing is frozen hidden
      await page.evaluate(`(async () => {
        await new Promise((done) => {
          let y = 0;
          const step = () => {
            y += 600;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 80);
            else done();
          };
          step();
        });
        window.scrollTo(0, 0);
      })()`);
      await new Promise((r) => setTimeout(r, 800));

      // Per-route head: canonical always, title/description where the SPA
      // doesn't manage them itself
      const headParams = JSON.stringify({
        route,
        title: title ?? null,
        description: description ?? null,
      });
      await page.evaluate(`(({ route, title, description }) => {
        const origin = "https://www.storyshaperscollective.com";
        const canonicalHref = origin + (route === "/" ? "/" : route);
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.setAttribute("rel", "canonical");
          document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", canonicalHref);
        document.querySelector('meta[property="og:url"]')
          ?.setAttribute("content", canonicalHref);

        if (title) {
          document.title = title;
          document.querySelector('meta[property="og:title"]')
            ?.setAttribute("content", title);
          document.querySelector('meta[name="twitter:title"]')
            ?.setAttribute("content", title);
        }
        if (description) {
          document.querySelector('meta[name="description"]')
            ?.setAttribute("content", description);
          document.querySelector('meta[property="og:description"]')
            ?.setAttribute("content", description);
          document.querySelector('meta[name="twitter:description"]')
            ?.setAttribute("content", description);
        }
      })(${headParams})`);

      const html =
        "<!DOCTYPE html>\n" +
        (await page.evaluate("document.documentElement.outerHTML"));

      const outPath =
        route === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, route.slice(1), "index.html");
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf-8");
      console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), outPath)} (${(html.length / 1024).toFixed(0)}kb)`);
    }
  } finally {
    if (browser) await browser.close();
    serverHandle.close();
  }
}
