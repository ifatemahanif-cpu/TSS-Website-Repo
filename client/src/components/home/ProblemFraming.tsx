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
      style={{ backgroundColor: "#0D1321" }}
      data-testid="problem-framing-section"
    >
      <div
        style={{
          backgroundColor: "#F0EBD8",
          color: "#1D2D44",
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
              The problem isn't effort.{" "}
              <span className="italic" style={{ opacity: 0.45 }}>
                It's clarity.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              lineHeight: 1.85,
              opacity: 0.7,
              marginBottom: "3rem",
            }}
            data-testid="text-problem-intro"
          >
            Well, marketing has never been louder. More tools. More dashboards. More content. More channels. And yet, the brands we meet aren't struggling because they're doing too little. They're doing too much without knowing why.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="block mb-4"
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

            <div
              style={{
                borderTop: "1px solid rgba(29, 45, 68, 0.12)",
              }}
            >
              {patterns.map((pattern, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  style={{
                    padding: "1.1rem 0",
                    borderBottom: "1px solid rgba(29, 45, 68, 0.1)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                  }}
                  data-testid={`text-pattern-${i + 1}`}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      opacity: 0.25,
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                      lineHeight: 1.6,
                      opacity: 0.75,
                    }}
                  >
                    {pattern}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.7,
              marginTop: "2.5rem",
              fontStyle: "italic",
              opacity: 0.55,
            }}
            data-testid="text-problem-closing"
          >
            We understand the absurdities of marketing because we've lived them.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
