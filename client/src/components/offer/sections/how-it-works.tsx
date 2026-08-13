import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

const STEPS = [
  "Apply using the form below",
  "A 30-minute alignment call",
  "₹25,000 upfront to hold your slot",
  "Send us what we need to get started",
];

/**
 * Where each node actually sits along the rail, measured rather than guessed:
 * with a 4-column grid the dots land at 0, 1/3, 2/3 and 1 of the span between
 * the first and last dot. The fill is capped at the last node (see RAIL_END) so
 * the lit line stops on the final dot instead of running past it.
 */
const NODE_AT = [0, 1 / 3, 2 / 3, 1];
/** How long after the fill reaches a node it takes to finish lighting. */
const NODE_SPAN = 0.08;
/**
 * Fraction of the rail's width at which the last dot sits: three of four
 * columns plus three of the three gaps, over the full width. With the page's
 * 1120px container and 40px gaps that is 0.777.
 */
const RAIL_END = 0.777;

const DIM_NODE = "rgba(255, 255, 255, 0.22)";
const DIM_NUMBER = "rgba(255, 255, 255, 0.55)";
const LIT = "rgba(205, 66, 202, 1)";
/** The colour the payoff border settles on — shared so the reduced-motion
    branch rests exactly where the animated one ends. */
const PAYOFF_BORDER_LIT = "rgba(205, 66, 202, 0.7)";

/**
 * A single continuous rail with four nodes on it — no arrows crowding the
 * cards. Horizontal on desktop, vertical on mobile.
 *
 * The rail fills in as you scroll the section and each node lights as the fill
 * reaches it, so the four steps read as a thing that progresses rather than
 * four captions in a row. Everything is scroll-position driven through motion
 * values (no React state, no scroll listener) and only ever touches transform,
 * colour and opacity.
 */
export function HowItWorks() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    // Starts as the list arrives near the bottom of the viewport, completes
    // once its end has travelled past the middle. Roughly 500px of scroll on
    // desktop, so the fill is noticeable without needing to be hunted for.
    offset: ["start 0.9", "end 0.45"],
  });

  // Overdamped (zeta ~2), so it trails the scrollbar slightly instead of being
  // welded to it, and can never overshoot past the end of the rail.
  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const progress = useTransform(eased, (v) => Math.min(1, Math.max(0, v)));

  /* The dots sit at the LEFT edge of each of four grid columns, so the last one
     is not at the right edge of the rail — it is 3/4 of the way along, plus its
     share of the gaps. Capping the fill here stops the lit line running past the
     final dot and dead-ending against the container edge. */
  const railScale = useTransform(progress, (v) => v * RAIL_END);

  const payoffBorder = useTransform(
    progress,
    [0.78, 1],
    ["rgba(148, 36, 147, 0.3)", PAYOFF_BORDER_LIT],
  );

  return (
    <Section eyebrow="HOW IT WORKS" className="bg-navy-lift">
      <Reveal>
        <MixedHeading display="Four steps" light="to the website you want." />
      </Reveal>

      {/* The rails live on this wrapper, not inside the <ol>. An <ol> may only
          contain <li>, so hanging decorative spans off it was invalid markup. */}
      <div className="relative mt-16 md:mt-20">
        {/* The unlit rail: one line through every node. */}
        <span
          aria-hidden
          className="absolute bottom-1 left-[7px] top-1 w-px bg-gradient-to-b from-white/14 via-white/14 to-transparent md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:bg-gradient-to-r"
        />

        {/* The lit fill, laid exactly over it. Two elements rather than one
            because the rail runs down the page on mobile and across it on
            desktop, and each axis needs its own origin. CSS picks which is
            live; only one is ever painted. */}
        {reduced ? (
          <>
            <span
              aria-hidden
              className="o-rail-fill absolute bottom-1 left-[7px] top-1 w-px md:hidden"
            />
            <span
              aria-hidden
              className="o-rail-fill absolute left-0 top-[7px] hidden h-px md:block"
              style={{ right: `${(1 - RAIL_END) * 100}%` }}
            />
          </>
        ) : (
          <>
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="o-rail-fill absolute bottom-1 left-[7px] top-1 w-px origin-top md:hidden"
            />
            <motion.span
              aria-hidden
              style={{ scaleX: railScale }}
              className="o-rail-fill absolute left-0 right-0 top-[7px] hidden h-px origin-left md:block"
            />
          </>
        )}

        <ol ref={railRef} className="grid gap-10 md:grid-cols-4 md:gap-10">
          {STEPS.map((step, i) => (
            <Step key={step} index={i} label={step} progress={progress} />
          ))}
        </ol>
      </div>

      <Reveal delay={5}>
        {reduced ? (
          <div
            style={{ borderColor: PAYOFF_BORDER_LIT }}
            className="mt-16 flex flex-col gap-3 rounded-2xl border bg-magenta/25 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 md:mt-20"
          >
            <PayoffContent />
          </div>
        ) : (
          /* The border warms as the rail completes — the bar finishing and the
             promise landing are the same beat. */
          <motion.div
            style={{ borderColor: payoffBorder }}
            className="mt-16 flex flex-col gap-3 rounded-2xl border bg-magenta/25 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 md:mt-20"
          >
            <PayoffContent />
          </motion.div>
        )}
      </Reveal>
    </Section>
  );
}

