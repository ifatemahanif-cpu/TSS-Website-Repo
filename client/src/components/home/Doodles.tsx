import { useEffect, useRef, type MutableRefObject } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * The four line characters — smiley, crew, eye, heart.
 *
 * The homepage already has a set of these inside Hero.tsx, drawn on a timer,
 * because the hero there is a timed film. Hero.tsx keeps its own copies until
 * its own act is rebuilt, at which point there is one set and this is it.
 *
 * TWO WAYS TO DRAW, AND WHICH ONE DEPENDS ON THE ACT
 *
 * A doodle inside a FLOWING act takes the act's progress and draws exactly as
 * fast as the reader scrolls (the close's heart). A doodle inside a PINNED act
 * cannot: progress is 0 for the whole time the section is rising into view, so
 * a scroll-driven stroke is a hole in the layout for every frame the reader can
 * actually see, and only starts once the stage has already locked. Those draw
 * on ENTRY instead (the peak's crew).
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
/* the same accent, dropped for the bone ground: #cf81cd on #F4F1EA measures
   2.1:1 and reads as a printing fault rather than as a colour choice */
const ACCENT_DEEP = "#7b1e7a";

/**
 * A stroke that draws itself once, on entry, after `delay` seconds. Returned as
 * framer props rather than a style object because these are animations with a
 * beginning and an end, not values slaved to a scrollbar.
 *
 * With motion off it is simply drawn: no `initial`, so it never passes through
 * a state where a round linecap is sitting on the screen as a dot.
 */
function drawOnEntry(inView: boolean, reduced: boolean | null, delay: number) {
  if (reduced) {
    return { initial: false as const, animate: { pathLength: 1, opacity: 1 } };
  }
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : {},
    transition: {
      pathLength: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.01, delay },
    },
  };
}

/** pathLength and opacity from one progress value, over [from, to]. */
function useStroke(progress: MotionValue<number>, from: number, to: number) {
  return {
    pathLength: useTransform(progress, [from, to], [0, 1], { clamp: true }),
    opacity: useTransform(progress, [from, from + 0.02], [0, 1], { clamp: true }),
  };
}

/**
 * The peak's crew — three drawn people, in the same row the three photographs
 * land in at the end of the act. The act is the drawing becoming real.
 *
 * Each PERSON's two strokes draw together rather than all six in sequence. Drawn
 * stroke by stroke, a head caught half-finished is a lone bowl sitting next to
 * two complete people, and the doodle passes through a state that reads as
 * something else on its way to being itself.
 */
export function CrewDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  /* ON ENTRY, NOT ON ACT PROGRESS — and that is not a shortcut.
     The peak is PINNED, so its progress is 0 for the whole time the section is
     rising into view from the bottom of the screen. Driven by progress, the
     crew is a hole in the intro's layout for every frame the reader can
     actually see it, and only starts drawing once the stage has already locked.
     Entry is the moment it needs to answer. */
  const a = drawOnEntry(inView, reduced, 0);
  const b = drawOnEntry(inView, reduced, 0.28);
  const c = drawOnEntry(inView, reduced, 0.56);

  return (
    <motion.svg
      ref={ref}
      className={className}
      viewBox="0 0 150 100"
      fill="none"
      aria-hidden="true"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
    >
      {/* rotated so a circle dash-reveals from 12 o'clock: half of one is then
          an arc over the shoulders, a head arriving, rather than a bowl sitting
          open at the top — which reads as a detached smile */}
      <motion.circle cx="32" cy="46" r="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform="rotate(-90 32 46)" {...a} />
      <motion.path d="M14 88 C18 68 46 68 50 88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...a} />
      <motion.circle cx="75" cy="38" r="12" stroke={ACCENT_DEEP} strokeWidth="5" strokeLinecap="round" transform="rotate(-90 75 38)" {...b} />
      <motion.path d="M57 82 C61 61 89 61 93 82" stroke={ACCENT_DEEP} strokeWidth="5" strokeLinecap="round" {...b} />
      <motion.circle cx="118" cy="46" r="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform="rotate(-90 118 46)" {...c} />
      <motion.path d="M100 88 C104 68 132 68 136 88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...c} />
    </motion.svg>
  );
}

/**
 * The hero's wink, and the only doodle driven by a value PUSHED IN rather than
 * read off an act's progress.
 *
 * The hero paints imperatively — twenty-two word widths and a font size per
 * frame, which through React would be twenty-two components re-rendering for
 * the length of a three-screen act. So it owns the clock, and hands this one a
 * setter through `draw`. Everything else in this file subscribes to its own act.
 *
 * The four strokes land in sequence rather than together, so it reads as drawn
 * rather than faded in: outline, two eyes, then the smile. Once complete it
 * blinks on a timer, which is idle life and not narrative — a wink you have to
 * scroll is not a wink.
 */
export function SmileyDoodle({
  draw,
}: {
  draw: MutableRefObject<((q: number) => void) | null>;
}) {
  const reduced = useReducedMotion();
  const p = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    draw.current = (q) => p.set(q);
    return () => {
      draw.current = null;
    };
  }, [draw, p]);

  /* the engine's sequencing, kept exactly: four units over 1.7 of nominal time,
     each starting a fifth of the way after the last */
  const N = 4;
  const SPAN = 1.7 / (N + 1.2);
  const at = (u: number) => u / (N + 1.2);

  const a = useStroke(p, at(0), at(0) + SPAN);
  const b = useStroke(p, at(1), at(1) + SPAN);
  const c = useStroke(p, at(2), at(2) + SPAN);
  const d = useStroke(p, at(3), at(3) + SPAN);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="block h-auto w-full"
      style={{ overflow: "visible" }}
    >
      <motion.path
        d="M50 9 C74 8 92 26 91 50 C90 75 74 92 50 91 C26 90 9 74 9 50 C9 26 27 10 50 9"
        stroke="rgba(255,255,255,0.9)" strokeWidth="5" strokeLinecap="round" style={a}
      />
      <motion.path d="M36 40 L36 48" stroke="rgba(255,255,255,0.9)" strokeWidth="5" strokeLinecap="round" style={b} />
      <motion.path
        d="M64 40 L64 48"
        stroke="rgba(255,255,255,0.9)" strokeWidth="5" strokeLinecap="round"
        style={{ ...c, transformBox: "view-box", transformOrigin: "64px 44px" }}
        animate={reduced ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
        transition={{ duration: 2.8, times: [0, 0.55, 0.62, 0.7, 1], repeat: Infinity, delay: 1 }}
      />
      <motion.path d="M31 61 C39 73 61 74 70 60" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" style={d} />
    </motion.svg>
  );
}

/**
 * The work rail's eye. "Impossible to ignore" was a promise; this is the act
 * where it cashes.
 *
 * Draws on entry for the same reason the crew does: the rail is a PINNED act,
 * so its progress is 0 for the whole time the section climbs into view and a
 * scroll-driven stroke would be a hole in the header until the stage locks. The
 * lid arrives before the pupil, which is the order an eye opens in.
 */
export function EyeDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();

  const lids = drawOnEntry(inView, reduced, 0);
  const pupil = drawOnEntry(inView, reduced, 0.5);

  return (
    <motion.svg
      ref={ref}
      className={className}
      viewBox="0 0 150 100"
      fill="none"
      aria-hidden="true"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
    >
      <motion.path d="M15 50 C40 16 110 16 135 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...lids} />
      <motion.path d="M15 50 C40 84 110 84 135 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...lids} />
      <motion.circle cx="75" cy="50" r="13" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" transform="rotate(-90 75 50)" {...pupil} />
    </motion.svg>
  );
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
