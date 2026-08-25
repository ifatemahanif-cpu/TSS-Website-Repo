import { useScroll, useReducedMotion, useMotionValue, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

/**
 * Scroll progress across one PINNED act, 0 at its first frame and 1 at its last.
 *
 * The homepage is a score, not a stack of sections. Three of its acts hold the
 * screen while their animation plays and only then release it — the hero's
 * sentence carving itself down, the peak's three panels wiping across, the work
 * rail panning sideways. Each of those needs one number: how far through its own
 * beat the reader is.
 *
 * The prototype (~/scrollcraft) drove that with its own engine, and the engine
 * is deliberately NOT coming with it. It has no teardown — no `destroy`, no
 * `removeEventListener`, no observer disconnect — so under wouter it would leak
 * a scroll listener on every navigation away from the homepage. Everything here
 * is a framer-motion hook, which unsubscribes when the component unmounts.
 *
 * HOW AN ACT IS BUILT
 *
 *   <section ref={ref} style={{ height: `${span * 100}svh` }}>
 *     <div className="sticky top-0 h-svh">…</div>
 *   </section>
 *
 * The section is `span` screens tall; the stage inside it is one screen tall and
 * sticky, so it holds still while the section scrolls past. `span` is therefore
 * how much SCROLL the beat costs, not how much it contains: a span of 2.8 means
 * 1.8 screens of scrolling with the stage pinned. Use the <Act> component rather
 * than writing that markup by hand.
 *
 * The `["start start", "end end"]` offset is what makes progress line up with
 * the pin exactly: 0 the moment the section's top meets the viewport's top —
 * which is the moment the sticky stage locks — and 1 when its bottom meets the
 * viewport's bottom, which is the moment the stage lets go. Any other offset
 * leaves the stage moving while progress is already finished, or finished while
 * the stage is still pinned, and the act's last frame gets skipped.
 *
 * REDUCED MOTION
 *
 * Returns a constant 1: every paint driven by this value lands on its end state
 * and stays there. Callers must ALSO stop pinning — a sticky stage with nothing
 * happening in it is 1.8 screens of scrolling past a still image. <Act> does
 * that for you.
 */
export function useActProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const reduced = useReducedMotion();

  /* Created unconditionally so the hook order never changes, and only returned
     when motion is off. A `useMotionValue` costs nothing when nothing reads it. */
  const settled = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return reduced ? settled : scrollYProgress;
}

/**
 * The same number for an act that does NOT pin — the turn, the services list,
 * the close. These are ordinary-height sections, so progress has to be measured
 * against the viewport rather than against a pin.
 *
 * 0 as the section's top reaches the bottom of the screen, 1 once its bottom has
 * passed the middle. That window is deliberately generous: a flow act's job is
 * to have finished arriving by the time the reader is looking at it, not to
 * animate under their eyes.
 */
export function useFlowProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const reduced = useReducedMotion();
  const settled = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.55"],
  });

  return reduced ? settled : scrollYProgress;
}

/**
 * A stable ref for an act's <section>, typed the way both hooks above want it.
 *
 * Only here so every act declares its ref the same way and no one has to
 * remember which of `HTMLElement | null` the hooks accept.
 */
export function useActRef() {
  return useRef<HTMLElement | null>(null);
}
