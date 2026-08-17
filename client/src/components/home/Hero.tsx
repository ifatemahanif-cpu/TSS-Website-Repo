import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCmsSettings } from "@/hooks/use-cms";
import { currentHero } from "@shared/hero";

/**
 * The hero is a six-beat film. Every word is a token with a stable key, and a
 * cut runs in two explicit stages so nothing ever crosses mid-air:
 *
 *   clearing — the words that won't survive scatter (survivors hold still)
 *   swap     — ONE re-render: scattered words leave the tree while invisible,
 *              survivors glide to their place in the new sentence across the
 *              emptied stage, and the new words rise in after the glide.
 *
 * A single swap means layout is measured exactly once per cut — the earlier
 * approach let each scattered word unmount as its exit finished, and every
 * one of those unmounts re-measured the glide mid-flight. The final beat is
 * the residue of everything — "We shape stories." — styled twice the size.
 *
 * The copy is the chain Fatema approved; survivors per cut:
 *   1 → 2  We are        2 → 3  We           3 → 4  We · brands
 *   4 → 5  who they really are · we          5 → ∎  we · shape · story
 *
 * Doodles (smiley, crew, heart, eye) are inline tokens too, so they reflow
 * and break away exactly like words.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;
const ACCENT = "#cf81cd";

type Token = {
  k: string;
  t?: string;
  doodle?: "smiley" | "crew" | "heart" | "eye";
  br?: true;
};

const w = (k: string, t: string): Token => ({ k, t });
const d = (doodle: Token["doodle"]): Token => ({ k: `doodle-${doodle}`, doodle });
/** Forces the line to wrap here, so breaks are authored rather than accidental. */
const br = (): Token => ({ k: "br", br: true });

const BEATS: Token[][] = [
  [w("hello", "Hello."), d("smiley"), br(), w("we", "We"), w("are", "are"), w("the", "The"), w("story-name", "Story"), w("shapers", "Shapers.")],
  [w("we", "We"), w("are", "are"), w("a", "a"), w("senior", "senior-led"), br(), w("marketing", "marketing"), w("collective", "collective."), d("crew")],
  [w("we", "We"), w("make", "make"), w("growing", "growing"), w("brands", "brands"), br(), w("impossible", "impossible"), w("to", "to"), w("ignore", "ignore."), d("eye")],
  [w("we", "We"), w("market", "market"), w("brands", "brands"), br(), w("for", "for"), w("who", "who"), w("they", "they"), w("really", "really"), w("are", "are."), d("heart")],
  [w("who", "Who"), w("they", "they"), w("really", "really"), w("are", "are"), br(), w("is", "is"), w("the", "the"), w("story", "story"), w("we", "we"), w("shape", "shape.")],
  [w("we", "We"), w("shape", "shape"), w("story", "stories.")],
];

/** How we shape them — the four offerings, numbered in the order they arrive. */
const OFFERS = [
  "Positioning & Go-to-Market",
  "Content & Authority",
  "Search & AI Discovery",
  "Fractional Leadership",
];

const REST = BEATS.length - 1;
const BEAT_HOLD_MS = [3800, 3400, 3600, 3600, 3200];
/** How long the scatter stage runs before the swap. */
const CLEAR_MS = 520;

/**
 * Play from the top on every load. Straight to the resting frame only for:
 * headless Chrome (the build prerenders the DOM and needs the finished line),
 * reduced-motion users, and background tabs (frozen animation frames would
 * strand words mid-entrance).
 */
function initialPhase() {
  if (typeof window === "undefined") return REST;
  if (navigator.webdriver) return REST;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return REST;
  if (document.hidden) return REST;
  return 0;
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "");

const wordVariants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  shown: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.55 + 0.055 * index, ease: EASE_OUT },
  }),
  // Breakaway: fragments scatter in alternating directions.
  gone: (index: number) => ({
    opacity: 0,
    y: index % 2 === 0 ? "-0.5em" : "0.4em",
    x: (index % 2 === 0 ? -1 : 1) * (6 + index * 2),
    rotate: index % 2 === 0 ? -3 : 4,
    filter: "blur(8px)",
    transition: { duration: 0.45, delay: 0.02 * index, ease: EASE_IN },
  }),
};

const draw = (delay: number, duration = 0.7) => ({
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration, delay, ease: EASE_OUT },
});

/* --- The cast: hand-drawn line characters ------------------------------- */

