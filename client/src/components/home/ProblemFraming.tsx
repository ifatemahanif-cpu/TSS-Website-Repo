import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { Act, ActLabel, ActWrap } from "./Act";
import { Stitch } from "./Stitch";

const BLACK = "#06041A";

/**
 * THE TURN — the hinge of the page, and the only act that is one sentence
 * correcting another.
 *
 * WHAT THIS REPLACED, AND WHY
 *
 * Four rounded pills of symptoms ("Content goes out every week. You couldn't
 * point to a single lead it brought in.") on the house navy. They were true and
 * they were well observed, and four of them in a row is a diagnosis — the page
 * spent its hinge listing what is wrong with the reader's business. The claim
 * underneath all four is one line long, and stated once it is a belief rather
 * than an audit.
 *
 * The ground drops to near-black here, the only time on the page it goes darker
 * than navy. The act is a held breath, and it is followed by the cut to bone.
 *
 * NOTE FOR WHOEVER WIRES THE CMS BACK UP
 *
 * The old section read `settings.problem` and the `problems` table. Nothing on
 * the homepage reads either any more. Both are still served and still edited
 * from the admin, so the honest version is: editing them changes nothing until
 * someone points something at them again. The two lines below cannot come from
 * a text field as they stand, because one of them carries a stitch under a
 * single word — that is markup, not copy.
 *
 * THE SECOND LINE IS WIPED, NOT FADED
 *
 * Both lines used to arrive on a 700ms fade triggered on intersection, which is
 * finished before most readers reach the act — so the hinge of the page was, in
 * practice, two static lines on a black screen, and Fatema could see no motion
 * in it because there was none left to see. The correction now arrives by being
 * written over the top of the thing it corrects, at exactly the speed the
 * reader scrolls.
 */
export function ProblemFraming() {
  return (
    <Act id="act-turn" kind="flow" ground="dark" bg={BLACK}>
      {(progress) => <Turn progress={progress} />}
    </Act>
  );
}

const LINE: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Zodiak', Georgia, serif",
  fontSize: "clamp(2.4rem, 6.2vw, 5.2rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.028em",
};

function Turn({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();

  const label = useTransform(progress, [0.08, 0.15], [0, 1], { clamp: true });
  const before = useTransform(progress, [0.14, 0.24], [0, 1], { clamp: true });

  /* cubic ease-out on the wipe: linear, an edge crossing five words at constant
     speed reads as a loading bar. Eased, it arrives. */
  const wipe = useTransform(progress, [0.28, 0.52], [0, 1], { clamp: true });
  const clipPath = useTransform(wipe, (v) => {
    const e = 1 - Math.pow(1 - v, 3);
    return `inset(0 ${((1 - e) * 100).toFixed(2)}% 0 0)`;
  });

  return (
    <ActWrap className="max-w-[64rem]">
      {/* the act's heading, and the only one it has: the belief itself is set
          in two paragraphs so that the second can wipe over the first */}
      <ActLabel as="h2" className="mb-[clamp(1.4rem,3vh,2.2rem)]">
        <motion.span className="block" style={{ opacity: reduced ? 1 : label }}>
          A core belief
        </motion.span>
      </ActLabel>

      {/* 0.38, not the 0.34 it started at: 0.34 measured 2.94:1 on a phone and
          large text needs 3:1, so it missed by a hair. The device survives —
          the second line is 20:1, so this still reads as said under the
          breath. */}
      <motion.p
        style={{ ...LINE, color: "rgba(255,255,255,0.38)", opacity: reduced ? 1 : before }}
        data-testid="text-turn-before"
      >
        Most marketing problems aren't execution problems.
      </motion.p>

      <motion.p
        style={{
          ...LINE,
          marginTop: "0.24em",
          fontWeight: 700,
          color: "#FFFFFF",
          ...(reduced ? null : { clipPath }),
        }}
        data-testid="text-turn-after"
      >
        They're <Stitch progress={progress} from={0.5} to={0.62}>story</Stitch>{" "}
        problems.
      </motion.p>
    </ActWrap>
  );
}
