# /offer page — state at 12 Aug 2026

Branch `feat/offer-page` in the worktree `~/tss-website-offer` (branched from
`origin/full-v1`). Nothing pushed. Nothing merged.

Built from the handover package at `~/Downloads/tss-offer-handover` by following
its `INSTRUCTIONS.md`.

> Sections below this line are from 12 Aug and are partly superseded — five
> commits are now pushed and PR #7 is open. Read the queue immediately below
> first.

## TERMS REWRITE — 13 Aug, lawyer's pass, APPLIED

The lawyer's mark-up arrived and was applied in a single pass together with
Fatema's own queued edits. Her wording used verbatim wherever she supplied it.

Applied:

1. **Commercial structure.** Balance now falls due once scope and revision
   rounds are complete, payable *before* deployment/transfer/publication —
   previously "on launch". New clause 5 paragraph withholds final files, code
   repository, credentials, production deployment and IP until cleared funds.
2. **Clause 6 deemed acceptance** — five working days → the lawyer's three-limb
   test (written approval / publication or use / three working days).
3. **Clause 5 booking fee** reframed off "genuine pre-estimate" onto reserved
   production capacity + preparatory work.
4. **Clause 12** cancellation rewritten: stage-based valuation, written
   statement of work, invoice up to the total fee, no percentages.
5. **Clause 10** new paragraph — watermarked/restricted review environments,
   right to withdraw access, no recreating via another provider.
6. **Clause 16** AI-tools disclaimer.
7. **Clause 8** rewritten warranty + right to refuse infringing material +
   indemnity procedure (notice, cooperation, costs, no unilateral settlement).
8. **"Flat and all-inclusive"** → "the complete professional fee … third-party
   costs and excluded services are not included."
9. **Hers:** GST sentence removed; cooling-off 48h → 24h (terms clause 12 *and*
   FAQ, moved together); terms intro paragraph cut.
10. **Knock-on copy fixes** so the sales page doesn't contradict the terms: FAQ
    deemed-acceptance answer rewritten to three working days, FAQ "₹54,000 at
    launch" → "before the site goes live", form deposit note likewise.

## LP + FAQ ROUND — 13 Aug, Fatema's changes, APPLIED

- **Price ₹79,000 → ₹80,000** (80th year of Independence), balance ₹54,000 →
  ₹55,000, booking fee unchanged at ₹25,000. Six places on the LP and three in
  the terms, plus the `PRICE`/`BALANCE` constants in `offer-config.ts` — note
  those constants are declared but nothing imports them; the values are
  hardcoded in the components. Left in sync anyway so they don't rot.
- **Revisions: two copy, ONE design** — terms clause 7 and the FAQ together.
- The Offer section: "This August, we're handpicking five selected brands …
  ₹80,000 all in" (comma added, "selected" added).
- Section eyebrow "THE AUGUST OFFER" → "THE INDEPENDENCE OFFER".
- Hero strip and sticky CTA: "FIVE SITES · CLOSES 31 AUG" → "FIVE SELECTED
  BRANDS". Fine print: "Offer valid till 31st August 2026, limited slots only"
  → "Limited slots only".
- Why us: "cutting the waffle" → "cutting the fluff".
- What's In: "The technical bits" row removed. What's Not: "A large catalogue"
  row removed.
