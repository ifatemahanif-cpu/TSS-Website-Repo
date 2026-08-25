# Home-rework review — 25 Aug 2026

Full-codebase review of branch `home-rework` (9 commits ahead of `full-v1`, nothing
pushed) through three lenses: gaps/problems in the new design, UI/UX and the user
journey, and SEO. Verdict first, then findings ranked by impact. Each finding says
what to do, so this doc is the execution list.

**Verdict: the port is sound and mergeable. Nothing here is a "stop the merge"
defect in the six acts themselves.** The two high items are (1) a mobile
first-paint problem created by the interaction between the new hero and the
prerender pipeline, and (2) the absence of any mobile navigation — pre-existing,
but the new design makes it expensive. Everything else is medium or cleanup.

What was already verified before this review and does NOT need re-doing: full
scroll sweeps in all four size/motion combos (acts in order, one h1, alts
present, no overflow, no page errors), twelve widths 320–1920 for overflow, all
nine routes rendering, the case reader's scroll lock / focus trap / scroll
restore, and every footer anchor landing on its act. Scripts live at
`~/scrollcraft/builds/ssc-home-rework/live/` (playwright-core is installed
there, not in this repo).

---

## HIGH

### 1. The prerendered homepage paints the desktop hero on phones until React hydrates

The hero sizes its words imperatively — `paint()` writes `font-size` in px onto
each span. The prerender snapshots the page at 1440×900, so
`dist/public/index.html` ships with the hero frozen at desktop metrics
(`font-size: 71.122px` is in the current build). A phone visitor gets that HTML
first: until the JS bundle loads and `measure()`/`paint()` re-run in
`useLayoutEffect`, the hero renders ~71px words on a 375px screen — horizontal
overflow on first paint, then a large layout shift when hydration resizes it.

Why it matters: this is exactly the window Core Web Vitals scores (CLS during
load, on mobile, on a throttled connection). Crawlers are unaffected — the
sr-only h1 and subheading are plain text — this is a *user* and *CWV* problem.

To do:
- First reproduce it: load the built site (not dev) on a throttled mobile
  profile and watch the first seconds. Confirm severity before engineering.
- Then pick a mitigation. Candidates, cheapest first:
  a. In `script/prerender.ts`, strip the imperative inline styles from the hero
     word spans (and the flow `<p>`) before serializing the `/` route — the
     pre-hydration hero then renders at the CSS default size, no overflow, and
     hydration's first paint sets the real size once. A wrong-but-modest size
     for a second beats an overflowing one.
  b. Give the word spans a CSS-clamp base size that approximates the settled
     layout, so pre-hydration is close and hydration's correction is small.
- Whatever is chosen, re-run `live/widths.mjs` against a fresh build with JS
  disabled to prove the static HTML itself doesn't overflow.

### 2. Below `md` there is no navigation at all

