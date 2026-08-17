import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";

const PAGE_TITLE = "Terms and Conditions, Website Offer | The Story Shapers";
const PAGE_DESCRIPTION =
  "The full terms of the Independence Day website offer by The Story Shapers: scope, payment, timeline, revisions and ownership.";
const PAGE_URL = "https://www.storyshaperscollective.com/websites/terms";

const SECTIONS: Array<{ title: string; paras: string[] }> = [
  {
    title: "1. Definitions and formation",
    paras: [
      "1.1 In these terms, “The Story Shapers”, “we”, “us” and “our” mean The Story Shapers Collective. “You” and “the Client” mean the brand named in the application. “The Offer” means the Independence Day website offer described on storyshaperscollective.com/websites. “Go-live” means the date the completed website is published on your domain.",
      "1.2 Submitting an application is not acceptance. A binding agreement on these terms is formed only when we confirm your application in writing and your deposit under clause 3.1 is received. Until both happen, no slot is held for you.",
      "1.3 We may decline any application before a slot is confirmed, at our discretion, including for reasons of fit or capacity. If we decline after you have paid a deposit, the deposit is refunded in full within 7 working days.",
      "1.4 The Offer is limited to five slots. Applications close on 31 August 2026 or when all five slots are confirmed, whichever is earlier. Work may be delivered after that date, on the schedule agreed on your call.",
      "1.5 A slot is personal to the brand named in the application. It cannot be transferred, resold or applied to a different brand or business without our written agreement.",
    ],
  },
  {
    title: "2. Price and taxes",
    paras: [
      "2.1 The price of the Offer is ₹79,000 (Indian Rupees seventy-nine thousand) per slot, inclusive of all our charges for the scope in clause 4 and inclusive of applicable taxes. Our invoices state any tax break-up required by law.",
      "2.2 No further amounts are payable for the scope in clause 4. Anything outside that scope is charged only under clause 5.",
    ],
  },
  {
    title: "3. Payment and deposit",
    paras: [
      "3.1 A deposit of ₹25,000 confirms your slot. The deposit is the agreed charge for reserving one of five limited slots, declining other brands for that slot, and beginning kickoff work. It counts toward the price.",
      "3.2 The balance of ₹54,000 is invoiced when the website is ready to go live. Go-live, handover and the transfer of ownership under clause 9 happen once the balance has been received in full.",
      "3.3 The deposit is refundable in full if we decline your application (clause 1.3), if we cannot start your project, or if we fail to deliver for reasons within our control (clause 10.3). It is not refundable where you withdraw, go silent, or end the project for reasons not caused by us, because the slot and the kickoff work cannot be resold once committed.",
      "3.4 If the balance remains unpaid 15 working days after we notify you the site is ready to go live, we will warn you in writing, and clause 10.2 then applies as if the project had gone unanswered from the date of that warning.",
    ],
  },
  {
    title: "4. Scope: what the price includes",
    paras: [
      "4.1 Up to five pages, planned, written, designed and built by The Story Shapers: deciding together what the pages should be, all copywriting and editing, design, build, mobile optimisation and go-live on your domain.",
      "4.2 A “page” means a single page of standard length for a brand website, such as a home, an about, a services or a contact page. If a requested page is unusually long or dense, we will tell you before work starts that it counts as more than one page, not after.",
      "4.3 The price does not include: e-commerce of any kind (product listings, cart or checkout); a blog; a CMS or any self-editing capability; custom illustration, photography or video; logo or identity design; more than five pages; search-engine or advertising campaigns; and maintenance, updates or content changes after go-live.",
      "4.4 Domain registration and hosting are not part of the price. Both remain in your name, in your own accounts, at your cost, throughout and after the project.",
    ],
  },
  {
    title: "5. Additional work",
    paras: [
      "5.1 Most things outside clause 4 can be done, but they are not part of the Offer. Any additional service is scoped and priced separately, in writing, before that work starts. Neither side is bound to additional work without written agreement on scope and price.",
      "5.2 Additional work requested during the project may move the delivery date, and we will say by how much when we quote it.",
    ],
  },
  {
    title: "6. Timeline and your dependencies",
    paras: [
      "6.1 The delivery window is 10 working days, counted from the day all agreed assets and information have reached us, not from the day of payment.",
      "6.2 If your assets or a response from you arrive late, the delivery date moves day for day with the delay.",
      "6.3 If we do not hear from your side for 5 consecutive working days at any point, your slot moves behind clients who are ready, and your delivery date is re-agreed when you return.",
    ],
  },
  {
    title: "7. Feedback, revisions and sign-off",
    paras: [
      "7.1 We reply within 24 hours on working days and ask the same of you. Each working day a response sits with your side moves the delivery date by a day.",
      "7.2 The price includes two rounds of revisions in total across the project. A round is one consolidated set of change requests, gathered from your side and sent together. Further rounds, and any change of direction after a page has been signed off, are additional work under clause 5.",
      "7.3 Before work starts, you name one decision-maker for feedback and sign-off. Their approval is final on your side. Feedback from other people on your team only counts when it comes through them.",
    ],
  },
  {
    title: "8. Your content and our tools",
    paras: [
      "8.1 You confirm that you own, or hold the necessary rights and licences to, all material you give us for the project: names, logos, text, photographs, videos, fonts and anything else. You grant us a licence to use that material to build and deliver the website.",
      "8.2 You are responsible for claims arising from material you supply. If a third party brings a claim against us because material you provided infringed their rights, you will cover the losses and reasonable costs we incur from that claim.",
      "8.3 We choose the tools, frameworks and processes used to build the site, and we retain all rights in our pre-existing tools, know-how and working methods. Clause 9 covers what you own.",
    ],
  },
  {
    title: "9. Ownership",
    paras: [
      "9.1 On receipt of the full price, ownership of the delivered website, its copy and its design files passes to you. Until then, they remain ours.",
      "9.2 Your domain and hosting stay in your own accounts throughout, so nothing about your online presence is ever held by us.",
      "9.3 We may show the finished work, with your brand name, in our portfolio and our own marketing. If you prefer we do not, tell us in writing before go-live and we won't.",
    ],
  },
  {
    title: "10. Ending the project",
    paras: [
      "10.1 You may end the project at any time by writing to us. The deposit is retained under clause 3.3, and if the build has progressed beyond kickoff we may invoice a fair, stated share of the balance for work completed to date, against delivery of that work in its then-current state.",
      "10.2 If the project sits with your side for 30 days with no response, it is treated as closed, the deposit is retained, and restarting is scoped as a fresh project. We will warn you in writing before this clause takes effect.",
      "10.3 If we fail to deliver the scope in clause 4 for reasons within our control, everything you have paid under the Offer is refunded in full within 7 working days. This is the remedy both sides agree to for non-delivery.",
    ],
  },
  {
    title: "11. What we do not promise, and liability",
    paras: [
      "11.1 We promise the scope in clause 4, done properly. We do not promise business outcomes: traffic, search rankings, sales or enquiries depend on factors outside a website build.",
      "11.2 We are not responsible for third-party services, including hosting providers, domain registrars, fonts, integrations and payment of their fees, or for their outages, price changes or policy changes.",
      "11.3 Neither side is liable to the other for indirect or consequential loss, including lost profits or lost business. Our total liability under or in connection with the Offer is capped at the amount you have actually paid us under it.",
      "11.4 Neither side is liable for delay or failure caused by events genuinely beyond its reasonable control, provided the affected side tells the other promptly and picks the work back up as soon as it can.",
    ],
  },
  {
    title: "12. General",
    paras: [
      "12.1 These terms, together with your confirmed application, are the entire agreement for the Offer, and replace anything said or written before it. Changes bind only if agreed in writing by both sides.",
      "12.2 If any clause is found unenforceable, the rest stand. If we let something slide once, that is not a waiver of the clause.",
      "12.3 These terms are governed by the laws of India, and the courts of Kolkata, West Bengal have jurisdiction over any dispute that cannot be resolved between us.",
      "12.4 Notices and questions go to hello@storyshaperscollective.com, and to the email address on your application.",
    ],
  },
];

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
  lineHeight: 1.8,
  color: "rgba(255, 255, 255, 0.8)",
};