function Smiley() {
  return (
    <motion.svg
      className="story-hero__doodle-svg"
      viewBox="0 0 100 100"
      fill="none"
      animate={{ rotate: [-5, 4, -5] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path d="M50 9 C74 8 92 26 91 50 C90 75 74 92 50 91 C26 90 9 74 9 50 C9 26 27 10 50 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(0.55, 0.8)} />
      <motion.path d="M36 40 L36 48" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(1.15, 0.25)} />
      {/* The wink: this eye squeezes shut and pops back open. */}
      <motion.g style={{ originX: 0.64, originY: 0.44 }} animate={{ scaleY: [1, 1, 0.12, 1, 1] }} transition={{ duration: 2.8, times: [0, 0.55, 0.62, 0.7, 1], repeat: Infinity, delay: 1 }}>
        <motion.path d="M64 40 L64 48" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(1.25, 0.25)} />
      </motion.g>
      <motion.path d="M31 61 C39 73 61 74 70 60" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" {...draw(1.35, 0.45)} />
    </motion.svg>
  );
}

function Crew() {
  return (
    <motion.svg
      className="story-hero__doodle-svg story-hero__doodle-svg--wide"
      viewBox="0 0 150 100"
      fill="none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
    >
      {/* Three of us — the middle one in pink, sketched in one by one. */}
      <motion.circle cx="32" cy="46" r="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(0.6, 0.5)} />
      <motion.path d="M14 88 C18 68 46 68 50 88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(0.75, 0.4)} />
      <motion.circle cx="75" cy="38" r="12" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" {...draw(0.95, 0.5)} />
      <motion.path d="M57 82 C61 61 89 61 93 82" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" {...draw(1.1, 0.4)} />
      <motion.circle cx="118" cy="46" r="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(1.3, 0.5)} />
      <motion.path d="M100 88 C104 68 132 68 136 88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(1.45, 0.4)} />
    </motion.svg>
  );
}

function Heart() {
  return (
    <motion.svg
      className="story-hero__doodle-svg"
      viewBox="0 0 100 100"
      fill="none"
      animate={{ scale: [1, 1.14, 1, 1.1, 1] }}
      transition={{ duration: 1.5, times: [0, 0.25, 0.5, 0.72, 1], delay: 1.5, repeat: Infinity, repeatDelay: 1.2 }}
    >
      <motion.path
        d="M50 86 C22 62 10 44 17 30 C24 16 43 18 50 32 C57 18 76 16 83 30 C90 44 78 62 50 86"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        {...draw(0.7, 0.8)}
      />
    </motion.svg>
  );
}

/** A wide-open eye for "impossible to ignore" — it blinks, then stares. */
function Eye() {
  return (
    <motion.svg className="story-hero__doodle-svg story-hero__doodle-svg--wide" viewBox="0 0 150 100" fill="none">
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.6, 0.67, 0.74, 1], repeat: Infinity, delay: 1.8 }}
      >
        <motion.path d="M15 50 C40 16 110 16 135 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(0.9, 0.5)} />
        <motion.path d="M15 50 C40 84 110 84 135 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" {...draw(1.05, 0.5)} />
        <motion.circle cx="75" cy="50" r="13" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" {...draw(1.25, 0.4)} />
      </motion.g>
    </motion.svg>
  );
}

/** The final flourish above "stories." once the line has settled. */
function Sparkle({ delay }: { delay: number }) {
  return (
    <motion.svg
      className="story-hero__sparkle"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ scale: 0.4, rotate: -18, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      <motion.path
        d="M50 8 C55 36 64 45 92 50 C64 55 55 64 50 92 C45 64 36 55 8 50 C36 45 45 36 50 8"
        stroke={ACCENT}
        strokeWidth="5"
        strokeLinecap="round"
        {...draw(delay, 0.6)}
      />
    </motion.svg>
  );
}

const DOODLES = { smiley: Smiley, crew: Crew, heart: Heart, eye: Eye } as const;

