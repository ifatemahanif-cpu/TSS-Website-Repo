# /websites campaign — state at end of 12 Aug (v11: team preview live)

Branch `campaign/websites-august`. v11 in the working tree, **uncommitted** (awaits Fatema's local review; v4 is the last commit). Team preview: https://tss-website-preview.vercel.app/websites. Dev server: `npm run dev:client` → http://localhost:5000/websites and /websites/terms. NOTE: the production build's prerender needs port 5000 free; kill the dev server before `npm run build`.

## Structure as of v10 (four rounds of her direction, 12 Aug)

- **Hero**: eyebrow, "Freedom from websites" + typewriter, ONE line ("This August we are handpicking five brands... ₹79,000* all in!"), CTA **"I need a website NOW"**, "Offer valid till 31st August 2026, limited slots only", tiny "*T&C apply" link. Asterisk links to terms. (The "You have a logo. A deck." pitch section that once followed was removed in round 4 as an orphan.)
- **The website is the easy part.**: ONE paragraph (45+ years), then a **staggered showcase of three real-site scroll recordings** (tuisajewels.com large left, schmancy.in right offset down, humanintheloop.co.in center overlapping by ~72px, each in a browser-chrome card, click-to-pause, posters under reduced motion; assets in `client/public/videos/`, recorder script pattern in `.design/.../og-websites-source.html` era scratchpad), then the brands ticker (hover-pauses).
- **What you get / What you don't get**: symmetric tick/cross table (animated draw-in marks), no intro para, no price line.
- **Here's how this works.**: 3 bare steps (round-4 copy, see below), rail from chip 01 to chip 03, chips hung so digits align with the text edge.
- **Form**: "Book my slot." heading, submit = **"Apply and book my call"** (always enabled; missing checkbox → role=alert "Tick the terms box first."), success screen = "You're in." + **"Book your call" button → `CALENDLY_URL` PLACEHOLDER in websites.tsx that MUST be replaced before launch**.
- **FAQ**: 9 questions per her round-2 notes (revisions = two rounds TOTAL; refund answer mirrors the terms' three refund cases).
- **Terms** `/websites/terms`: 12 formal numbered sections, drafted via the local `legal-terms-review` skill (adapted from anthropics/claude-for-legal). Payment gate, deposit logic per Contract Act s.74 framing, client-content warranty/indemnity, IP on full payment, liability cap, dormancy ladder (3.4→10.2 aligned), refunds within 7 working days. **She has NOT reviewed terms yet.**
- Alignment: every section shares one 1100px container/left rail (her "alignment is all off" complaint; verified by reviewer at x=90/x=1190).

## Review state

Two independent passes ran 12 Aug (her standing rule): round-1 reviewer (22 findings, all fixed or flagged), round-3 expert pass via design-review framing (2 blocking + 7 should-fix, ALL applied: real showcase overlap, FAQ refund contradiction, rail endpoints, asterisk spacing, focus rings + box-shadow, enabled-submit alert pattern, terms 3.4/10.3 fixes, marquee/video pause, cross distribution). Typecheck stays at the 33 pre-existing baseline errors, zero from campaign files.

## Blocking before launch

1. Fatema's review of the page AND the terms (terms unreviewed).
2. **Real Calendly/booking URL** into `CALENDLY_URL` (websites.tsx).
3. Her calls: 45+ vs 60+ years; GST — terms say "inclusive of applicable taxes" (clause 2.1) matching "all in", flip if GST is charged on top; jurisdiction assumed **Kolkata** (clause 12.3); "Cadbury's" vs "Cadbury" in ticker; schmancy.in is a visible e-commerce store showcased under an offer that excludes e-commerce (expectation risk); shared Navbar has no mobile menu at all (pre-existing, site-wide).
4. Attorney pass on the terms (drafted, not legal advice).
5. Google Sheet webhook (`automation/websites-applications-sheet.gs` + `FORMS_SHEET_WEBHOOK_URL`).
6. Production build + prerender re-run (port 5000 free), then commit → push → PR to `full-v1`.

## Motion pass (v10, 12 Aug) — BUILT on her go-ahead

She asked (12 Aug, mid-review) how to get spacefs.com-style interaction/movement. Diagnosis of that site: Gatsby/React, NO heavy animation framework — IntersectionObserver reveals, CSS transform scenes, 16 inline product videos, a Rive vector graphic, 2 position:sticky pinned scenes, scattered rotated-card fan with parallax drift. Equivalent grammar here = framer-motion useScroll/useTransform (already a dependency): proposed pass = parallax scatter+rotation on the showcase cards, scroll-linked rail draw on steps, mask/slide heading reveals, magnetic CTA, glow drift. Built: parallax scatter + static rotation on showcase cards (drift md+ only), self-drawing steps rail, masked slide-up heading reveals (0.15em descender reserve), magnetic CTA (motion values, no re-renders), hero glow drift. All reduced-motion guarded; rotation stays under reduce (static property). The 'You have a logo. A deck.' pitch section was REMOVED at her instruction (orphan section). A focused independent pass verified the increment: no blockers; its two should-fixes (descender reserve, mobile drift gating) are applied.

## Round 4 (12 Aug, after her team-share ask)

- Steps rewritten to her copy: "Apply using the form below." / "If we are a mutual fit, we get on a 30-minute alignment call to discuss further." / "We book your slot and you send us everything we need to get started." Chips now hang into the margin so the digits sit flush over the text's left edge (her marker-misalignment flag); rail endpoints recalibrated.
- Footer nav: Home / Instagram (instagram.com/storyshapers_) / LinkedIn (linkedin.com/company/story-shapers) / Terms and conditions, spaced flex row.
- "When do you want to be live?" REMOVED from the form (her call: timeline follows alignment + 10 days). Form intro now "Twelve questions". NOTE: the Apps Script sheet has a liveWhen column that will now stay empty.
- FAQ pass run: nine questions consistent with the new steps (only "30-minute" mention is step 2; no stale counts).

## TEAM PREVIEW — live, unlinked to git

**https://tss-website-preview.vercel.app/websites** (+ /websites/terms). Fresh scratch Vercel project `tss-website-preview` in HER account, deployed from the uncommitted working tree; the real site's Vercel project (different account) untouched. No env vars on this project, so FORM SUBMITS WILL ERROR on the preview by design; tell the team not to test the form there. Tear down after review with `vercel remove tss-website-preview` (and delete .vercel/ from the repo clone before committing — it is gitignored, verify).

- Second wave ~21 Aug: `SLOTS_REMAINING` → 3; after 31 Aug → 0 (all urgency strings + eyebrow react; form stays live by design, waitlist swap undecided).
- Testimonials still hidden pending real quotes. Meta pixel + GTM slots await IDs. OG card current at ₹79,000.