export default function WebsitesTerms() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      const prev = el?.getAttribute("content") ?? null;
      el?.setAttribute("content", value);
      return () => {
        if (prev !== null) el?.setAttribute("content", prev);
      };
    };

    const restores = [
      setMeta('meta[name="description"]', PAGE_DESCRIPTION),
      setMeta('meta[property="og:title"]', PAGE_TITLE),
      setMeta('meta[property="og:description"]', PAGE_DESCRIPTION),
      setMeta('meta[property="og:url"]', PAGE_URL),
    ];

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", PAGE_URL);

    return () => {
      document.title = prevTitle;
      restores.forEach((r) => r());
      if (prevCanonical !== null) canonical?.setAttribute("href", prevCanonical);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#0C0A3E" }} className="min-h-screen">
      <Navbar />
      <main style={{ padding: "8rem 2rem 5rem" }}>
        <div className="mx-auto" style={{ maxWidth: "640px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "1.5rem",
            }}
          >
            Independence Day Offer
          </p>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
            data-testid="text-terms-title"
          >
            Terms and conditions
          </h1>
          <p style={{ ...bodyStyle, marginBottom: "1rem" }}>
            These terms govern the Independence Day website offer at
            storyshaperscollective.com/websites. Together with your confirmed application, they are
            the agreement between The Story Shapers and your brand.
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "3.5rem",
            }}
            data-testid="text-terms-updated"
          >
            Last updated 12 August 2026
          </p>

          {SECTIONS.map((section) => (
            <section key={section.title} style={{ marginBottom: "2.75rem" }}>
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  marginBottom: "0.9rem",
                }}
              >
                {section.title}
              </h2>
              {section.paras.map((para) => (
                <p key={para.slice(0, 32)} style={{ ...bodyStyle, marginBottom: "0.9rem" }}>
                  {para}
                </p>
              ))}
            </section>
          ))}

          <p style={{ ...bodyStyle, marginTop: "3rem" }}>
            <a
              href="/websites"
              style={{
                color: "#c084fc",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              data-testid="link-back-offer"
            >
              Back to the offer
            </a>
          </p>
        </div>
      </main>
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "2rem",
          textAlign: "center",
        }}
        data-testid="footer-terms"
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          © 2026 The Story Shapers. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
