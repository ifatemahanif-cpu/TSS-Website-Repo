import { motion, useInView, animate } from "framer-motion";
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
  { pattern: "MARKETING IS BUSY", symptom: "Nobody can explain where it's going", root: "No system", index: "01" },
  { pattern: "DECISIONS IN BURSTS", symptom: "Random acts of marketing", root: "No process", index: "02" },
  { pattern: "AI MADE OUTPUT EASIER", symptom: "It didn't make thinking clearer", root: "No clarity", index: "03" },
  { pattern: "SILOS EVERYWHERE", symptom: "Brand and Growth barely talk", root: "No alignment", index: "04" },
  { pattern: "STRATEGY IN DECKS", symptom: "Lives in a PDF somewhere", root: "No integration", index: "05" },
];

const caseStudies = [
  {
    brand: "Akutee",
    action: "Built positioning from scratch",
    result: "\"From Mine to Yours\" became the spine for every decision",
    color: "#FDE8E9",
    textColor: "#0C0A3E",
  },
  {
    brand: "Art Fervour",
    action: "Embedded as Fractional CMO for 90 days",
    result: "Cut founder decision load from 70% to 25%",
    color: "#0C0A3E",
    textColor: "#FDE8E9",
  },
  {
    brand: "LBB",
    action: "Built content infrastructure across cities",
    result: "Repeatable formats. No heroics required.",
    color: "#7B1E7A",
    textColor: "#FDE8E9",
  },
  {
    brand: "Headout",
    action: "Designed smarter creator systems",
    result: "Scaled from <50 to 1,000+ collabs per quarter",
    color: "#FDE8E9",
    textColor: "#0C0A3E",
  },
];

const cardVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" as const },
  },
});

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-4 px-2 md:px-4 lg:px-6"
      style={{ backgroundColor: "#000" }}
      data-testid="problem-framing-section"
    >
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4">

          <motion.div
            variants={cardVariant(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1 md:col-span-4 lg:col-span-8 relative overflow-hidden flex flex-col justify-between"
            style={{
              backgroundColor: "#FDE8E9",
              color: "#0C0A3E",
              borderRadius: "20px",
              minHeight: "70vh",
              padding: "clamp(2rem, 4vw, 4rem)",
            }}
            data-testid="card-hero"
          >
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="none">
                <path d="M 0 300 Q 200 100 400 300 T 800 300" fill="none" stroke="#0C0A3E" strokeWidth="1.5" className="animate-drift-slow" />
                <path d="M 0 500 Q 300 250 600 500 T 1200 500" fill="none" stroke="#7B1E7A" strokeWidth="1" className="animate-drift-slow" style={{ animationDelay: "-8s" }} />
                <path d="M -100 650 Q 200 400 500 650 T 900 650" fill="none" stroke="#0C0A3E" strokeWidth="0.8" className="animate-drift-slow" style={{ animationDelay: "-15s" }} />
              </svg>
            </div>

            <div className="relative z-10">
              <div
                className="font-mono uppercase mb-6"
                style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.5 }}
              >
                The Story Shapers — Problem Framing — 2025
              </div>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 8rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.04em",
                  fontWeight: 400,
                }}
              >
                Marketing has<br />
                <span className="italic" style={{ opacity: 0.45 }}>
                  never been louder.
                </span>
              </h2>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 mt-12">
              <p
                className="max-w-md text-base md:text-lg leading-relaxed"
                style={{ opacity: 0.75 }}
              >
                More tools. More dashboards. More content. The brands we meet aren't struggling
                because they're doing too little.{" "}
                <span className="font-medium" style={{ opacity: 1 }}>
                  They're doing too much — without knowing why.
                </span>
              </p>

              <div className="flex flex-col items-end">
                <span
                  className="font-mono uppercase mb-2"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.4 }}
                >
                  Patterns identified
                </span>
                <div className="font-serif text-4xl md:text-5xl" style={{ lineHeight: 1 }}>
                  {problems.length}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-between"
            style={{
              backgroundColor: "#0C0A3E",
              color: "#FDE8E9",
              borderRadius: "20px",
              minHeight: "50vh",
              padding: "clamp(2rem, 3vw, 3rem)",
            }}
            data-testid="card-manifesto"
          >
            <div>
              <div
                className="font-mono uppercase mb-8"
                style={{ fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.4 }}
              >
                What We Do Differently
              </div>

              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                We're not an agency or a group of consultants. We're marketing's{" "}
                <span className="italic" style={{ color: "#FDE8E9", opacity: 0.6 }}>
                  missing middle.
                </span>
              </div>
            </div>

            <div className="mt-8" style={{ fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.6 }}>
              <p className="mb-4">
                We fix the thinking before we fix the marketing.
                Most problems aren't execution problems — they're clarity problems.
              </p>
              <p>
                The people you meet are the people doing the work. No handoffs.{" "}
                <span style={{ opacity: 1 }} className="font-medium">2–3 brands each. That's it.</span>
              </p>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(253,232,233,0.1)" }}>
              <div className="grid grid-cols-2 gap-4" style={{ fontSize: "0.65rem" }}>
                <div>
                  <div className="font-mono uppercase mb-2" style={{ letterSpacing: "0.1em", opacity: 0.35 }}>
                    What We Do
                  </div>
                  <div style={{ opacity: 0.5, lineHeight: 1.8 }}>
                    Fix the thinking<br />
                    Build the systems<br />
                    Leave scaffolding<br />
                    Turn noise into signal
                  </div>
                </div>
                <div>
                  <div className="font-mono uppercase mb-2" style={{ letterSpacing: "0.1em", opacity: 0.35 }}>
                    Brands Shaped
                  </div>
                  <div style={{ opacity: 0.5, lineHeight: 1.8 }}>
                    Akutee<br />
                    Art Fervour<br />
                    LBB<br />
                    Headout
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1 md:col-span-4 lg:col-span-8 flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#0C0A3E",
              borderRadius: "20px",
              padding: "clamp(2rem, 3vw, 3rem)",
            }}
            data-testid="card-patterns"
          >
            <div className="mb-6">
              <h3
                className="font-serif mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                The Patterns We Keep Seeing
              </h3>
              <div style={{ height: "1px", backgroundColor: "#0C0A3E", opacity: 0.15 }} />
            </div>

            <div>
              <div
                className="hidden md:grid font-mono uppercase"
                style={{
                  gridTemplateColumns: "2fr 2fr 1fr 0.5fr",
                  fontSize: "0.65rem",
                  color: "rgba(12,10,62,0.35)",
                  padding: "0.4rem 0",
                  borderBottom: "1px solid rgba(12,10,62,0.1)",
                  letterSpacing: "0.08em",
                }}
              >
                <div>Pattern</div>
                <div>Symptom</div>
                <div className="hidden lg:block">Root Cause</div>
                <div style={{ textAlign: "right" }}>Idx</div>
              </div>

              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: "easeOut" as const }}
                  className="grid items-center cursor-default transition-colors duration-200"
                  style={{
                    gridTemplateColumns: "1fr auto",
                    borderBottom: "1px solid rgba(12,10,62,0.08)",
                    padding: "0.75rem 0.25rem",
                    fontSize: "0.9rem",
                  }}
                  data-testid={`row-pattern-${p.index}`}
                  tabIndex={0}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0C0A3E";
                    e.currentTarget.style.color = "#FDE8E9";
                    e.currentTarget.style.borderRadius = "8px";
                    e.currentTarget.style.padding = "0.75rem 0.75rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#0C0A3E";
                    e.currentTarget.style.borderRadius = "0";
                    e.currentTarget.style.padding = "0.75rem 0.25rem";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = "#0C0A3E";
                    e.currentTarget.style.color = "#FDE8E9";
                    e.currentTarget.style.borderRadius = "8px";
                    e.currentTarget.style.padding = "0.75rem 0.75rem";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#0C0A3E";
                    e.currentTarget.style.borderRadius = "0";
                    e.currentTarget.style.padding = "0.75rem 0.25rem";
                  }}
                >
                  <div className="hidden md:grid" style={{ gridTemplateColumns: "2fr 2fr 1fr", gap: "0.5rem" }}>
                    <div className="font-medium" style={{ fontWeight: 500 }}>{p.pattern}</div>
                    <div style={{ opacity: 0.6, fontSize: "0.85rem" }}>{p.symptom}</div>
                    <div className="hidden lg:block font-mono" style={{ opacity: 0.4, fontSize: "0.75rem" }}>{p.root}</div>
                  </div>
                  <div className="md:hidden">
                    <div className="font-medium" style={{ fontWeight: 500 }}>{p.pattern}</div>
                    <div style={{ opacity: 0.5, fontSize: "0.8rem", marginTop: "0.15rem" }}>{p.symptom}</div>
                  </div>
                  <div className="font-mono" style={{ textAlign: "right", opacity: 0.3, fontSize: "0.8rem" }}>
                    {p.index}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant(0.25)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-between"
            style={{
              backgroundColor: "#7B1E7A",
              color: "#FDE8E9",
              borderRadius: "20px",
              padding: "clamp(2rem, 3vw, 3rem)",
            }}
            data-testid="card-stats"
          >
            <div>
              <div
                className="font-mono uppercase mb-6"
                style={{ fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.5 }}
              >
                Impact Numbers
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <div className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
                  <AnimatedCounter from={70} to={25} suffix="%" />
                </div>
                <div className="font-mono uppercase mt-1" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.5 }}>
                  Founder decision load — Art Fervour
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(253,232,233,0.15)" }} />

              <div>
                <div className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
                  <AnimatedCounter from={50} to={1000} suffix="+" />
                </div>
                <div className="font-mono uppercase mt-1" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.5 }}>
                  Creator collabs / quarter — Headout
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(253,232,233,0.15)" }} />

              <div>
                <div className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
                  <AnimatedCounter from={0} to={90} suffix=" days" />
                </div>
                <div className="font-mono uppercase mt-1" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.5 }}>
                  Embedded leadership — Art Fervour
                </div>
              </div>
            </div>
          </motion.div>

          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              variants={cardVariant(0.3 + i * 0.08)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col justify-between group cursor-default"
              style={{
                backgroundColor: cs.color,
                color: cs.textColor,
                borderRadius: "20px",
                padding: "clamp(1.5rem, 2.5vw, 2rem)",
                minHeight: "220px",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              data-testid={`card-casestudy-${cs.brand.toLowerCase()}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div
                  className="font-mono uppercase mb-4"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.45 }}
                >
                  Case Study
                </div>
                <h4
                  className="font-serif"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {cs.brand}
                </h4>
              </div>

              <div className="mt-6">
                <p style={{ fontSize: "0.8rem", opacity: 0.6, lineHeight: 1.5, marginBottom: "0.5rem" }}>
                  {cs.action}
                </p>
                <p className="font-medium" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                  {cs.result}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
