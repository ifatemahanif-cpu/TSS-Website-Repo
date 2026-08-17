import path from "path";
import { pathToFileURL } from "url";

/**
 * Renders a script/og-*.html source to a 1200x630 jpg in client/public — the
 * share cards that Slack, WhatsApp, LinkedIn and X show when a page is posted.
 *
 * Run manually after editing a card: `npm run og:home` / `npm run og:offer`.
 * Deliberately NOT part of the build: the output is committed, so a build
 * never depends on Chrome being launchable or on Google Fonts being reachable.
 *
 * When a card's artwork changes, bump the ?v= on its meta tags too. Every
 * social platform caches unfurls by URL and will keep serving the old picture
 * for weeks otherwise — see client/index.html.
 */

const CARDS = {
  home: { src: "og-home.html", out: "opengraph.jpg" },
  offer: { src: "og-offer.html", out: "offer-opengraph.jpg" },
} as const;

const card = process.argv[2] as keyof typeof CARDS;
if (!card || !(card in CARDS)) {
  console.error(
    `[og] usage: tsx script/render-og.ts <${Object.keys(CARDS).join("|")}>`,
  );
  process.exit(1);
}

const OUT = path.resolve(process.cwd(), "client", "public", CARDS[card].out);
const SRC = path.resolve(process.cwd(), "script", CARDS[card].src);

async function getBrowser() {
  const puppeteer = await import("puppeteer-core");
  if (process.platform === "darwin") {
    return puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    });
  }
  const chromium = (await import("@sparticuz/chromium")).default;
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

async function main() {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    // deviceScaleFactor 2 so the type stays crisp where a client renders the
    // card larger than 1200px wide; the jpg is downscaled by every consumer.
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(SRC).href, { waitUntil: "networkidle0" });
    // networkidle0 fires when the stylesheet lands, not when the webfonts have
    // painted. Without this the card renders in Georgia and Helvetica.
    await page.evaluate("document.fonts.ready");
    await page.screenshot({ path: OUT, type: "jpeg", quality: 92 });
    console.log(`[og] wrote ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[og] failed:", err);
  process.exit(1);
});
