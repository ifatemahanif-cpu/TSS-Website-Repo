# Design Brief: The August Website Offer — /websites

## Problem

A founder is building something real, and the website is the one piece that keeps not happening. It's either nonexistent, embarrassing, or "almost ready" since March. Every route they've tried has a hole in it: the freelancer built the shell and then asked them to "send the copy," which means the site is only as good as whatever they can write at 11pm on a Sunday. The agency quoted ₹1.2L and three months. The DIY attempt died inside a template picker. Meanwhile every investor, client, and relative asks the same thing: "can you send me your website?"

The friction isn't technical. It's that the words are the hard part, and nobody who builds websites wants to write them.

## Solution

One page that makes a single argument: hand it to us, words included, and it's live in 10 working days for ₹75,000 flat. Five slots in August.

The experience of reading the page should feel like what hiring the collective feels like: someone senior takes the whole thing off your plate, tells you the price without being asked twice, tells you plainly what you won't get, and shows you a site they took live last week. No bounce to a form elsewhere. You scroll, you're convinced or you're not, you apply on the same page.

## Experience Principles

1. **The page is the audition** — We're selling website craft on a website. Every choice on this page (type, pacing, restraint, how fast it loads) is itself the pitch. If a section doesn't read like ₹75k of judgment, it doesn't ship.
2. **Numbers are stated, never sold** — Price, slot count, day counts appear as plain facts in the open, the way a senior person quotes a fee. Scarcity is logistics ("five, because that's what we can build well"), never countdown-timer theatre.
3. **One scroll, one argument** — Problem → offer → proof → mechanics → application, each section advancing the case exactly once. Anything that repeats, decorates, or hedges gets cut. Twelve specced sections, zero clutter.

## Aesthetic Direction

- **Philosophy**: Dark editorial — the live site's own language. A magazine feature on a midnight-indigo canvas: serif display headlines, mono eyebrows, generous whitespace, hairline rules, film grain. Closest named territory: editorial/typography-led with Swiss discipline in the grid.
- **Tone**: Senior, calm, a little wry. The confidence of people who state a price once. Never urgent, never salesy.
- **Reference points**: The TSS home page itself (SectionLabel/SectionHeading rhythm, blob-lit CTA panel); curated external references from the reference hunt (see REFERENCES.md when it lands — motion-led studio pages, productized-offer pages that state price plainly).
- **Anti-references**: SaaS launch pages (logo walls, 3-column feature grids, testimonial carousels). Discount landers (countdown timers, slashed prices, urgency banners). Generic AI landing-page tells (numbered section eyebrows, version badges, antithesis headlines, em-dashes). Agency sites that hide the price behind "let's talk."

## Existing Patterns

- Typography: Libre Baskerville (display, weight 400, clamp 2.5–5.5rem H1, -0.03em tracking), Inter (body, clamp 0.9–1.05rem, lh 1.8, opacity .85), JetBrains Mono (eyebrows, 0.6–0.65rem, 0.2–0.25em tracking, uppercase, opacity .6)
- Colors: bg `#0C0A3E`, primary/accent `#7B1E7A` (hover `#9B3E9A`), card `#151340`, muted `#1A1852`, border `rgba(255,255,255,0.12)`, CTA panel `#0E0C45`
- Spacing: section padding `clamp(3rem, 5vw, 5rem)`, content max-width 800–900px, buttons `0.9rem 2.5rem` radius 8px
- Texture: body film-grain overlay (global), ◆ diamond dividers, dot-grid footer, hairline rules
- Motion: framer-motion `useInView` once + y:20–30 fade + `[0.16,1,0.3,1]` ease + 0.06–0.1s stagger. Reveals MUST end visible (prerenderer snapshots the scrolled page).
- Components: `Navbar`, `SectionLabel`/`SectionHeading` (components/home/SectionAnimations.tsx), `GradientBlobs` presets, form input styles in pages/contact.tsx, footer markup in pages/home.tsx:21–78

## Component Inventory

| Component | Status | Notes |
| --------- | ------ | ----- |
| Navbar | Exists | Included as-is; /websites NOT added to nav links |
| Footer | Exists (markup) | Copy canonical block from home.tsx |
| SectionLabel / SectionHeading | Exists | Section rhythm throughout |
| GradientBlobs | Exists | Sparingly — hero and/or closing CTA panel only |
| Hero w/ price + slots + anchor CTA | New | Price and slot count as plain text in the hero, not a card |
| Proof cards (4 live sites) | New | Real screenshots, chrome-free full-bleed (no browser/device frames — see REFERENCES.md #4), live link, one-line factual outcome caption. No equal-grid; editorial asymmetry |
| Slot counter | New | Plain constant, quiet mono treatment ("five slots. three remain." style), no timers |
| How-it-works steps | New | Numbered plainly, no icon set |
| Inclusions / exclusions | New | Two-column ledger feel on desktop; "a brand site, not a store" gets prominence |
| Application form (14 fields) | New (styles lifted) | FormInput/FormTextarea styles from contact.tsx; embedded, no redirect |
| Q9 disqualifier notice | New | Inline message when "need to sell products" = Yes |
| FAQ accordion | New | Native details/summary or minimal custom; no heavy ui lib pull |
| Fine print | New | Small type, present, honest; collapsed or quiet block |

## Key Interactions

- Hero CTA anchor-scrolls to the embedded form (same page, no redirect — the no-friction rule).
- Q9 "Do you need to sell products on the site?" = Yes → inline notice explains this offer is a brand site, not a store, and offers a separate conversation; form remains submittable (their choice), but the notice is unmissable.
- Q14 price-acceptance checkbox gates the submit button (disabled until checked — no call ever opens with sticker shock).
- Submit → POST /api/forms/submit (formType "websites") → in-place success state ("we read every application within 24 hours" territory), no redirect.
- Proof cards link to the live sites in new tabs.
- FAQ items expand one at a time; all content indexable (prerender).
- All scroll reveals settle visible; every scroll position is a resting state.

## Responsive Behavior

- Mobile-first single column; proof cards 2-up desktop → 1-up mobile; inclusions/exclusions ledger stacks.
- Navbar has no mobile menu (logo only on mobile) — acceptable: the page is self-contained and traffic arrives by direct link.
- Form full-width on mobile with comfortable tap targets (min 44px), field labels always visible (no placeholder-only).
- Hero type scales via existing clamp; price line must never wrap awkwardly on 375px.

## Accessibility Requirements

- AA contrast: white/near-white text on indigo passes; `#7B1E7A` magenta is a FILL with white text, never a text color on the indigo bg (fails contrast).
- Full keyboard path: hero CTA → form fields → submit; visible focus states on all inputs (contact.tsx pattern extended).
- Every field labelled; required states announced; Q9 notice in an aria-live region; error messages tied to fields.
- `prefers-reduced-motion`: all framer-motion reveals collapse to opacity-only or none.
- Semantic landmarks + heading hierarchy (single h1 in hero).

## Out of Scope

- Launch posts, outreach templates, creative for LinkedIn/IG/WhatsApp (follow-up thread)
- Any CMS wiring for this page (copy is hardcoded; slot count is a constant edited on redeploy)
- Payments on the page (Razorpay link is sent after the alignment call)
- Nav/footer redesign, mobile menu, or any change to shared chrome
- E-commerce anything — the offer itself excludes it and so does this page
- Meta ads creative; pixel/GTM ship as empty no-op slots until IDs exist