- **FAQ replaced wholesale** with her nine questions, wording as written. The
  accordion now accepts `string | string[]` so her two-beat answers ("That is
  rather the point." / then the explanation) keep their break instead of being
  run into one paragraph.

### Open from this round

- **She gave two alternatives joined by "OR"** for the time/feedback question.
  Used **"How much of my time will this need?"** because it answers the buying
  objection *and* still carries the single-decision-maker point. The alternative
  ("Can my whole team give feedback?" … "protects everyone from
  Version_Final_FINAL_V7") is funnier and more on-voice — a one-line swap in
  `faq.tsx` if she prefers it.
- **Two answers dropped out of the replacement set** and nothing else on the
  page covers them: deemed acceptance at three working days, and what happens
  to the ₹25,000 if the client cancels. The money one is worth re-adding — the
  page now never explains the booking fee beyond the note under the form.
- **31 August still appears in terms clause 2** ("applications close at 23:59
  IST on 31 August 2026"). Deliberately kept: it is the contractual closing
  date. Only the LP-facing mentions were removed.
- **`CLOSES = "31 August 2026"`** in `offer-config.ts` is now unused.
- **The 80th-year link is implicit.** "THE INDEPENDENCE OFFER" plus ₹80,000
  only lands if the reader joins the dots. One line would make it land — not
  added, not asked for.
- **Fatema has a screenshot** of the filled form and its confirmation message.
  Not yet supplied, so no change made to the success state.

### Still open on the terms

- **⚠️ One sentence is MINE, not the lawyer's.** Her note ended mid-sentence at
  "Any delay caused while you replace or obtain permission for such". Completed
  as "…such material is a delay on your side for the purposes of clause 6."
  Marked with a TODO comment in `offer-terms.tsx` clause 8. Must be confirmed.
- **Register clash in clause 6.** The lawyer's text says "the Client" and "the
  Scope Note"; the rest of the document says "you" and "the scope note". Applied
  verbatim rather than silently converted. Fatema's call.
- **"Scope Note" is not a formally defined term** anywhere in the document —
  clause 1 refers to "the written scope note issued after the alignment call".
  Worth defining once if the lawyer wants the capitalised term to carry weight.
- **Clause 13's 14-day defect window runs from launch**, and launch is now the
  ready-for-review notification. A client who delays payment burns their own
  defect period. Deliberate but worth a second look.
- **LLPIN still missing** — two TODO markers in `offer-terms.tsx`.
- **Undecided: meta/OG tags, analytics installation, image compression.** Hers:
  "can be added but want to avoid, especially analytics." Still listed as
  *promised deliverables* in four places: terms clause 2, terms clause 4 (the
  SEO exclusion is defined by reference to clause 2's meta/OG tags),
  `offer.tsx` line 18, `faq.tsx` line 22. Recommendation on file: keep meta/OG
  and compression, drop analytics. Must change in all four or none.

## What is committed vs not

- **Committed** (one commit, local branch only): the two security fixes —
  `server/seed.ts` now requires `ADMIN_SEED_PASSWORD`, `server/routes.ts` throws
  in production when `SESSION_SECRET` is missing.
- **Uncommitted**: the entire offer page, terms page, email notification, admin
  dashboard changes and the four patches. Held for Fatema's review.

## Verified locally

- `npx tsc` → 33 errors, identical to the untouched `full-v1` baseline. None in
  any offer file or `server/email.ts`.
- `npm run build` → succeeds. All 10 hero tiles and the white logo land in
  `dist/public`. Generated CSS contains `bg-navy`, `bg-magenta`, `.o-eyebrow`,
  `.o-display`, `.stack-track`, `tss-stack-up`, `.offer-page`.
- `/offer` and `/offer/terms` both render with zero console errors of our own.
- Home page renders unchanged — the offer CSS does not leak.
- Form inline warnings fire for "needs a store = Yes" and "just exploring".
- Mobile sticky CTA appears and does not cover the form.
- `/offer/terms` renders all 18 clauses; "Back to the offer" works.

Not testable locally (no database, no SendGrid key): the form POST, the
notification email, the `/admin` view. Those move to the Vercel preview.

## Independent design review — applied fixes

An independent reviewer read the source and walked the live page at 1440 and
390. Six defects were fixed before showing Fatema; everything involving copy,
pricing or legal wording was left for her.

- The four radio groups (stage, needs-a-store, assets, live-by) had **no
  accessible name** and their `<label htmlFor>` pointed at ids that did not
  exist. Labels now carry an id and each group names itself through
  `aria-labelledby`. Verified live: all four announce their question.
- **Keyboard focus was invisible** on those groups — the ring landed on the
  clipped sr-only radio. The pill now carries it via `has-[:focus-visible]`.
- The page-wide focus ring was `#942493`, about 2.6:1 on navy and invisible on
  the magenta buttons it outlined. Now white.
- Micro-type carrying the deadline and scarcity was below contrast minimums:
  hero eyebrow ("CLOSES 31 AUGUST") `/45`→`/70`, sticky bar `/40`→`/70`, section
  eyebrows `/35`→`/60`.
- The hero APPLY chip sat over bright screenshots at `bg-navy/70`; now `/90`
  with `text-white/85`.
- A `h-16` mobile spacer showed as a mismatched lighter band under the footer
  and was dead weight (the sticky bar already hides before the footer). Removed.

Typecheck still 33, client build clean.

## Fatema's round of changes (12 Aug) — applied

1. Hero cycling endings now all end in a full stop.
2. **GST contradiction resolved her way: the price is all-inclusive.** Terms
   clause 2 now reads "flat and all-inclusive: inclusive of GST and any other
   applicable taxes, and nothing further is payable for the scope described
   above", with the invoice showing any legally required break-up within that
   amount. Every "all in" on the page is now true.
3. "60+ years" → "45+ years", matching the live home page.
4. **Testimonials section removed from the page.** The component, its config and
   the placeholder guard are kept intact so it can be dropped back in when real
   quotes exist — a comment in `pages/offer.tsx` marks the spot.
5. "Four steps, then we build." → "Four steps to the website you want."
6. "Book my slot." → "Book me in." (heading and submit button).
7. The form intro ("Five brands this August. Two minutes to apply…") removed.
8. WhatsApp field placeholder reduced to "+91".

Also changed while sweeping for contradictions: the name field's placeholder was
"Fatema Hanif" — odd on her own site — now a neutral example.

## Awaiting her copy

- **The terms page** is provisional. Fatema is having proper terms drafted and
  will replace the 18 clauses. The GST clause above was corrected in the
  meantime because the page contradicted it.
- **The FAQ** copy is provisional for the same reason — five questions, hers to
  rewrite.

## Open decisions — these need Fatema

1. ~~**Booking fee.**~~ RESOLVED 13 Aug: clause 12 now has a cooling-off window
   plus an asymmetric refund (full refund if TSS cancels for any reason other
   than her breaching). The window itself is going 48h → 24h, see the queue.
2. ~~**Jurisdiction: Mumbai.**~~ RESOLVED 13 Aug: `GOVERNING_CITY = "Bengaluru"`,
   entity is an LLP, registered office in clause 1. LLPIN still outstanding —
   two TODO markers in `offer-terms.tsx`.
3. **"When do you want to be live?"** is back in this form, with "Just
   exploring" as a soft-disqualify flag. She removed that exact question from
   the `/websites` form on 12 Aug.
4. **Confirm the constants** in `client/src/lib/offer-config.ts`: the Calendly
   link and the WhatsApp number `+91 91477 40521`.

Raised by the reviewer, also hers:

5. **The page still calls one action three things** — "APPLY" in the hero, "I
   need a website now!" mid-page, "Book me in" on the form. The form heading and
   button are now hers; the other two are untouched. The exclamation mark reads
   off-register for this page.
6. **"high-functioning website"** sits in the single most-read sentence on the
   page.
7. **The hero tile stream is real client work but nothing says so.** One mono
    caption would turn decoration into evidence.
8. **"Live in 10 working days" vs sequential slots.** Terms clause 2 says slots
    run one after another; the fifth brand could start in October and only learn
    it from the terms. One honest line on the page fixes it and sharpens the
    scarcity.
9. **Terms clause 4** lists eight exclusions in a single ~70-word sentence —
    the least scannable spot in an otherwise clear document.

## Notes

- **Join and Contact forms now send email too.** `/api/forms/submit` previously
  emailed nobody. Expect notifications from those as well as the offer form.
- **Social URLs fixed.** `client/index.html`'s Organization JSON-LD pointed at
  `instagram.com/storyshapers_` — an unrelated account — and
  `linkedin.com/company/story-shapers`. Now `instagram.com/thestoryshapers` and
  `linkedin.com/company/the-story-shapers-collective`, both independently
  verified. The `/websites` page on `campaign/websites-august` still carries the
  old pair in its footer.
- **Prerender fails locally at `/blog`**, before it reaches `/offer`. Pre-existing
  and environment-specific: production serves prerendered `/blog` today, so
  Vercel's build gets through it. Confirm `/offer` prerenders on the preview.
- **Four unprefixed CSS classes** in `offer.css` — `.marquee`, `.marquee-track`,
  `.caret`, `.stack-track`/`.stack-row`. No collision in the repo today.

## Before launch

- [ ] Change the live admin password from `/admin` — the old one is public.
- [ ] Confirm `SESSION_SECRET` is set in Vercel for Production and Preview.
- [ ] Set `ADMIN_SEED_PASSWORD` in Vercel, or the admin user stops being seeded
      on a fresh database.
- [ ] Optional: `NOTIFY_EMAIL` for where applications land.
- [ ] The old `/websites` page is still live at
      `tss-website-preview.vercel.app/websites` — hers to retire.
