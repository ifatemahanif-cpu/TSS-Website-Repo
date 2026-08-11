# /websites campaign — state at end of 11 Aug

Go-live target: **Thu 14 Aug**. Branch `campaign/websites-august`, committed locally, **not pushed** (visual work waits for Fatema's local review).

## Where it stands

The page is built and working end to end. Fatema supplied her own copy on 11 Aug after rejecting two earlier drafts, and it is on the page close to verbatim. Run `npm run dev:client` and open http://localhost:5000/websites.

Page order: hero (autocomplete headline + facts strip + "So, your website called") → problem ("You have a logo. A deck." → "We can fix that.") → "The website is the easy part." → brands ticker → get / don't-do table with self-drawing ticks → "Here's how this works." four-node infographic → "Why only five spots?" → application form → FAQ → terms and conditions appendix → footer.

Working: prerender to static HTML + sitemap, Service and FAQPage JSON-LD, campaign OG card at `client/public/og-websites.jpg`, form posting to `/api/forms/submit` with `formType: "websites"` into Postgres and the admin dashboard, SendGrid notification on each application, Meta pixel and GTM as inert slots in `client/index.html` awaiting IDs, reduced-motion fallbacks throughout, typecheck and build clean, no em-dashes.

## Blocking before launch

1. **60 vs 45 years.** Her copy says "60 years of writing, editing and building experience"; the live site says "45+ years of combined experience" and "three senior marketers". The page currently says 60. One of the two has to change.
2. **Google Sheet webhook.** Sheet exists (`1KLfkQ63v9DEcxrW97JfmR2-iGJMR4dqXqSV0IlmoMUU`) with headers. Fatema deploys `automation/websites-applications-sheet.gs` as an Apps Script web app, then `FORMS_SHEET_WEBHOOK_URL` gets set on Vercel. Until then applications still reach Postgres and email.
3. **Fatema's local review**, then push, PR to `full-v1`, merge.

## Open, not blocking

- Real testimonials. The section is built and hidden (`TESTIMONIALS` array in `websites.tsx`). Nothing invented; she asked for manufactured quotes and I declined, so this only goes live with real lines.
- Terms numbers still unconfirmed: two revision rounds, the five-working-day silence window, the 24-hour reply promise in the success message.
- Meta pixel and GTM IDs once Business Manager exists.
- Second wave around 21 Aug: `SLOTS_REMAINING` in `websites.tsx` is a plain constant. Set it to 3 and redeploy. After 31 Aug set it to 0 and the hero eyebrow flips to "slots full".

## Process note

An independent design reviewer ran on v1 and caught real defects (scrollbars baked into proof captures, selects indistinguishable from inputs, FAQ opening all at once, missing OG image). The v2 re-review died on an API session limit, so I did that pass myself and said so. **Worth running a genuine fresh-eyes review on the current version before launch**, since the page has changed substantially since the last independent look.

## Copy history

`COPY.md` holds Fatema's v4 copy at the top, the v3 hero options and full terms below it. v1 was rejected as verbose, v2 as generic with a dead hero. The lesson both times: short, specific, purposeful. Nothing vanilla survives.

`REFERENCES.md` holds the design references. A separate research sweep of 20 live productized-offer pages ran on 11 Aug; its key finding is that credible scarcity states the reason before the number, and that fast fixed-price website offers almost never include copywriting, which makes "we write every word" a real wedge rather than a bullet.
