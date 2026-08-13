import { Accordion, type QA } from "../accordion";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

/* Every answer here has a matching clause in /offer/terms. If you edit one,
   check the other — a FAQ that contradicts the terms is the version a client
   will hold you to. Clause numbers noted so the pairing survives edits. */
const ITEMS: QA[] = [
  {
    q: "How many rounds of changes do I get?",
    /* Terms clause 7. “Across the whole site” is the bit people assume wrongly. */
    a: "Two on the copy, two on the design, counted across the whole site rather than per page. Most of the argument happens before anyone writes a word, which is what the 30-minute call is for. We agree what the site is saying, then we write it.",
  },
  {
    q: "Can we add more later — a store, more pages, a blog?",
    /* Terms clause 4. */
    a: "Of course. It just isn’t part of this one. If you already know you’ll need it, say so on the call and we’ll scope it separately, so nothing gets quietly bolted on mid-build.",
  },
  {
    q: "What do I actually get at the end?",
    /* Terms clauses 2, 9, 10. Ownership is gated on the balance — say so. */
    a: "A finished website, live on a domain and hosting held in your name. Written, designed, built, mobile-ready, with the technical bits done: meta and OG tags, analytics, compressed images, working forms. The copy, design and build become yours once the balance is paid. Fonts, stock images and anything else licensed from a third party come to you on that licensor’s terms, because they were never ours to hand over.",
  },
  {
    q: "I don’t have photos. Or a logo. Or anything, really.",
    /* Terms clauses 4, 8. */
    a: "Say that on the call. We’ll work with what you have and tell you honestly whether it’s enough. If you need photography or an identity, that’s a separate piece of work, and we’ll say so upfront rather than making it your problem later.",
  },
  {
    q: "When do we actually start?",
    /* Terms clauses 2, 6. The clock does NOT start at kickoff — it starts when
       the last asset lands. The old answer blurred the two. */
    a: "We take a limited number of builds at a time, so slots run in the order booking fees come in. You get your kickoff date in writing before you pay anything. The 10 working days don’t run from the kickoff date itself: they start the day after the last thing on your asset checklist reaches us, and they pause whenever we’re waiting on you.",
  },
  {
    q: "What if I’m slow getting things back to you?",
    /* Terms clause 6. Deemed approval at five working days is a real term, so
       it belongs on the sales page, not just buried in the T&Cs. */
    a: "The finish date moves by however long you take, and we’ll tell you when it moves. Nothing dramatic. But if something sits with you unanswered for more than five working days we’ll write to say we’re treating it as approved and carrying on, because the alternative is your slot blocking the next brand’s. Tell us in advance if you’re travelling and we’ll plan around it.",
  },
  {
    q: "What happens to the ₹25,000 if things change?",
    /* Terms clauses 5, 12. Two things the old answer left out: the 48 hours
       also requires “before kickoff”, and our-side cancellation refunds unless
       you’re the one in breach. */
    a: "It’s only due after the call, once we’ve both said yes, and it comes off the total, so you pay ₹54,000 at launch and nothing on top. Change your mind within 48 hours of paying, and before we’ve kicked off, and you get it back in full. After that it’s holding your slot and turning other people away, so it stays with us if you walk. If we’re the ones who cancel, for any reason other than you breaking the terms, you get it back in full.",
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