export function Hero() {
  const { data: settings } = useCmsSettings();
  // Falls back to HERO_CONTENT whenever the stored row belongs to an older
  // hero, so a retired version's copy can never surface on this one.
  const heroData = currentHero(settings?.hero);

  const [phase, setPhase] = useState(initialPhase);
  const [clearing, setClearing] = useState(false);
  const [coldStart] = useState(() => initialPhase() >= REST);
  const resting = phase >= REST;

  // Keys that survive the upcoming cut — during clearing, everything else scatters.
  const survivorKeys = new Set(BEATS[Math.min(phase + 1, REST)].map((token) => token.k));
  // On a warm arrival the resting frame assembles in order: glide settles
  // (~1.1s), stitch draws, support lines fade up, CTA lands last.
  const restDelay = (warm: number, cold: number) => (coldStart ? cold : warm);

  const heading = stripHtml(heroData.heading);
  const headingLine2 = stripHtml(heroData.headingLine2);

  // Advance the film. The clock pauses while the tab is hidden — browsers
  // freeze animation frames there but not timers, and without this the beats
  // would pile up invisibly and unwind all at once on return.
  useEffect(() => {
    if (phase >= REST) return;

    // Clearing stage: short and uninterruptible — swap once the stage is empty.
    if (clearing) {
      const timer = window.setTimeout(() => {
        setClearing(false);
        setPhase((current) => current + 1);
      }, CLEAR_MS);
      return () => window.clearTimeout(timer);
    }

    // Hold stage, pause-aware: the clock stops while the tab is hidden.
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setClearing(true), BEAT_HOLD_MS[phase]);
    };
    const handleVisibility = () => {
      window.clearTimeout(timer);
      if (!document.hidden) start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [phase, clearing]);

  // Scrolling away cuts to the resting line — the page never scrolls against
  // a half-told story. Clicks and keys are deliberately not skips.
  useEffect(() => {
    if (phase >= REST) return;

    const skip = () => {
      setClearing(false);
      setPhase(REST);
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
  }, [phase]);

  return (
    <section className="story-hero" data-testid="hero-section">
      {/* The real headline, for crawlers and screen readers. The film is
          presentation on top of it. */}
      <h1 className="sr-only" data-testid="text-hero-heading">
        {heading} {headingLine2}
      </h1>
      <p className="sr-only">{heroData.subheading}</p>

      <div className="story-hero__inner">
        <div className="story-hero__stage" data-resting={resting || undefined} aria-hidden="true">
          <p className="story-hero__flow" data-resting={resting || undefined} data-cold={coldStart || undefined}>
            {BEATS[Math.min(phase, REST)].map((token, index) => {
              if (token.br) return <span key={token.k} className="story-hero__break" aria-hidden="true" />;
              const DoodleBody = token.doodle ? DOODLES[token.doodle] : null;
              return (
                <motion.span
                  layout
                  key={token.k}
                  className={token.doodle ? "story-hero__doodle" : "story-hero__word"}
                  variants={wordVariants}
                  custom={index}
                  initial="hidden"
                  animate={clearing && !survivorKeys.has(token.k) ? "gone" : "shown"}
                  transition={{ layout: { duration: 0.65, ease: EASE_OUT } }}
                >
                  {DoodleBody ? (
                    <DoodleBody />
                  ) : token.k === "story" && resting ? (
                    <span className="story-hero__stories">
                      {token.t}
                      <span className="story-hero__stitch" />
                      <Sparkle delay={restDelay(1.8, 0.6)} />
                    </span>
                  ) : (
                    token.t
                  )}
                </motion.span>
              );
            })}
          </p>
        </div>

        <ul className="story-hero__offers">
          {OFFERS.map((offer, index) => (
            <motion.li
              key={offer}
              className="story-hero__offer"
              initial={{ opacity: 0, y: 18 }}
              animate={resting ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: 0.55,
                delay: resting ? restDelay(1.4, 0.3) + index * 0.15 : 0,
                ease: EASE_OUT,
              }}
            >
              <span className="story-hero__offer-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="story-hero__offer-label">{offer}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="story-hero__cta-row"
          initial={{ opacity: 0, y: 18 }}
          animate={resting ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: resting ? restDelay(2.25, 0.75) : 0, ease: EASE_OUT }}
        >
          <a
            href={heroData.ctaLink}
            className="story-hero__cta"
            tabIndex={resting ? undefined : -1}
            data-testid="button-talk-to-strategist"
          >
            <span>{heroData.ctaText}</span>
          </a>

          <a
            href={heroData.secondaryCtaLink}
            className="story-hero__cta story-hero__cta--ghost"
            tabIndex={resting ? undefined : -1}
            data-testid="button-see-our-work"
          >
            <span>{heroData.secondaryCtaText}</span>
          </a>
        </motion.div>
      </div>

      {!resting && (
        <button
          type="button"
          className="story-hero__skip"
          onClick={() => {
            setClearing(false);
            setPhase(REST);
          }}
        >
          Skip
        </button>
      )}
    </section>
  );
}
