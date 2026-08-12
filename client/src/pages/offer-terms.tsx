import { useEffect } from "react";
import { Link } from "wouter";
import "@/styles/offer.css";
import { ArrowLeft } from "lucide-react";
import { GOVERNING_CITY, INSTAGRAM_URL, SITE_URL } from "@/lib/offer-config";

type Clause = { title: string; body: string[] };

const CLAUSES: Clause[] = [
  {
    title: "1. Parties and scope of these terms",
    body: [
      "These Terms & Conditions (“Terms”) govern the website design, copywriting and development engagement offered by The Story Shapers Collective (“The Story Shapers”, “we”, “us”) under its August 2026 Independence Day offer (the “Offer”) to the person or entity that applies for and confirms a slot (the “Client”, “you”).",
      "These Terms apply from the moment you submit an application through this page and, on confirmation of a slot, form the agreement between us together with the written scope note issued after the alignment call. Where the scope note and these Terms conflict, the scope note prevails for that engagement only.",
    ],
  },
  {
    title: "2. The Offer",
    body: [
      "The Offer comprises: brand and website copywriting; design and development of a website of up to five (5) pages; mobile-responsive implementation; meta and Open Graph tags; analytics installation; image compression; and functional contact or enquiry forms. The fee is ₹79,000 (Indian Rupees seventy-nine thousand) flat and all-inclusive: it is inclusive of GST and any other applicable taxes, and nothing further is payable for the scope described above. Our invoice will show any tax break-up required by law within that amount.",
      "The Offer is limited to five (5) Clients. Applications close at 23:59 IST on 31 August 2026. “Closes 31 August” refers to the date by which a slot must be confirmed, not the date by which websites are delivered. Slots are scheduled sequentially and not delivered simultaneously.",
      "We reserve the right to decline any application at our discretion, including after the alignment call, and to withdraw or modify the Offer for applications not yet confirmed. Withdrawal or modification will not affect slots already confirmed by payment.",
    ],
  },
  {
    title: "3. Definition of a “page”",
    body: [
      "For the purposes of this engagement, a “page” means a single URL comprising a hero section and approximately three to four further content sections, with one primary call to action. The About page on storyshaperscollective.com is the agreed reference for scale.",
      "Content materially exceeding this scale — for example an About page of approximately 3,000 words across six or more sections — will be counted as more than one page. Any such assessment will be made and communicated in writing during or immediately after the alignment call, before development begins.",
    ],
  },
  {
    title: "4. Exclusions",
    body: [
      "The following are expressly outside the scope of the Offer: e-commerce functionality of any kind, including carts, product catalogues, payment gateways and Shopify or equivalent platforms; a blog, content management system or any self-editing publishing interface; catalogues of products or listings; custom photography, videography, illustration or 3D work; brand identity creation, including logo design, palette and type system development; ongoing content production; paid media setup or management; and multilingual or localised versions of the website.",
      "Any of the above may be quoted and undertaken as a separate engagement at separate cost, on separate terms.",
    ],
  },
  {
    title: "5. Fees, booking fee and payment",
    body: [
      "The total fee is ₹79,000 payable in two instalments: (a) a booking fee of ₹25,000 (Indian Rupees twenty-five thousand), and (b) the balance of ₹54,000 (Indian Rupees fifty-four thousand) payable on launch.",
      "The booking fee is non-refundable. It is consideration for reserving a limited slot and for the scheduling and resourcing commitments we make on receiving it. It is credited in full against the total fee and is not an additional charge.",
      "A slot is confirmed only on receipt of the booking fee in cleared funds. A payment link will be issued after the alignment call. Slots are allocated in the order in which booking fees are received.",
      "The balance is due on launch, being the date on which we make the completed website available for publication, whether or not you elect to publish it on that date. Invoices are payable within seven (7) days of issue. Amounts unpaid after fourteen (14) days may attract interest at 1.5% per month, and we may suspend work and withhold transfer of deliverables until payment is received.",
      "Bank charges, gateway fees and, for international Clients, currency conversion costs and any withholding taxes are to your account.",
    ],
  },
  {
    title: "6. Timeline and the working-days clock",
    body: [
      "Delivery is ten (10) working days. Working days exclude weekends and public holidays observed by The Story Shapers in India.",
      "The clock starts on the first working day after we receive all assets and information listed in the asset checklist issued at kickoff. It does not start on the date the booking fee is paid.",
      "You agree to provide all assets within forty-eight (48) hours of kickoff and feedback at each review round within twenty-four (24) hours. Each working day of delay in providing assets, feedback or approvals extends the delivery date by at least an equivalent period. Delays exceeding ten (10) working days in aggregate entitle us to reschedule your slot to the next available window.",
      "If a project is inactive on your side for thirty (30) consecutive days, we may treat the engagement as suspended, invoice for work completed to date, and require a fresh slot allocation to resume.",
    ],
  },
  {
    title: "7. Revisions",
    body: [
      "The fee includes two (2) rounds of revisions on copy and two (2) rounds of revisions on design. A round means a single consolidated set of comments from your named decision-maker.",
      "A revision is a refinement within the agreed scope, direction and structure. A change of direction, structure, page count, positioning or brand approach after approval is not a revision and will be quoted separately. Additional rounds beyond those included are chargeable at our then-current hourly rate, notified to you in writing before the work is undertaken.",
    ],
  },
  {
    title: "8. Your responsibilities",
    body: [
      "You agree to: nominate a single decision-maker with authority to give feedback and final approval, and to route all instructions through that person; provide accurate, complete and lawful content, images, product information and brand material; hold all necessary rights, licences and permissions in the material you supply; and respond within the timelines set out in clause 6.",
      "You are responsible for the accuracy of factual claims, pricing, statutory disclosures, product descriptions and any regulated content on the website. We may raise questions but do not verify your claims.",
      "Where the material you supply is insufficient to complete the agreed scope, we will tell you in writing and propose options. We are not obliged to source, licence, create or purchase substitute assets within the fee.",
    ],
  },
  {
    title: "9. Domain, hosting and third-party services",
    body: [
      "Domain registration and hosting are purchased and held in your name and remain your property and your ongoing cost. We will specify what to purchase and may deploy on your behalf where you grant access. We are not responsible for the availability, performance, pricing, terms or security of third-party providers, including domain registrars, hosting platforms, analytics providers, form services, font licensors and stock asset libraries.",
      "Third-party licence fees, including fonts, plugins, stock imagery and subscription services, are excluded from the fee unless expressly stated in the scope note.",
    ],
  },
  {
    title: "10. Intellectual property",
    body: [
      "Until the balance is paid in full, all copy, design files, code and other deliverables remain our property, and any access granted to you is a limited licence for review purposes only.",
      "On receipt of the full fee in cleared funds, we assign to you all right, title and interest in the final delivered copy, design and build, together with the material you supplied to us.",
      "We retain ownership of our pre-existing intellectual property, including our methods, frameworks, internal templates, component libraries, tooling and know-how, and of concepts, drafts and routes not selected by you. Nothing in these Terms prevents us from reusing that pre-existing intellectual property on other engagements.",
    ],
  },
  {
    title: "11. Portfolio and credit",
    body: [
      "You grant us the right to display the completed website, screenshots of it, and a description of our contribution in our portfolio, on our website, in decks, in case studies and on social media, and to identify you as a client, from the date the website goes live.",
      "If you require confidentiality for a defined period, tell us in writing before kickoff and we will agree a hold period. We may include a discreet credit and link in the website footer; we will remove it on written request.",
    ],
  },
  {
    title: "12. Cancellation",
    body: [
      "You may cancel at any time by written notice. The booking fee is not refundable in any circumstance. If you cancel after work has commenced, you remain liable for work completed to the date of cancellation, assessed on a proportionate basis against the agreed scope, less the booking fee already paid.",
      "We may cancel if you materially breach these Terms, including sustained non-response or non-payment, or if the engagement requires content that is unlawful, misleading, infringing or inconsistent with our professional standards. Where we cancel other than for your breach, we will refund any amounts paid in excess of work completed, excluding the booking fee.",
    ],
  },
  {
    title: "13. Post-launch support",
    body: [
      "We will correct defects in our build — errors, broken links and functional faults in what we delivered — reported in writing within fourteen (14) days of launch, at no charge.",
      "This does not include new content, new sections, new features, design changes, browser or device behaviour outside the versions agreed at kickoff, changes caused by you or third parties editing the site, or failures of third-party services. Ongoing maintenance and content updates are available as a separate retained engagement.",
    ],
  },
  {
    title: "14. Warranties and limitation of liability",
    body: [
      "We will perform the engagement with reasonable skill and care. We do not warrant any commercial outcome, including traffic, search ranking, conversion, enquiries or revenue, and no such outcome is a condition of payment.",
      "To the maximum extent permitted by law, our total aggregate liability arising out of or in connection with this engagement, whether in contract, tort, including negligence, or otherwise, is limited to the total fee actually paid by you. We are not liable for indirect, incidental, special or consequential loss, or for loss of profit, revenue, business, goodwill, data or anticipated savings.",
      "Neither party is liable for delay or failure to perform caused by events beyond its reasonable control, including acts of God, illness, civil disruption, statutory restriction, and failures of internet, power or third-party platforms.",
    ],
  },
  {
    title: "15. Confidentiality and data",
    body: [
      "Each party will keep the other's non-public business information confidential and use it only for the purposes of this engagement, except where disclosure is required by law.",
      "Information submitted through the application form on this page is collected to assess applications, contact you and administer the Offer. It is stored securely, shared only with members of The Story Shapers and the service providers we use to operate the form and our email, and is not sold or used for unrelated marketing. Write to us to request access to, correction of, or deletion of your application data.",
    ],
  },
  {
    title: "16. Independent contractor status",
    body: [
      "We act as an independent service provider. Nothing in these Terms creates an employment, partnership, agency or joint venture relationship. We determine our own working methods, personnel and hours, and may use vetted collaborators, remaining responsible for their work.",
    ],
  },
  {
    title: "17. Governing law and jurisdiction",
    body: [
      `These Terms are governed by the laws of India. The courts at ${GOVERNING_CITY} have exclusive jurisdiction over any dispute arising out of or in connection with them. The parties will attempt in good faith to resolve any dispute by discussion before commencing proceedings.`,
    ],
  },
  {
    title: "18. Entire agreement and amendments",
    body: [
      "These Terms, together with the scope note issued after the alignment call, constitute the entire agreement between the parties in respect of the engagement and supersede prior discussions, proposals and representations. Amendments are valid only if recorded in writing and confirmed by both parties, including by email.",
      "We may update these Terms for future applicants. The version in force at the date your slot is confirmed governs your engagement.",
    ],
  },
];

