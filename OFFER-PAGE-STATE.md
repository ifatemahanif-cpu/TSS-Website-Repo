# /offer page — state at 12 Aug 2026

Branch `feat/offer-page` in the worktree `~/tss-website-offer` (branched from
`origin/full-v1`). Nothing pushed. Nothing merged.

Built from the handover package at `~/Downloads/tss-offer-handover` by following
its `INSTRUCTIONS.md`.

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

1. **Booking fee.** Terms clause 12 says the ₹25,000 is "not refundable in any
   circumstance" — including if The Story Shapers declines or fails to deliver.
   The `/websites` terms refunded in full in exactly those cases. The absolute
   version is the harsher position and the weaker one to defend.
2. **Jurisdiction: Mumbai.** `offer-config.ts` sets `GOVERNING_CITY = "Mumbai"`.
   The `/websites` terms assumed Kolkata.
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
