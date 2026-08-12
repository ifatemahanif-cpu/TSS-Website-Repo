import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

const STEPS = [
  "Apply using the form below",
  "A 30-minute alignment call",
  "₹25,000 upfront to hold your slot",
  "Send us what we need to get started",
];

/**
 * A single continuous rail with four nodes on it — no arrows crowding the
 * cards. Horizontal on desktop, vertical on mobile.
 */
export function HowItWorks() {
  return (
    <Section eyebrow="HOW IT WORKS" className="bg-navy-lift">
      <Reveal>
        <MixedHeading display="Four steps" light="to the website you want." />
      </Reveal>

      <ol className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-10">
        {/* The rail: one line through every node. */}
        <span
          aria-hidden
          className="absolute bottom-1 left-[7px] top-1 w-px bg-gradient-to-b from-white/14 via-white/14 to-transparent md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:bg-gradient-to-r"
        />

        {STEPS.map((step, i) => (
          <Reveal key={step} delay={i + 1}>
            <li className="relative pl-8 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-[3px] block size-[15px] rounded-full border-2 border-magenta-lift bg-navy-lift md:relative md:top-0 md:mb-7"
              />
              <span className="font-mono text-[12px] font-bold tracking-[1.6px] text-magenta-lift/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="o-display mt-3 max-w-[22ch] text-[18px] leading-snug sm:text-[20px]">
                {step}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={5}>
        <div className="mt-16 flex flex-col gap-3 rounded-2xl border border-magenta-lift/40 bg-magenta/25 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 md:mt-20">
          <p className="o-display text-[19px] leading-snug sm:text-[24px]">
            10 working days later, your website is live.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[1.6px] text-white/60">
            The clock starts when your assets land
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