export default function OfferTermsPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "The August website offer — terms — The Story Shapers";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="offer-page min-h-screen px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[820px]">
        <Link
          href="/offer"
          className="inline-flex items-center gap-2 text-[13px] text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          Back to the offer
        </Link>

        <p className="o-eyebrow mt-14 text-white/35">TERMS &amp; CONDITIONS</p>
        <h1 className="o-display mt-6 text-[32px] leading-[1.14] sm:text-[42px]">
          The August website offer,{" "}
          <span className="font-body font-light text-white/70">in full.</span>
        </h1>
        <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.8] text-white/60">
          Nothing here should surprise you if you’ve read the page and had the
          call. It’s written out properly so that neither of us has to rely on
          memory later.
        </p>
        <p className="mt-8 font-mono text-[11.5px] uppercase tracking-[1.6px] text-white/35">
          Last updated 12 August 2026 · The Story Shapers Collective
        </p>

        <div className="mt-16 space-y-12">
          {CLAUSES.map((clause) => (
            <section key={clause.title}>
              <h2 className="o-display text-[19px] leading-snug sm:text-[21px]">
                {clause.title}
              </h2>
              <div className="mt-4 space-y-4">
                {clause.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[14.5px] leading-[1.85] text-white/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-white/8 pt-8">
          <p className="text-[13px] leading-[1.8] text-white/40">
            Questions on any of the above? Ask before you pay, not after —{" "}
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline decoration-magenta-lift decoration-2 underline-offset-4"
            >
              storyshaperscollective.com
            </a>{" "}
            or{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline decoration-magenta-lift decoration-2 underline-offset-4"
            >
              @thestoryshapers
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
