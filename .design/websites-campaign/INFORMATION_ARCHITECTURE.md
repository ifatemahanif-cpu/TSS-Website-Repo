# Information Architecture: The August Website Offer — /websites

Single campaign landing page on the existing TSS site. No child pages, no nav presence, arrival by direct link. The IA's whole job is the order of one scroll and the logic of one form.

## Site Map

- Home `/` (exists, untouched)
  - **August offer `/websites`** ← this page. Prerendered, in sitemap, NOT in navbar.

URL choice: `/websites` — plain category noun, reads as a permanent capability page rather than `/august-offer` (which dies on 1 Sep). The August framing lives in the content; the URL survives future campaigns.

## Navigation Model

- **Primary**: existing Navbar included unchanged (page must feel native to the site). /websites deliberately absent from nav links — traffic is direct-link only, and the team controls who sees it.
- **In-page**: hero CTA anchor → `#apply` (the form). One secondary anchor in the price section → `#apply`. No sticky nav, no floating CTA button (anti-bloat; the page is one argument, not a maze).
- **Mobile**: navbar shows logo only (existing behavior, acceptable — the page is self-contained).
- **Exit paths**: proof cards open live sites in new tabs (only external links on the page). Footer as sitewide.

## Content Hierarchy — the scroll argument

Each section advances the case exactly once. Order deviates from the spec list in one place: **proof moves up to position 3** (the offer doc itself: "proof-led is the strongest opener, because the evidence argues for us").

### 1. Hero `#top`
1. Eyebrow (mono): the August frame + slot state — quiet scarcity, logistics not theatre
2. H1: the hook (3–4 options going to Fatema; "Freedom from websites that do nothing for your business" is the locked primary direction)
3. One-line offer as plain facts: 5 pages · copy AND build · live in 10 working days · ₹75,000 flat
4. Price + slots stated in the open (principle: numbers are stated, never sold)
5. CTA anchor → form. Conversational invitation register, not command
- Layout: type-led, no imagery. GradientBlobs preset (subtle) permitted. Price line must hold on 375px.

### 2. The problem `#problem`
1. The lived scenario, named specifically ("almost ready" since March; the freelancer who asked you to send the copy; the 11pm Sunday)
2. Short. This section resonates, it doesn't diagnose at length.
- Layout: narrow measure (max ~640px), generous whitespace. No cards.

