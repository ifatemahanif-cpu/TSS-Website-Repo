/**
 * Points CMS image URLs at the small static copies the build produces.
 *
 * /api/images/<id> serves whatever was originally uploaded — for the older rows
 * that is a photograph of several megabytes, handed over to fill a card or a
 * sixty-pixel thumbnail. script/optimize-images.ts writes resized WebP copies to
 * /img/ during the build, and this is what makes the site ask for those.
 *
 * Anything that is not a CMS image URL is returned untouched, so bundled assets
 * and remote URLs pass straight through.
 */

/**
 * Widest the image will ever be drawn.
 *
 *   sm    cards, thumbnails, avatars      longest edge <= 480
 *   full  article heroes, body pictures   longest edge <= 1600
 *   lg    portraits                       WIDTH <= 1600
 *
 * "lg" is not "bigger than full", it is measured differently, and only the
 * team and portfolio portraits should ask for it. A tall photograph capped on
 * its longest edge is capped on its HEIGHT, which leaves a 3000x4500 portrait
 * 1067px wide — narrower than the ~1479 device pixels Aakanksha's zoomed /team
 * card needs, so it would visibly soften. See script/optimize-images.ts, which
 * only emits .lg.webp for images the portfolios API refers to.
 */
export type ImageSize = "full" | "sm" | "lg";

const CMS_IMAGE = /^\/api\/images\/(\d+)$/;
const SUFFIX: Record<ImageSize, string> = { full: "", sm: ".sm", lg: ".lg" };

export function imageSrc(src: string | null | undefined, size: ImageSize = "full"): string {
  if (!src) return "";
  const match = CMS_IMAGE.exec(src);
  if (!match) return src;
  return `/img/${match[1]}${SUFFIX[size]}.webp`;
}

/**
 * onError handler that falls back to the original API URL.
 *
 * A post published since the last build has no static copy yet — the deploy hook
 * will generate one within a couple of minutes, but its picture has to show in
 * the meantime. The guard stops a genuinely missing image from looping.
 */
export function fallbackToOriginal(src: string | null | undefined) {
  return (event: { currentTarget: HTMLImageElement }) => {
    const img = event.currentTarget;
    if (!src || img.dataset.fellBack === "true") return;
    img.dataset.fellBack = "true";
    img.src = src;
  };
}

/**
 * Same fallback for images inside post bodies, which are raw HTML run through
 * DOMPurify and so cannot carry an inline handler. Called on the rendered
 * container after the article paints.
 */
export function applyBodyImageFallbacks(container: HTMLElement | null) {
  if (!container) return;
  for (const img of Array.from(container.querySelectorAll("img"))) {
    const original = img.dataset.originalSrc;
    if (!original || img.dataset.fellBack === "true") continue;

    const revert = () => {
      if (img.dataset.fellBack === "true") return;
      img.dataset.fellBack = "true";
      img.src = original;
    };

    // The browser starts fetching these the moment the HTML is injected, which
    // is before this runs. One that has already failed by now will never fire
    // another error event, so listening alone silently misses it — the finished
    // -but-empty case has to be caught by inspection instead.
    if (img.complete && img.naturalWidth === 0) revert();
    else img.addEventListener("error", revert, { once: true });
  }
}
