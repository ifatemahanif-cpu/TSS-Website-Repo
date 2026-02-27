import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "clarity",
    title: "Clarity & Direction",
    pain: "Your team debates positioning every few months. Investors want a story. Your team wants a plan. You want both.",
    solution: "We define what your brand stands for, how it's different, and where it should go next.",
    items: [
      "Brand & narrative audits",
      "Positioning & differentiation",
      "Messaging architecture",
      "Go-to-market direction",
    ],
  },
  {
    id: "website",
    title: "Website & Messaging",
    pain: "Traffic is fine. Conversions aren't. People land, scroll, and leave. Something's off — you just can't name it.",
    solution: "We reshape how your brand presents itself so what visitors see makes sense instantly.",
    items: [
      "Information architecture & structure",
      "Homepage & core messaging",
      "Conversion-led copy",
      "Landing page optimization",
    ],
  },
  {
    id: "content",
    title: "Content Systems",
    pain: "Your founder posts when they remember. Social feels random. You know consistency matters — but you can't maintain it.",
    solution: "We design content systems teams can actually sustain. Without burning out.",
    items: [
      "Content strategy & narrative pillars",
      "Editorial calendars & distribution",
      "Storytelling frameworks",
      "Repurposing systems",
    ],
  },
  {
    id: "discovery",
    title: "Discoverability",
    pain: "You're doing good work. But when someone searches for what you do, your competitors show up first.",
    solution: "We fix how you show up — not by publishing more, but by aligning what you write with what people search for.",
    items: [
      "SEO & content opportunity mapping",
      "On-page optimization",
      "Intent-driven structuring",
      "Authority & credibility systems",
    ],
  },
  {
    id: "campaigns",
    title: "Brand & Campaign Strategy",
    pain: "You've done one-off launches. They spike and fade. What you need is marketing that compounds — campaigns that build on each other over time.",
    solution: "",
    items: [
      "Brand strategy & campaign architecture",
      "Integrated planning",
      "Launch messaging",
      "Always-on storytelling systems",
    ],
  },
  {
    id: "leadership",
    title: "Senior Marketing Leadership",
    pain: "You need a senior mind in the room. Not another agency. Not a full-time hire you're not ready for. Just experienced judgment, applied to your business, for as long as you need it.",
    solution: "",
    items: [
      "Monthly strategic planning",
      "Quarterly priorities & reviews",
      "Campaign direction & decision support",
      "Team enablement & playbooks",
    ],
  },
  {
    id: "ai",
    title: "AI-Assisted Systems",
    pain: "AI is an extraordinary amplifier. It's also very good at accelerating confusion when the foundation is shaky. We build AI workflows that help your team move faster without diluting your voice.",
    solution: "",
    items: [
      "AI content & research workflows",
      "Reporting & insight automation",
      "Monitoring & intelligence systems",
      "Operational automation for lean teams",
    ],
  },
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="services-section"
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
            className="mb-10 md:mb-14"
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
              data-testid="text-services-label"
            >
              Services
            </span>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
              data-testid="text-services-heading"
            >
              How we shape{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                your story.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.65,
                fontStyle: "italic",
              }}
            >
              Every brand arrives with different questions. The patterns underneath are usually familiar.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1.25rem" }}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "clamp(1.25rem, 2vw, 1.75rem)",
                  display: "flex",
                  flexDirection: "column",
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
                data-testid={`card-service-${service.id}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: "rgba(255, 255, 255, 0.3)",
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                    data-testid={`text-service-title-${i}`}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.8rem, 0.95vw, 0.88rem)",
                    lineHeight: 1.7,
                    opacity: 0.7,
                    marginBottom: service.solution ? "0.75rem" : "1rem",
                  }}
                >
                  {service.pain}
                </p>

                {service.solution && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8rem, 0.95vw, 0.88rem)",
                      lineHeight: 1.7,
                      opacity: 0.85,
                      fontStyle: "italic",
                      marginBottom: "1rem",
                    }}
                  >
                    {service.solution}
                  </p>
                )}

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {service.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-start gap-2"
                      style={{ marginBottom: itemIdx < service.items.length - 1 ? "0.35rem" : 0 }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.55rem",
                          color: "rgba(255, 255, 255, 0.25)",
                          flexShrink: 0,
                          marginTop: "0.35rem",
                        }}
                      >
                        —
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "clamp(0.75rem, 0.85vw, 0.82rem)",
                          opacity: 0.6,
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
