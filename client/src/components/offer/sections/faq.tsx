import { Accordion, type QA } from "../accordion";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

const ITEMS: QA[] = [
  {
    q: "How many rounds of changes do I get?",
    a: "Two on the copy, two on the design. Most of the argument happens before anyone writes a word — that’s what the 30-minute call is for. We agree on what the site is saying, then we write it.",
  },
  {
    q: "Can we add more later — a store, more pages, a blog?",
    a: "Of course. It just isn’t part of this. If you know you’ll need it, say so on the call and we’ll scope it separately so nothing gets quietly bolted on mid-build.",
  },
  {
    q: "What do I actually get at the end?",
    a: "A finished, live website. Written, designed, built, mobile-ready, with the technical bits done — meta and OG tags, analytics, compressed images, working forms. All of it is yours: copy, design and build transfer to you once the balance is paid. Domain and hosting stay in your name from day one.",
  },
  {
    q: "I don’t have photos. Or a logo. Or anything, really.",
    a: "Say that on the call. We’ll work with what you have and tell you honestly whether it’s enough. If you need photography or an identity, that’s a separate piece of work — we’ll say so upfront rather than making it your problem later.",
  },
  {
    q: "Is the ₹25,000 really non-refundable?",
    a: "Yes, and it’s only due after the call, once we’ve both said yes. It comes off the total — so you pay ₹54,000 at launch, not extra. It’s what makes five slots real.",
  },
];

export function Faq() {
  return (
    <Section eyebrow="FAQ">
      <Reveal>
        <MixedHeading display="Frequently" light="asked questions." />
      </Reveal>
      <div className="mt-12 max-w-[880px]">
        <Reveal delay={1}>
          <Accordion items={ITEMS} />
        </Reveal>
      </div>
    </Section>
  );
}
