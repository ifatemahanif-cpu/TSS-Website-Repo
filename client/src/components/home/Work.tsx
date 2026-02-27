import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const blocks = [
  {
    label: "Fix the thinking",
    principle: "We fix the thinking before we fix the marketing. Most problems aren't execution problems. They're clarity problems.",
    caseStudy: "At SOCIAL (Impressario Entertainment & Hospitality) — the brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    label: "The people you meet",
    principle: "The people you meet are the people doing the work. No handoffs. No juniors learning on your brief. Two to three brands each. That's it.",
    caseStudy: "At Art Fervour — we embedded as Fractional Head of Marketing for 90 days. Founder decision involvement reduced from 70% to 25%.",
  },
  {
    label: "Leave scaffolding",
    principle: "We leave scaffolding, not dependency. We build the systems that let your team keep running after we leave.",
    caseStudy: "At LBB — we built content infrastructure across multiple cities. Repeatable formats. Clear calendars. No heroics required.",
  },
  {
    label: "Turn noise into signal",
    principle: "We turn noise into signal. More content isn't the answer. Clearer content is.",
    caseStudy: "At Headout – we scaled creator collaborations from under 50 to 1,000+ per quarter. In three months. By designing smarter, not adding hands.",
  },
];

export function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="work-section"
    >
      <div
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
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
              Our Work
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "3rem",
              }}
              data-testid="text-work-heading"
            >
              Our work begins where most marketing{" "}
              <span className="italic" style={{ opacity: 0.5 }}>
                breaks.
              </span>
            </h2>
          </motion.div>

          <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>
            <div>
              {blocks.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "1.75rem 0",
                    borderTop: i === 0 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    transition: "opacity 0.25s ease",
                    opacity: activeIndex === i ? 1 : 0.45,
                  }}
                  data-testid={`card-work-${i}`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.25)",
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                      }}
                    >
                      {block.label}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                      lineHeight: 1.85,
                    }}
                  >
                    {block.principle}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "sticky", top: "8rem" }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "2rem",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  className="block mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.3,
                  }}
                >
                  Case Study — 0{activeIndex + 1}
                </span>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.85,
                      fontStyle: "italic",
                    }}
                    data-testid={`text-case-study-${activeIndex}`}
                  >
                    {blocks[activeIndex].caseStudy}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="md:hidden">
            {blocks.map((block, i) => (
              <MobileWorkBlock key={i} block={block} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileWorkBlock({ block, index, isInView }: { block: typeof blocks[0]; index: number; isInView: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "1.75rem 0",
        borderTop: index === 0 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        cursor: "pointer",
      }}
      data-testid={`card-work-mobile-${index}`}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.25)",
            flexShrink: 0,
          }}
        >
          0{index + 1}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          {block.label}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
          lineHeight: 1.85,
          opacity: 0.85,
          marginBottom: expanded ? "1rem" : 0,
        }}
      >
        {block.principle}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "1.25rem",
                marginTop: "0.5rem",
              }}
            >
              <span
                className="block mb-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                }}
              >
                Case Study
              </span>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                {block.caseStudy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
