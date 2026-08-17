import path from "path";
import { pathToFileURL } from "url";

/**
 * Renders script/og-offer.html to client/public/offer-opengraph.jpg at
 * 1200x630 — the share card that Slack, WhatsApp, LinkedIn and X show for
 * /offer.
 *
 * Run manually after editing the card: `npm run og:offer`. Deliberately NOT
 * part of the build: the output is committed, so a build never depends on
 * Chrome being launchable or on Google Fonts being reachable.
 */

const OUT = path.resolve(
  process.cwd(),
  "client",
  "public",
  "offer-opengraph.jpg",
);
const SRC = path.resolve(process.cwd(), "script", "og-offer.html");

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
