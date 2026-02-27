import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const brandNames = ["SOCIAL", "Art Fervour", "LBB", "Headout"];

function highlightBrands(text: string): ReactNode {
  const regex = new RegExp(`(${brandNames.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    brandNames.includes(part) ? (
      <span
        key={i}
        style={{
          fontStyle: "normal",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.02em",
          opacity: 1,
          color: "#FFFFFF",
        }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const blocks = [
  {
    label: "We start with clarity, not campaigns",
    principle: "Most marketing problems aren't execution problems. They're story problems. The brand doesn't know what it stands for — so everything downstream is guesswork. We fix that first.",
    caseStudy: "At SOCIAL (Impressario Entertainment & Hospitality) — the brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    label: "The people you meet do the work",
    principle: "No handoffs. No juniors learning on your brief. Each of us works with two or three brands at a time. You get senior thinking applied directly to your business. That's it.",
    caseStudy: "At Art Fervour, we didn't advise from the sidelines. We embedded 20–25 hours a week for 90 days. Restructured the team. Rebuilt social strategy. The founder's decision load dropped from 70% to 25%. The story got structure, so it could unfold without constant authorship.",
  },
  {
    label: "We leave scaffolding, not dependency",
    principle: "Strategy that lives in a deck is decoration. We build systems — the workflows, the playbooks, the editorial rhythms — that your team keeps running long after we step back.",
    caseStudy: "At LBB, we built content infrastructure for lean editorial teams across multiple cities. Repeatable formats. Clear calendars. An editorial backbone that didn't collapse after two busy weeks.",
  },
  {
    label: "We turn noise into signal",
    principle: "More content isn't the answer. The right content is. We cut what's not working, sharpen what is, and design systems that make less do more.",
    caseStudy: "At Headout, we scaled the creator program from under 50 to 1,000+ collaborations per quarter. In three months. Not by adding more people — by designing a smarter narrative system.",
  },
];

export function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="work-section"
    >
      <div
        style={{
          backgroundColor: "#0E0C45",
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
                opacity: 0.5,
              }}
            >
              How We're Different
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
              We are marketing's{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                missing middle.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
                marginBottom: "3.5rem",
                maxWidth: "800px",
              }}
              data-testid="text-work-intro"
            >
              We're not an agency. We're not consultants. We're marketing's missing middle — senior leaders who embed with your team, find the thread that holds your brand together, and build the systems that keep it running.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {blocks.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                style={{
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "clamp(2rem, 3vw, 3rem)",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                }}
                data-testid={`card-work-${i}`}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-0.3rem",
                    right: "clamp(1rem, 3vw, 2.5rem)",
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(5rem, 10vw, 8rem)",
                    fontWeight: 400,
                    opacity: 0.04,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  0{i + 1}
                </span>

                <div
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "rgba(255, 255, 255, 0.35)",
                          flexShrink: 0,
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "clamp(0.7rem, 0.9vw, 0.78rem)",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          opacity: 0.65,
                        }}
                      >
                        {block.label}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)",
                        lineHeight: 1.8,
                        opacity: 0.85,
                      }}
                    >
                      {block.principle}
                    </p>
                  </div>

                  <div
                    className="work-case-study"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="block mb-2"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.5rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        opacity: 0.4,
                      }}
                    >
                      Case Study
                    </span>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                        lineHeight: 1.8,
                        fontStyle: "italic",
                        opacity: 0.7,
                      }}
                      data-testid={`text-case-study-${i}`}
                    >
                      {highlightBrands(block.caseStudy)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
