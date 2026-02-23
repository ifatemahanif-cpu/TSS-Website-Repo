import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const caseStudies = [
  {
    label: "Fix the thinking",
    brand: "SOCIAL (Impressario Entertainment & Hospitality)",
    text: "The brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    label: "No handoffs",
    brand: "Art Fervour",
    text: "We embedded as Fractional Head of Marketing for 90 days. Founder decision involvement reduced from 70% to 25%.",
  },
  {
    label: "Leave scaffolding",
    brand: "LBB",
    text: "We built content infrastructure across multiple cities. Repeatable formats. Clear calendars. No heroics required.",
  },
  {
    label: "Turn noise into signal",
    brand: "Headout",
    text: "We scaled creator collaborations from under 50 to 1,000+ per quarter. In three months. By designing smarter, not adding hands.",
  },
];

export function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#000" }}
      data-testid="work-section"
    >
      <div
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FDE8E9",
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
                marginBottom: "1.5rem",
              }}
              data-testid="text-work-heading"
            >
              Our work begins where most marketing{" "}
              <span className="italic" style={{ opacity: 0.5 }}>
                breaks.
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
              opacity: 0.55,
              marginBottom: "3.5rem",
            }}
            data-testid="text-work-intro"
          >
            We fix the thinking before we fix the marketing. Most problems aren't execution problems. They're clarity problems.
          </motion.p>

          <div className="space-y-0">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "2rem 0",
                  borderTop: i === 0 ? "1px solid rgba(253, 232, 233, 0.1)" : "none",
                  borderBottom: "1px solid rgba(253, 232, 233, 0.1)",
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
                      opacity: 0.7,
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
                    {cs.label}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    opacity: 0.9,
                  }}
                >
                  {cs.brand}
                </h3>

                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.88rem, 1.15vw, 1rem)",
                    lineHeight: 1.8,
                    opacity: 0.55,
                  }}
                >
                  {cs.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-6 mt-8"
          >
            <div
              style={{
                flex: 1,
                padding: "1.5rem",
                borderRadius: "12px",
                backgroundColor: "rgba(123, 30, 122, 0.12)",
                border: "1px solid rgba(123, 30, 122, 0.2)",
              }}
              data-testid="card-people-you-meet"
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
                className="block mb-2"
              >
                The people you meet
              </span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                }}
              >
                Are the people doing the work. No handoffs. No juniors learning on your brief. Two to three brands each. That's it.
              </p>
            </div>
            <div
              style={{
                flex: 1,
                padding: "1.5rem",
                borderRadius: "12px",
                backgroundColor: "rgba(123, 30, 122, 0.12)",
                border: "1px solid rgba(123, 30, 122, 0.2)",
              }}
              data-testid="card-leave-scaffolding"
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
                className="block mb-2"
              >
                We leave scaffolding
              </span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                }}
              >
                Not dependency. We build the systems that let your team keep running after we leave.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