`Navbar.tsx` hides the links and the "Let's Talk" button with `hidden md:flex`
and there is no hamburger — pre-existing, but the old homepage was short and
this one is ~13 screens on a phone. A mobile visitor's only paths are: scroll
everything, or the logo. `/our-story`, `/team`, `/blog`, `/join`, `/contact`
are unreachable from a phone without the footer, and only the homepage HAS the
new footer (see #7).

To do: build a mobile menu. It must respect the ground-aware ink system
(`useGround` / `photo` logic) — a white hamburger over the peak's bone ground
is invisible. Simplest shape that fits the design: a top-right button in the
current ink colour opening a full-screen navy overlay with the five links and
Let's Talk. Verify with `live/nav.mjs` at 375 after.

---

## MEDIUM

### 3. The five case studies are invisible to crawlers and unshareable

`CaseReader` mounts only on click (`{openCase && <CaseReader …>}`), so the
synopsis / mandate / tension / position / impact copy — the richest proof
writing on the site — is in no HTML snapshot, no index, and has no URL. Only
the card-level text (client, category, figure, quote) is crawlable.

This ties to the standing decision that case studies have no home of their own
(repo constants in `data/cases.ts`, not CMS). Don't half-fix it here:
- Minimum now: open the reader on a hash (`/#case-lbb` via
  `history.pushState`), so cases are at least shareable and Back works (see #4).
- Real fix later, as part of the case-studies-home decision: real routes
  (`/work/lbb`), prerendered like every other route, with the rail linking to
  them. That also creates five indexable pages targeting client-name and
  category queries — currently zero.

### 4. The browser Back button doesn't close the case reader

No history entry is pushed on open, so Back while reading a case leaves the
homepage entirely. On mobile, Back is *the* reflex for closing an overlay.
Fix together with #3's hash — `pushState` on open, `popstate` closes. Keep the
existing Escape / button / focus-trap behaviour as is (verified working).

### 5. `npm run check` is red — 9 pre-existing errors in `server/routes.ts`

All are express-5 typings: `req.params.x` / `req.query.x` is
`string | string[]` being passed where `string` is expected (e.g. line 185
`parseInt(req.params.id)`). Byte-identical file on `full-v1`, so this predates
the rework; the Vite/esbuild build doesn't typecheck, which is why deploys are
green. But a red `check` means nobody can trust typechecking to catch a real
regression. Fix: coerce (`String(req.params.id)`) or narrow at each of the 9
sites. Half an hour, high hygiene value.

### 6. Heading outline has holes

Current homepage outline: h1 (hero, sr-only) → the turn has **no heading** →
the peak has **h3s (names) before the page's first h2** → h2 (work) → h2/h3
(services) → h2 (close). Two fixes:
- Give the peak an h2 — an sr-only "The Shapers" above the panels is enough,
  or promote the act's intro line if there is one.
- Give the turn an h2 or accept the p — if kept as a p, consider making the
  ActLabel ("A core belief") an sr-visible h2 instead of a div.
No visual change required for any of this.

### 7. Only the homepage has the new footer; every other page dead-ends

`home/Footer.tsx` is imported by `home.tsx` alone. `/our-story`, `/team`,
`/blog`, `/join`, `/contact` end with nothing (pre-existing; `/offer` is
self-contained on purpose). Now that the footer is a proper sitemap, extend it:
move it out of `home/` into `layout/` and render it on the inner pages. Note
the in-page links (`#act-peak`, `#act-proof`, `#act-close`) only work ON the
homepage — on other pages they must become `/#act-peak` links (and the
homepage must then handle a hash on load: scroll to the act after mount).

### 8. `/team` and the portfolios contradict the peak

The peak's bios and portraits are approved repo constants; `/team` and
`/fatema`-`/shaili`-`/aakanksha` still serve the older, longer CMS rows. The
nav's "Team" link walks a reader straight from the new copy into the old. This
is the known CMS-divergence decision — resolve it as part of the planned
section-by-section phase, but decide *before* announcing the new homepage:
either update the CMS rows to the approved copy, or accept the mismatch
knowingly. Also: Aakanksha's live CMS portrait is 800×800 — if the CMS is ever
rewired to the peak, that asset must be replaced first.

### 9. `maximum-scale=1` in the viewport meta blocks pinch-zoom

`client/index.html` line 5. Android respects it; it's a WCAG 1.4.4 failure and
a Lighthouse a11y flag. Pre-existing, one-line fix: drop `maximum-scale=1`.
Nothing in the new design needs zoom locked.

---

## LOW / post-merge cleanup

- **Dead code, zero importers, safe to delete after merge:** `home/Origin.tsx`,
  `home/WhatChanges.tsx`, `home/GradientBlobs.tsx`, `home/SectionAnimations.tsx`;
  `useProblems` and `useWhatWeDo` in `use-cms.ts`.
- **Dead admin surface:** the "Problem Section" tab + `ProblemsEditor` and the
  `whatwedo` editor edit rows nothing renders; `/api/cms/problems` and
  `/api/cms/whatwedo` serve nothing. Either remove (with the API routes) or
  label them retired in the admin — an editor that silently does nothing is
  worse than either.
- **Unused assets — verify then delete:** `assets/pixel-hero.png`,
  `assets/hero-shape.png`, `assets/images/team-*.png` (check nothing imports
  them first).
- **Naming nit:** the services act is `id="services"` while every other act is
  `act-*`. Renaming to `act-services` must update `shared/hero.ts`'s unrendered
  `secondaryCtaLink` and any verify scripts that reference it.
- **Noise overlay** (`body::after`, fixed, z-index 9999, opacity 0.08): sits
  over everything including the case reader and the nav, grains the portraits,
  and is a permanent full-viewport composite layer over a page that now
  animates constantly. Fatema's design call; if kept, consider excluding it
  cheaply (it's `pointer-events: none`, so this is visual + perf only).
- **SPA titles:** pages that don't set `document.title` (`/our-story`,
  `/contact`, `/join`, `/blog`) keep the previous page's title on client-side
  navigation. Prerender fixes it for direct loads only. Pre-existing; a tiny
  `useEffect` per page or a title helper closes it.
- **`client/public/sitemap.xml`** is a stale July fallback — harmless (the
  build overwrites it with the generated one) but update or note it so nobody
  reads it as current.
- **Two untracked files** — `.design/hero-codex-backup/`,
  `script/shrink-images.ts` — are not from this work; ask before deleting.

---

## Verified healthy — do not "fix"

- **Hero SEO pattern is correct**: sr-only `h1` ("We shape stories. The Story
  Shapers is a senior-led marketing collective.") + sr-only subheading, the
  visible film `aria-hidden`. Screen readers and crawlers get the sentence;
  the film is presentation.
- **Prerender pipeline intact for the new design**: fresh build (today) carries
  the turn's copy, all three service stages, the close, and the new h1 in
  static HTML; sitemap regenerates with blog routes; canonical/OG per route;
  `app.html` fallback logic untouched. The share card was redrawn for the new
  hero (`94adda2`) with the cache-buster bumped.
- **Hero v4 versioning** holds in both directions (seed migrates old rows,
  component ignores stale rows).
- **No stale anchors anywhere**: no page links into removed home sections; the
  only `#` links into the homepage are its own and the footer's.
- **robots.txt** allows all major AI crawlers, disallows /admin, points at the
  sitemap. Leave it.
- **Image weights are fine** (cases 60–212K, panels ≤244K, all lazy where it
  matters). `font-display: block` is a deliberate trade backed by preloads of
  the two critical faces — monitor, don't change.
- **Card semantics**: cases are `<button aria-haspopup="dialog">`; the marquee's
  moving copy is `aria-hidden` with a readable still copy for AT.

## Suggested execution order

1. #5 (tsc green — so every later change is typechecked)
2. #1 (reproduce, then mitigate the prerendered-mobile hero)
3. #2 (mobile menu)
4. #3 + #4 together (reader hash + Back)
5. #6, #9 (headings, viewport) — small, same PR is fine
6. #7 (footer sitewide) — includes the `/#anchor` handling
7. #8 is Fatema's decision, not a build task
8. Cleanup list after the merge, not before

---

# EXECUTED — 25 Aug 2026

Items 1–7 and 9 are done, on `home-rework` (6 new commits, `9b62c80`..`a5775d3`).
Item 8 is Fatema's decision and was left alone. The LOW list was left for after
the merge, as this doc said to.

| # | what | commit |
|---|---|---|
| 5 | `npm run check` green — 29 errors, not 9 | `9b62c80` |
| 1 | prerendered hero no longer ships 1440px metrics | `dd0894e` |
| 2 | mobile menu | `7c322fc` |
| 3+4 | `#case-<id>` URLs, Back closes the reader | `f48d7b9` |
| 6+9 | heading outline, pinch-zoom | `3275cdc` |
| 7 | footer sitewide, `/#act-*` anchors | `a5775d3` |

## Where the review was wrong or short

- **#5 was 29 errors, not 9** — the original count came from truncated output.
  All one cause, so one type alias fixed them rather than 29 coercions.
- **#1 was worse than described.** Measured with JS disabled at 375: 54px of
  horizontal overflow and a hero block 2119px tall on a 660px screen, collapsing
  to 530px on hydration. But only ONE property was viewport-dependent — all 22
  word widths were already in `em`. Fix is correspondingly small.
- **#2 hid a second bug.** The portal puts the panel after `<main>` in document
  order, so a boundary-only focus trap never engaged: Tab walked out of the
  sheet through the hero CTA, five case cards and the close, dragging the page
  6155px. Needed a fully-managed ring, not a boundary check.
- **#4 had a third cause nobody had noticed.** `history.back()` restores the
  previous entry's scroll position, so the reader's "Start a conversation" link
  landed on the rail (6480) instead of the close (9720). That link had also
  never worked: `href="#act-close"` lost a race with the scroll restore on every
  click and left a stale hash behind.

## Found during execution, not in the review

- **The 404 was the starter template's** — grey card, red icon, "Did you forget
  to add the page to the router?" shown to visitors, in none of the site's
  colours or typefaces. Rewritten. (`a5775d3`)
- **/contact had no h1 at all.** Both its headings were `h2` under nothing.
  Added sr-only. (`a5775d3`)
- **`inkOnPhoto` in Navbar is unreachable at every width.** `photo` is only true
  at >=1024px; `inkOnPhoto` requires `<960px`. The rendered result is correct
  everywhere (at >=1024 the links sit on the panel's bone column, so navy is
  right), and the wordmark's own `photo` branch does fire. Left as-is —
  it is dead defensiveness, not a bug — but worth knowing before anyone
  "simplifies" the nav.
- **`live/menu.mjs` shipped with a bug in its own assertion** (`includes("ESCAPED")`
  against prefixed values) that reported green while Tab was escaping. Fixed.
- **`goto()` between two URLs differing only by hash is a same-document
  navigation**, so the first version of the cold-load test never reloaded and
  was silently testing Forward. Fixed with a fresh page.

## New verify scripts (in ~/scrollcraft/builds/ssc-home-rework/live/)

- `static.mjs` — serves the BUILT dist with JavaScript disabled. This is what a
  cold phone sees before hydration, and nothing else here tests it.
- `menu.mjs` — the mobile menu over all seven grounds, plus lock/trap/restore.
- `readerhash.mjs` — Back, Forward, cold shared link, unknown id, entry count.
- `footer.mjs` — footer presence per page and cross-page anchor landings.

## Still open for Fatema

- **#8, the CMS divergence** — untouched, still hers to call.
- The two client-website card images (permissions), Aakanksha's 800x800 CMS
  asset, the `body::after` noise texture, and the LBB card's low-contrast brand
  label.
- The LOW/cleanup list above, after the merge.
