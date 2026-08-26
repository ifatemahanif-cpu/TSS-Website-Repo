/**
 * The homepage hero's CMS-editable copy, in one place.
 *
 * The hero itself is a scripted film whose lines live in the Hero component.
 * What the CMS drives is everything around the film: the headline search
 * engines read, the subheading behind it, and the two buttons it rests on.
 *
 * WHY THIS IS VERSIONED
 *
 * The hero has been rewritten several times, and each rewrite left its own row
 * in the database. Because the stored row is read over the component's
 * defaults, a retired hero kept resurfacing on top of the new one — most
 * recently a "How we work →" button belonging to a version that still had a
 * brand ticker under it. Two things kept that alive: the seed merged the old
 * value forward instead of replacing it, and the build-time prerender reads
 * the *live* API, so a deploy would snapshot the outgoing hero's copy into the
 * incoming hero's static HTML.
 *
 * So the version is checked in both directions. The seed replaces any row that
 * isn't current, and the component ignores any row that isn't current. Copy
 * edited in the admin keeps the current version number, so it survives both.
 *
 * Bump HERO_VERSION when the shipped hero copy below changes.
 */
export const HERO_VERSION = 4;

/**
 * v4 is the scroll-carve hero. The film is no longer a timed sequence of two
 * headlines; it is one sentence that cuts itself down to "We shape stories." as
 * the reader scrolls, and every word of the last line is already in the first.
 *
 * So `heading` is now the END of the film and `subheading` is its BEGINNING —
 * which is also the right way round for a search engine, since the short line
 * is the claim and the long one is the description. And there is one button
 * rather than two: the film has just said what this is, and a second link
 * printed under it is the film explaining itself.
 *
 * `secondaryCta*` stays in the shape because the admin form and the stored rows
 * still carry it. Nothing renders it.
 */
export const HERO_CONTENT = {
  version: HERO_VERSION,
  heading: "We shape stories.",
  headingLine2: "The Story Shapers is a senior-led marketing collective.",
  subheading:
    "We are a full-service, senior-led marketing collective that helps ambitious companies shape brand strategy, positioning, content and go-to-market stories that genuinely land.",
  ctaText: "Start a conversation",
  ctaLink: "#act-close",
  secondaryCtaText: "What we do",
  secondaryCtaLink: "#services",
};

export type HeroContent = typeof HERO_CONTENT;

/**
 * The stored hero row, but only if it was written for the hero that is
 * currently shipping. Anything older is discarded in favour of HERO_CONTENT.
 */
export function currentHero(stored: unknown): HeroContent {
  const row = stored as Partial<HeroContent> | undefined;
  return row?.version === HERO_VERSION ? { ...HERO_CONTENT, ...row } : HERO_CONTENT;
}
