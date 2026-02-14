import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ from, to, suffix = "", prefix = "", duration = 2 }: {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

const problems = [
  {
    pattern: "MARKETING IS BUSY",
    symptom: "Nobody can explain where it's going",
    root: "No system",
    index: "01",
  },
  {
    pattern: "DECISIONS IN BURSTS",
    symptom: "Random acts of marketing",
    root: "No process",
    index: "02",
  },
  {
    pattern: "AI MADE OUTPUT EASIER",
    symptom: "It didn't make thinking clearer",
    root: "No clarity",
    index: "03",
  },
  {
    pattern: "SILOS EVERYWHERE",
    symptom: "Brand and Growth barely talk",
    root: "No alignment",
    index: "04",
  },
  {
    pattern: "STRATEGY IN DECKS",
    symptom: "Lives in a PDF somewhere",
    root: "No integration",
    index: "05",
  },
];

const caseStudies = [
  {
    brand: "Akutee",
    action: "Built positioning from scratch",
    result: "\"From Mine to Yours\" became the spine for every decision",
  },
  {
    brand: "Art Fervour",
    action: "Embedded as Fractional CMO for 90 days",
    result: "Cut founder decision load from 70% to 25%",
  },
  {
    brand: "LBB",
    action: "Built content infrastructure across cities",
    result: "Repeatable formats. No heroics required.",
  },
  {
    brand: "Headout",
    action: "Designed smarter creator systems",
    result: "Scaled from <50 to 1,000+ collabs per quarter",
  },
];

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "#FDE8E9", color: "#0C0A3E" }}
      data-testid="problem-framing-section"
    >
      <div
        className="w-full"
        style={{ borderTop: "4px solid #0C0A3E" }}
      >
        <div className="w-full px-[2vw] max-w-[1920px] mx-auto">

          <div className="pb-8" data-testid="section-header">
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(3rem, 12vw, 14rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                fontWeight: 400,
                marginLeft: "-0.3vw",
                padding: "2rem 0",
              }}
            >
              Marketing has<br />
              <span className="italic" style={{ opacity: 0.5 }}>
                never been louder.
              </span>
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 py-3 font-mono uppercase gap-1 md:gap-0"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              borderTop: "1px solid #0C0A3E",
              borderBottom: "1px solid #0C0A3E",
              color: "rgba(12,10,62,0.6)",
            }}
            data-testid="meta-bar"
          >
            <div>The Story Shapers</div>
            <div>The Patterns We Keep Seeing</div>
            <div className="md:text-right">2025</div>
          </div>

          <div className="mt-8 mb-16" data-testid="data-grid">
            <div
              className="hidden md:grid font-mono uppercase data-grid-row"
              style={{
                fontSize: "0.7rem",
                color: "rgba(12,10,62,0.45)",
                padding: "0.5rem 0",
                borderBottom: "1px solid #0C0A3E",
                letterSpacing: "0.05em",
              }}
            >
              <div>Pattern</div>
              <div className="hidden md:block">Symptom</div>
              <div className="hidden lg:block">Root Cause</div>
              <div className="hidden lg:block">Status</div>
              <div style={{ textAlign: "right" }}>Idx</div>
            </div>

            {problems.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid items-center cursor-default transition-colors duration-200 data-grid-row"
                style={{
                  borderBottom: "1px solid rgba(12,10,62,0.15)",
                  padding: "0.85rem 0.25rem",
                  fontSize: "0.95rem",
                }}
                data-testid={`row-pattern-${p.index}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0C0A3E";
                  e.currentTarget.style.color = "#FDE8E9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#0C0A3E";
                }}
              >
                <div className="font-medium" style={{ fontWeight: 500 }}>
                  {p.pattern}
                </div>
                <div className="hidden md:block" style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                  {p.symptom}
                </div>
                <div
                  className="hidden lg:block font-mono"
                  style={{ opacity: 0.5, fontSize: "0.8rem" }}
                >
                  {p.root}
                </div>
                <div
                  className="hidden lg:block font-mono uppercase"
                  style={{ opacity: 0.5, fontSize: "0.7rem", letterSpacing: "0.1em" }}
                >
                  Recurring
                </div>
                <div
                  className="font-mono"
                  style={{ textAlign: "right", opacity: 0.4, fontSize: "0.85rem" }}
                >
                  {p.index}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="grid gap-8 pb-24 narrative-grid-layout"
            style={{
              borderTop: "1px solid #0C0A3E",
              paddingTop: "1.5rem",
            }}
            data-testid="narrative-grid"
          >
            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: "1fr 1fr",
                fontSize: "0.7rem",
                lineHeight: 1.7,
              }}
            >
              <div>
                <strong
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em", opacity: 0.5 }}
                >
                  What We Do
                </strong>
                <div style={{ opacity: 0.7 }}>
                  Fix the thinking<br />
                  Build the systems<br />
                  Leave scaffolding<br />
                  Turn noise into signal
                </div>
              </div>
              <div>
                <strong
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em", opacity: 0.5 }}
                >
                  Brands Shaped
                </strong>
                <div style={{ opacity: 0.7 }}>
                  {caseStudies.map((cs, i) => (
                    <span key={i}>
                      {cs.brand}
                      {i < caseStudies.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                We're not an agency or a group of consultants.
                We're marketing's{" "}
                <span className="italic" style={{ color: "#7B1E7A" }}>
                  missing middle.
                </span>
              </div>

              <div
                className="grid gap-8 mt-8 manifesto-sub-grid"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                <div style={{ opacity: 0.75 }}>
                  <p className="mb-4">
                    We fix the thinking before we fix the marketing. Most problems
                    aren't execution problems — they're clarity problems.
                  </p>
                  <p>
                    The people you meet are the people doing the work. No handoffs.
                    No juniors learning on your brief.{" "}
                    <span className="font-medium">2–3 brands each. That's it.</span>
                  </p>
                </div>
                <div style={{ opacity: 0.75 }}>
                  <p className="mb-4">
                    We leave scaffolding, not dependency. We build the systems that
                    let your team keep running after we leave.
                  </p>
                  <p>
                    More content isn't the answer.{" "}
                    <span className="font-medium">Clearer content is.</span>
                  </p>
                </div>
              </div>

              <div
                className="flex stat-counters-row mt-10 pt-6"
                style={{ borderTop: "1px solid rgba(12,10,62,0.15)" }}
                data-testid="stat-counters"
              >
                <div>
                  <div
                    className="font-serif"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
                  >
                    <AnimatedCounter from={70} to={25} suffix="%" />
                  </div>
                  <div
                    className="font-mono uppercase mt-2"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.1em", opacity: 0.5 }}
                  >
                    Founder decision load
                    <br />
                    <span style={{ opacity: 0.7 }}>Art Fervour</span>
                  </div>
                </div>
                <div>
                  <div
                    className="font-serif"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
                  >
                    <AnimatedCounter from={50} to={1000} suffix="+" />
                  </div>
                  <div
                    className="font-mono uppercase mt-2"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.1em", opacity: 0.5 }}
                  >
                    Creator collabs / quarter
                    <br />
                    <span style={{ opacity: 0.7 }}>Headout</span>
                  </div>
                </div>
                <div>
                  <div
                    className="font-serif"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
                  >
                    <AnimatedCounter from={0} to={90} suffix=" days" />
                  </div>
                  <div
                    className="font-mono uppercase mt-2"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.1em", opacity: 0.5 }}
                  >
                    Embedded leadership
                    <br />
                    <span style={{ opacity: 0.7 }}>Art Fervour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
