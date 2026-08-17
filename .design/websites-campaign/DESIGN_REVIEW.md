# Design Review — /websites (11 Aug)

## Round 1 (v1 page, independent reviewer)

An independent fresh-eyes agent reviewed v1 against the brief, IA, copy and references. It returned 8 MUST-FIX and 8 SHOULD-FIX items and its verdict was "do not show the founder yet." Most valuable catches:

- Proof-site captures had the browser scrollbar baked into the right edge (chrome, in violation of the chrome-free rule).
- `<select>` fields were visually identical to text inputs (`appearance: none` with no chevron replacement).
- FAQ `<details>` opened simultaneously; IA specified one at a time.
- Hero copy had drifted from the approved COPY.md.
- The "not a store" card stretched to a full-height bordered box with ~300px of dead space.
- No campaign `og:image`, despite WhatsApp and LinkedIn previews being the primary distribution surface.
- [PROPOSED] copy (revision rounds, silence window, 24-hour reply promise, platform/hosting answers) was rendering as settled fact without Fatema's sign-off.

Then Fatema rejected v1's copy and structure outright, which removed several flagged sections entirely (proof screenshots, timeline, problem, fit). The remaining valid fixes were carried into v2.

## Round 2 (v2 page)

The independent reviewer was re-launched for a delta review but **terminated on an API session limit before returning findings**. Fable ran the visual pass directly instead (captures at 1280 / 768 / 375 plus the two form states and three section crops). This is a weaker check than a genuinely fresh set of eyes, and it is the one process gap in this build.

### Fixed in v2
1. Select fields: inline SVG chevron, dimmed unselected "Choose one" via `select:invalid`, dark option text on white for native dropdowns.
2. FAQ: native exclusive accordion (`name="faq"`), plus a closing rule on the last item so the list doesn't end mid-air.
3. Q9 store notice: magenta fill added behind the hairline border, so it is genuinely unmissable rather than technically present.
4. Reduced-motion: smooth-scroll on both CTAs now falls back to instant; typewriter renders a static suffix; marquee and tick draws collapse.
5. `og:image` + `twitter:image` now point at a purpose-built 1200x630 card (`client/public/og-websites.jpg`) in the house language.
6. Contrast: muted text lifted off the AA borderline (0.45 to 0.55, 0.5 to 0.6).
7. Hero suffix line reserves two lines of height on mobile, one on desktop, so the typewriter never shifts the layout.
8. Headline widows: `text-wrap: balance` on all section headings and the pull-line, with descender padding on the italic pull-line.
9. Tick table right column vertically centred, so its shorter list no longer dumps dead space at the bottom of a bordered box.

### Verified in the captures
- Hero reads in about a second; caret animates; the typed suffix is legible at all three breakpoints.
- Ticker renders as a serif marquee with diamond separators, and holds a static comma list under reduced motion.
- Tick marks draw themselves on scroll and read clearly against indigo.
- Form: mono labels always visible, 48px+ tap targets, Q14 gate disables submit with a plain explanation.
- Console clean at every breakpoint. Prerender emits static HTML with all copy present, sitemap entry, JSON-LD (Service + FAQPage).

### Open, still needing Fatema
- Real testimonial quotes (section is built and hidden until they exist; nothing invented).
- Fine print numbers: revision rounds, the going-quiet window.
- The 24-hour reply promise in the success message must be one the team can actually hold.
- Confirmation the ticker brand list is the one to publish.