### 3. The difference + proof `#work`
1. The differentiator, plainly: most builders ask you for the words; we're a writing collective that builds
2. Four live sites: Tuisa (caption: "Live inside a week." + Lighthouse 100s), storyshaperscollective.com ("you're on our work right now" territory), HITL, Schmancy (slot pending Fatema's URL + scope confirmation — page must compose correctly with 3)
3. Each: real screenshot in a minimal browser frame, live link, one-line factual caption
- Layout: editorial asymmetry (offset two-column rhythm), NOT an equal grid. Tuisa gets the largest treatment.

### 4. What you get `#included`
1. The itemised spec (Tuisa-spec reference): up to 5 pages, every word written, hero/sections/CTA, GTM + meta/OG, image optimisation, fully responsive, mobile-first
2. **"Define a page"** lives here as a quiet clarifier (Tuisa's About = the scale of one page) — prevents the 3,000-word-About-is-one-page conversation
- Layout: ledger-style list, hairline rules. No icons.

### 5. What you don't get `#not-included`
1. **"A brand site, not a store"** — the headline of this section, unmissable
2. Explicit exclusions: no e-commerce/Shopify, no blog, no CMS, no custom illustration/photography
3. Tone: honest and confident — this section prevents 80% of future pain and *builds* trust
- Layout: same ledger language as §4 — visually a pair.

### 6. How it works `#how`
1. Five steps, plainly: apply → 30-min alignment call (we're allowed to say no) → ₹25,000 holds your slot → assets land, clock starts → live in 10 working days, balance on launch
- Layout: numbered plainly, single column. No process-diagram decoration.

### 7. The timeline `#timeline`
1. What "10 working days" means; **the clock starts the day assets land**, not the day you pay
2. The 24-hour feedback rule, stated as mutual respect
3. Indicative slot calendar (w/c 18 Aug onward, sequential not simultaneous) — makes scarcity concrete
- Layout: quiet mono/tabular treatment for the calendar.

### 8. Price `#price`
1. ₹75,000 flat — restated with what it contains; ₹25,000 (non-refundable) holds the slot; balance on launch
2. Secondary anchor CTA → form
- Layout: the one "big number" moment on the page; serif figure, plain text context, no pricing card.

### 9. Who this is for / who it isn't `#fit`
1. For: early-stage brands, founders, studios, service businesses, D2C **pre-launch/pre-catalogue**
2. Not for: selling products on-site, self-edited blog/CMS, big catalogues, custom illustration/photography
- Layout: two short columns, stacking on mobile.

### 10. Fine print `#fine-print`
1. Revision rounds, silence/stall policy, sixth-page policy, one decision-maker rule
2. Small type, present and honest — not hidden, not shouted. (Copy drafted in COPY.md; Fatema flagged fine-print content itself as an open item — draft goes to her with the rest.)

### 11. The application `#apply`
1. Form intro line (invitation register) + the 14 fields, embedded, no redirect
2. Q14 checkbox gates submit; Q9 = Yes triggers the brand-site-not-store notice
3. Success state in place: what happens next + within-24-hours expectation
- Layout: contact.tsx field language; single column; labels always visible.

### 12. FAQ `#faq`
1. Objection handling that would otherwise eat call time: Can I write my own copy? What if I need a store later? What counts as a page? What if I'm slow with assets? Why non-refundable? What platform? Who owns it? What about hosting/domain?
- Layout: native details/summary accordion, hairline dividers. After the form: a safety net for scrollers-past, and post-application reassurance for appliers.

Then footer (canonical markup).

## Wireframe (desktop, structural)

```
┌──────────────────────────────────────────────┐
│ Navbar (existing, fixed)                     │
├──────────────────────────────────────────────┤
│  EYEBROW · AUGUST · FIVE SLOTS               │
│  H1 — serif, 2 lines max                     │
│  one-line offer · ₹75,000 flat               │
│  [ CTA → #apply ]                            │
├──────────────────────────────────────────────┤
│        narrow column: the problem            │
├──────────────────────────────────────────────┤
│  differentiator line (display moment)        │
│  ┌────────────────┐   ┌──────────┐           │
│  │ TUISA (large)  │   │ TSS      │           │
│  └────────────────┘   └──────────┘           │
│      ┌──────────┐   ┌────────────────┐       │
│      │ HITL     │   │ SCHMANCY*      │       │
│      └──────────┘   └────────────────┘       │
├──────────────────────────────────────────────┤
│  WHAT YOU GET (ledger)  │ WHAT YOU DON'T     │
│  — item                 │ "A brand site,     │
│  — item                 │  not a store."     │
├──────────────────────────────────────────────┤
│  1 → 2 → 3 → 4 → 5  (how it works, plain)    │
├──────────────────────────────────────────────┤
│  timeline + 24-hr rule + slot calendar (mono)│
├──────────────────────────────────────────────┤
│  ₹75,000 — the big number moment             │
│  ₹25,000 holds a slot · balance on launch    │
│  [ CTA → #apply ]                            │
├──────────────────────────────────────────────┤
│  for  │  not for                             │
├──────────────────────────────────────────────┤
│  fine print (small, honest)                  │
├──────────────────────────────────────────────┤
│  #apply — THE FORM (14 fields, embedded)     │
│  [Q9=Yes → inline notice]                    │
│  [Q14 unchecked → submit disabled]           │
│  → success state in place                    │
├──────────────────────────────────────────────┤
│  FAQ (accordion)                             │
├──────────────────────────────────────────────┤
│ Footer (canonical)                           │
└──────────────────────────────────────────────┘
```
Mobile: same order, single column; proof cards stack (Tuisa first); ledger pair stacks (get → don't get).

## User Flows

### Apply (primary)
1. Arrives from LinkedIn/IG/WhatsApp direct link → hero
2. Ready-to-buy: hero CTA → `#apply`, fills form → success state
3. Needs convincing: scrolls the argument → price CTA or reaches form naturally
4. In the form:
   - Q9 = "Yes" (needs to sell products) → inline notice (aria-live): this offer is a brand site, not a store; offer of a separate conversation; may still submit
   - Q14 unchecked → submit disabled with quiet explanation
   - Submit → POST `/api/forms/submit` `{formType: "websites"}` → success state in place; team notified by email; submission visible in /admin

### Verify (secondary)
1. Reader hits proof → opens Tuisa in new tab → returns → continues scroll (page state preserved; no SPA navigation involved)

## Naming Conventions

| Concept | Label in UI | Notes |
|---------|-------------|-------|
| The purchase | the offer / five websites | never "deal", "sale", "discount", "package" |
| Applying | application / apply | not "enquiry", "get started", "book now" |
| The 30-min call | the alignment call | per offer doc; consistent everywhere |
| Capacity | slot | never "spot"; count stated plainly |
| Duration | 10 working days | always "working days", never "2 weeks" |
| The deposit | ₹25,000 to hold your slot | "non-refundable" stated adjacent, never hidden |
| Scope unit | page | defined in §4 via Tuisa's About |

## Component Reuse Map

| Component | Used on | Behavior differences |
|-----------|---------|---------------------|
| Navbar | all pages incl. /websites | none; /websites absent from its links |
| SectionLabel/SectionHeading | home + /websites | none — same rhythm |
| GradientBlobs | home CTA + /websites hero | subtle preset only |
| contact.tsx input styles | /contact + /websites form | lifted/shared, identical field language |
| Footer markup | all pages | copied canonical block |

## Content Growth Plan

None — this is a campaign page. The only mutable value is the slot count (constant in `websites.tsx`, edited + redeployed for the "three slots left" wave ~21 Aug). After 31 Aug the page gets a closed state (same constant mechanism: "slots full — September waitlist" per the delivery rules) rather than deletion; URL and pixel audience survive.

## URL Strategy

- `/websites`, no dynamic segments, no query params.
- Prerender entry in `script/prerender.ts` ROUTES → static HTML + sitemap.
- Meta: title/description via useEffect (faq.tsx pattern), OG tags for WhatsApp/LinkedIn link previews (the primary distribution surface — OG image matters more than usual), JSON-LD `Service` with price.
- Anchors: `#apply` is load-bearing (hero + price CTAs, and usable in outreach links: `storyshaperscollective.com/websites#apply`).