function PayoffContent() {
  return (
    <>
      <p className="o-display text-[19px] leading-snug sm:text-[24px]">
        10 working days later, your website is live.
      </p>
      {/* Slots run in sequence, so the start date is the thing people are
          actually uncertain about. Say it here rather than in the terms. */}
      <div className="font-mono text-[11px] uppercase leading-[1.7] tracking-[1.6px] text-white/60 sm:text-right">
        <p>The clock starts when your assets land</p>
        <p>Your kickoff date is confirmed before you pay</p>
      </div>
    </>
  );
}

function Step({
  index,
  label,
  progress,
}: {
  index: number;
  label: string;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();

  /* The fill travels from the first dot to the last as progress runs 0→1, so
     node i is reached at exactly i/3 — the timing follows the layout instead of
     approximating it, and no dot can light before the line arrives. */
  const from = NODE_AT[index];
  const to = Math.min(1, from + NODE_SPAN);

  const borderColor = useTransform(progress, [from, to], [DIM_NODE, LIT]);
  const numberColor = useTransform(progress, [from, to], [DIM_NUMBER, LIT]);

  const content = (
    <>
      {reduced ? (
        <span
          aria-hidden
          className="absolute left-0 top-[3px] block size-[15px] rounded-full border-2 bg-navy-lift md:relative md:top-0 md:mb-7"
          style={{ borderColor: LIT }}
        />
      ) : (
        <motion.span
          aria-hidden
          style={{ borderColor }}
          className="absolute left-0 top-[3px] block size-[15px] rounded-full border-2 bg-navy-lift md:relative md:top-0 md:mb-7"
        />
      )}

      {reduced ? (
        <span
          className="font-mono text-[12px] font-bold tracking-[1.6px]"
          style={{ color: LIT }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : (
        <motion.span
          style={{ color: numberColor }}
          className="font-mono text-[12px] font-bold tracking-[1.6px]"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      )}

      <p className="o-display mt-3 max-w-[22ch] text-[18px] leading-snug sm:text-[20px]">
        {label}
      </p>
    </>
  );

  if (reduced) {
    return <li className="relative pl-8 md:pl-0">{content}</li>;
  }

  return (
    /* The rise lives on the <li> itself rather than in a <Reveal> wrapper, so
       the list items stay direct children of the <ol> — a <div> in between
       breaks the list for screen readers. */
    <motion.li
      className="relative pl-8 md:pl-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: 0.6,
        delay: (index + 1) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {content}
    </motion.li>
  );
}
