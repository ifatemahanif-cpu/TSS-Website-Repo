import { useRef, type ReactNode } from "react";
import { useReducedMotion, type MotionValue } from "framer-motion";
import { useActProgress, useFlowProgress } from "@/hooks/use-act-progress";

/**
 * One act of the homepage score.
 *
 * The page is six of these — the Shaping, the turn, the peak, the work, what we
 * do, the close — and every one of them is either PINNED or FLOWING:
 *
 *   pin   the stage holds the screen while its beat plays, then lets go. The
 *         section is `span` screens tall and the stage inside it is one screen,
 *         stuck to the top. `span` is how much SCROLL the beat costs, not how
 *         much it contains.
 *   flow  an ordinary-height section that arrives as you reach it.
 *
 * Children are a function of progress, because progress is a MotionValue and
 * passing it down as a prop is what keeps the whole page off React's render
 * path: scrolling drives transforms and opacities directly, and not one act
 * re-renders while you scroll it.
 *
 *   <Act id="act-peak" kind="pin" span={3.4} ground="light" bg="#F4F1EA">
 *     {(p) => <Peak progress={p} />}
 *   </Act>
 *
 * GROUND
 *
 * `ground` and `bg` are not decoration. The nav is a fixed bar over five
 * different backgrounds — deep navy, near-black, bone, navy again — so it has to
 * know which one is under it to pick its ink, and it has to know the exact
 * colour to fill its own scrim with. Both are published as data attributes and
 * read by the nav; declaring them here is what stops them drifting from the
 * background an act actually paints.
 *
 * REDUCED MOTION
 *
 * A pinned act stops pinning: the tall section collapses to its content's
 * height and the stage stops being sticky. Left in, it would be nearly two
 * screens of scrolling past a still image — the animation is the only reason
 * that height exists. Progress arrives as a constant 1, so every paint driven
 * by it sits at its end state.
 */

export type ActKind = "pin" | "flow";

export function Act({
  id,
  kind = "flow",
  span = 1,
  ground = "dark",
  bg = "#0C0A3E",
  className = "",
  stageClassName = "",
  stageMinH = "min-h-svh",
  children,
}: {
  id: string;
  kind?: ActKind;
  /** pin only: how many screens of scroll the beat costs. Ignored when flowing. */
  span?: number;
  /** which ink the nav needs over this act */
  ground?: "dark" | "light";
  /** the exact colour this act paints, for the nav's scrim */
  bg?: string;
  className?: string;
  stageClassName?: string;
  /**
   * A full screen unless an act has a reason not to claim one. The close is
   * `min-h-[76svh]`: measured, its content filled 40% of a full-height stage
   * and left a quarter-screen of nothing between the button and the footer.
   * Its own prop rather than a className because two `min-h-*` utilities on
   * one element is a specificity coin toss.
   */
  stageMinH?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  /* Both hooks run every render — they have to, hook order is not negotiable —
     and the one the act does not use is reading a ref nobody scrolls past in a
     way that matters. The alternative is two components with duplicated
     ground/scrim plumbing. */
  const pinned = useActProgress(ref);
  const flowed = useFlowProgress(ref);
  const progress = kind === "pin" ? pinned : flowed;

  const isPinned = kind === "pin" && !reduced;

  return (
    <section
      id={id}
      ref={ref}
      data-ground={ground}
      data-bg={bg}
      data-act={kind}
      className={`relative ${className}`}
      style={{
        backgroundColor: bg,
        ...(isPinned ? { height: `${span * 100}svh` } : null),
      }}
    >
      <div
        className={
          (isPinned ? "sticky top-0 " : "") +
          `flex ${stageMinH} w-full items-center justify-center ` +
          "px-6 py-20 sm:px-10 lg:px-20 " +
          stageClassName
        }
      >
        {children(progress)}
      </div>
    </section>
  );
}

/**
 * The 78rem column every act's content sits in, so the page has one measure and
 * not six. Acts that need to break out of it (the work rail pans full-bleed)
 * simply do not use it.
 */
export function ActWrap({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`w-full max-w-[78rem] ${className}`}>{children}</div>;
}
