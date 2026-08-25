import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

const ACCENT = "#cf81cd";

/**
 * THE STITCH — a line drawn under one word, left to right, on scroll.
 *
 * It appears exactly twice, and that is the point: under "stories" as the hero
 * settles, and under "story" as the turn corrects itself. Two moments three
 * screens apart, marked the same way, so the page says the second one is the
 * first one's answer without a sentence having to say it. Fatema cut the
 * sentence that used to say it.
 *
 * The word takes the accent once the line is most of the way across, not at the
 * start — the colour is the line ARRIVING, so it cannot precede it. Handed off
 * to a CSS transition rather than driven by scroll for the same reason the
 * close's heartbeat is: it is a reaction, and a reaction that runs backwards
 * when you scroll up is not one.
 *
 * The line is a gradient rather than a flat rule so its ends fade out. A flat
 * rule with square ends reads as an underline, which is a link. This reads as a
 * pen mark.
 */
export function Stitch({
  progress,
  from,
  to,
  ink = ACCENT,
  resting = "#FFFFFF",
  children,
}: {
  progress: MotionValue<number>;
  /** act progress at which the line starts drawing */
  from: number;
  /** act progress at which it has crossed the word */
  to: number;
  /** the colour the word takes once the line has arrived */
  ink?: string;
  /** the colour the word is before that */
  resting?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const drawn = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const colour = useTransform(drawn, (v) => (v > 0.85 ? ink : resting));

  return (
    <span className="relative inline-block">
      <motion.span
        className="relative transition-colors duration-300"
        style={{ color: reduced ? ink : colour }}
      >
        {children}
      </motion.span>
      <motion.i
        aria-hidden="true"
        className="absolute bottom-[0.02em] left-[0.01em] right-[0.06em] block h-[0.055em] min-h-[3px] rounded-[3px]"
        style={{
          transformOrigin: "left center",
          scaleX: reduced ? 1 : drawn,
          background:
            "linear-gradient(90deg, transparent, #c36cc1 14%, #edb8eb 52%, #c36cc1 86%, transparent)",
        }}
      />
    </span>
  );
}
