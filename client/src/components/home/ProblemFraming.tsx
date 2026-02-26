import { motion, useInView, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const calc = () => {
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;
      setDragConstraint(-(scrollWidth - clientWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const x = useMotionValue(0);

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
              fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
              lineHeight: 1.65,
              opacity: 0.7,
              marginBottom: "3rem",
              maxWidth: "550px",
            }}
            data-testid="text-problem-intro"
          >
            Well, marketing has never been louder. More tools. More dashboards. More content. More channels. And yet, the brands we meet aren't struggling because they're doing too little. They're doing too much without knowing why.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

          <div className="relative">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "60px",
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
                width: "60px",
                background: "linear-gradient(270deg, #0C0A3E, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            <div style={{ overflow: "hidden", cursor: "grab" }}>
              <motion.div
                ref={carouselRef}
                drag="x"
                dragConstraints={{ left: dragConstraint, right: 0 }}
                dragElastic={0.12}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                style={{
                  display: "flex",
                  gap: "1rem",
                  x,
                  paddingLeft: "max(2rem, calc((100% - 800px) / 2))",
                  paddingRight: "2rem",
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                {patterns.map((pattern, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    style={{
                      minWidth: "300px",
                      maxWidth: "340px",
                      padding: "1.75rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                    }}
                    data-testid={`text-pattern-${i + 1}`}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        opacity: 0.25,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                        lineHeight: 1.65,
                        opacity: 0.75,
                      }}
                    >
                      {pattern}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-[800px] mx-auto">
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
