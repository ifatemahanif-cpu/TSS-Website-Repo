import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const patterns = [
  "Marketing is busy, yet direction is unclear.",
  "Decisions happen in bursts instead of systems.",
  "AI made output easier. It didn't make thinking clearer.",
  "Brand talks awareness. Growth talks acquisition. They barely talk to each other.",
  "Strategy lives in decks rather than daily work.",
];

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="problem-framing-section"
    >
      <div
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="block mb-6"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              The Problem
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "2rem",
              }}
              data-testid="text-problem-heading"
            >
              Every brand has a story.{" "}
              <span className="italic" style={{ opacity: 0.45 }}>
                The hard part is knowing how to tell it right.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-5 mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.6,
              }}
              data-testid="text-problem-p1"
            >
              Marketing today operates in a vacuum. On one side, you have ambition: growth targets, brand vision, market expansion. On the other, execution: content calendars, social posts, performance dashboards.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.6,
              }}
              data-testid="text-problem-p2"
            >
              But between them? A vast, expensive gap where strategy should live.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.6,
              }}
              data-testid="text-problem-p3"
            >
              Founders could explain the company beautifully in conversation. The website felt generic. The sales deck felt entirely different. Marketing looked fully disconnected from the product. Nothing was broken enough to cause panic. But nothing was aligned enough to create momentum.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-[800px] mx-auto">
            <span
              className="block mb-5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.35,
              }}
            >
              The patterns we keep seeing
            </span>
          </div>

          <div className="relative" style={{ overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(90deg, #0C0A3E, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(270deg, #0C0A3E, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            <div
              className="flex"
              style={{
                animation: "patternScroll 35s linear infinite",
                width: "fit-content",
              }}
            >
              {[...Array(3)].map((_, setIdx) => (
                <div key={setIdx} className="flex shrink-0" style={{ gap: "1.25rem", paddingRight: "1.25rem" }}>
                  {patterns.map((pattern, i) => (
                    <div
                      key={i}
                      style={{
                        minWidth: "340px",
                        maxWidth: "380px",
                        padding: "2rem",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "14px",
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                      }}
                      data-testid={`text-pattern-${setIdx}-${i + 1}`}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          opacity: 0.3,
                          letterSpacing: "0.1em",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                          lineHeight: 1.6,
                          opacity: 0.85,
                        }}
                      >
                        {pattern}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes patternScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
