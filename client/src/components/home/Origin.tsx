import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Origin() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const capabilities = [
    "Clarifying positioning.",
    "Shaping a founder narrative.",
    "Reworking website messaging.",
    "Aligning brand voice across channels.",
    "Building content systems that compound instead of scatter.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="origin-section"
    >
      <div
        style={{
          backgroundColor: "#0E0C45",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[1000px] mx-auto">
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
                opacity: 0.5,
              }}
              data-testid="text-origin-label"
            >
              What We Actually Do
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "2.5rem",
              }}
              data-testid="text-origin-heading"
            >
              We don't think content strategy is a subset of marketing strategy.{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                We think it's the other way around.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
              }}
              data-testid="text-origin-p1"
            >
              Most agencies will give you a content calendar and call it strategy. We do the opposite. We go slower at the start to go faster forever.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
              }}
              data-testid="text-origin-p2"
            >
              We help you define what your brand stands for and express it consistently.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                  lineHeight: 1.8,
                  opacity: 0.75,
                  marginBottom: "0.25rem",
                }}
              >
                That can mean:
              </p>
              {capabilities.map((item, idx) => (
                <p
                  key={idx}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.8,
                    opacity: 0.75,
                    paddingLeft: "1rem",
                  }}
                  data-testid={`text-origin-capability-${idx}`}
                >
                  {item}
                </p>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.7,
                fontStyle: "italic",
                opacity: 0.65,
                marginTop: "1rem",
              }}
              data-testid="text-origin-closing"
            >
              We start with "what is this brand actually trying to say?" And we don't stop until you have a system that can answer that question every single time you hit publish.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
