import { CtaButton } from "../cta-button";
import { Highlight } from "../highlight";
import { Reveal } from "../reveal";
import { Section } from "../section";

/**
 * The subtext, on its own. One sentence, one button, one line of fine print.
 */
export function TheOfferLine() {
  return (
    <Section eyebrow="THE AUGUST OFFER" className="bg-navy-lift">
      <Reveal>
        <p className="o-display max-w-[30ch] text-[30px] leading-[1.16] sm:text-[40px] md:text-[50px]">
          This August we’re handpicking five brands
          <span className="font-body font-light text-white/70">
            {" "}
            to shape their story and build them a high-functioning website at{" "}
            {/* The price is the whole offer — it gets the same drawn rule as
                the 45+ years in "Why us", and nothing else on the page does. */}
            <Highlight>₹79,000*</Highlight> all in.
          </span>
        </p>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-12 flex flex-col items-start gap-5 md:mt-14 md:flex-row md:items-center md:gap-8">
          <CtaButton />
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[1.6px] text-white/45">
            *Offer valid till 31st August 2026, limited slots only
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
