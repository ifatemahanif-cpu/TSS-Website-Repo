import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blocks = [
  {
    label: "Fix the thinking",
    principle: "We fix the thinking before we fix the marketing. Most problems aren't execution problems. They're clarity problems.",
    caseStudy: "At SOCIAL (Impressario Entertainment & Hospitality) \u2014 the brand had scaled to 55+ outlets but couldn\u2019t explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    label: "The people you meet",
    principle: "The people you meet are the people doing the work. No handoffs. No juniors learning on your brief. Two to three brands each. That\u2019s it.",
    caseStudy: "At Art Fervour \u2014 we embedded as Fractional Head of Marketing for 90 days. Founder decision involvement reduced from 70% to 25%.",
  },
  {
    label: "Leave scaffolding",
    principle: "We leave scaffolding, not dependency. We build the systems that let your team keep running after we leave.",
    caseStudy: "At LBB \u2014 we built content infrastructure across multiple cities. Repeatable formats. Clear calendars. No heroics required.",
  },
  {
    label: "Turn noise into signal",
    principle: "We turn noise into signal. More content isn\u2019t the answer. Clearer content is.",
    caseStudy: "At Headout \u2013 we scaled creator collaborations from under 50 to 1,000+ per quarter. In three months. By designing smarter, not adding hands.",
  },
];

export function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#FDE8E9" }}
      data-testid="work-section"
    >
      <div
        style={{
          backgroundColor: "#FDE8E9",
          color: "#0C0A3E",
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
                color: "#7B1E7A",
                opacity: 0.5,
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
                marginBottom: "2.5rem",
              }}
              data-testid="text-work-heading"
            >
              Our work begins where most marketing{" "}
              <span className="italic" style={{ opacity: 0.5 }}>
                breaks.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {blocks.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "2rem 0",
                  borderTop: i === 0 ? "1px solid rgba(12, 10, 62, 0.1)" : "none",
                  borderBottom: "1px solid rgba(12, 10, 62, 0.1)",
                }}
                data-testid={`card-work-${i}`}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7B1E7A",
                      opacity: 0.5,
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
                    opacity: 0.85,
                    marginBottom: "1rem",
                  }}
                >
                  {block.principle}
                </p>

                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.8,
                    opacity: 0.7,
                  }}
                >
                  {block.caseStudy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
