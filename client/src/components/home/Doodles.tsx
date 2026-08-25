import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * The four line characters — smiley, crew, eye, heart — drawn by SCROLL.
 *
 * The homepage already has a set of these inside Hero.tsx, drawn on a timer,
 * because the hero there is a timed film. The rework's acts are scroll scores,
 * so these take a progress MotionValue instead and draw exactly as fast as the
 * reader moves. Hero.tsx keeps its own copies until its own act is rebuilt, at
 * which point there is one set and this is it.
 *
 * Each one sits in the act where its meaning lives, which is the rule that
 * stopped them being sprinkled:
 *   smiley  "Hello."                  -> the wink after the Shaping lands
 *   crew    "senior-led collective"   -> opens the peak, becomes the faces
 *   eye     "impossible to ignore"    -> the work, where that promise cashes
 *   heart   "for who they really are" -> the close, the human invitation
 *
 * `strokeLinecap: round` paints a round cap even when the visible dash length is
 * zero, so an undrawn stroke is not invisible — it is a DOT sitting in the
 * layout. Opacity is driven alongside pathLength for that reason alone.
 */

const ACCENT = "#cf81cd";

/** pathLength and opacity from one progress value, over [from, to]. */
function useStroke(progress: MotionValue<number>, from: number, to: number) {
  return {
    pathLength: useTransform(progress, [from, to], [0, 1], { clamp: true }),
    opacity: useTransform(progress, [from, from + 0.02], [0, 1], { clamp: true }),
  };
}

/**
 * The close's heart. One stroke, so it has no sequence to get wrong — it draws
 * itself and then keeps a slow beat.
 *
 * The beat is a CSS-style repeat rather than scroll-driven on purpose: it is
 * ambient rather than narrative, and a heartbeat you have to scroll is not a
 * heartbeat.
 */
export function HeartDoodle({
  progress,
  from = 0.26,
  to = 0.42,
  className = "",
}: {
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  className?: string;
}) {
  const stroke = useStroke(progress, from, to);

  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      animate={{ scale: [1, 1.14, 1, 1.1, 1] }}
      transition={{
        duration: 1.5,
        times: [0, 0.25, 0.5, 0.72, 1],
        delay: 1.5,
        repeat: Infinity,
        repeatDelay: 1.2,
      }}
    >
      <motion.path
        d="M50 86 C22 62 10 44 17 30 C24 16 43 18 50 32 C57 18 76 16 83 30 C90 44 78 62 50 86"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        style={stroke}
      />
    </motion.svg>
  );
}
