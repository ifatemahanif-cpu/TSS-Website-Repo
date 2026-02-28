import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "clarity",
    title: "Clarity & Direction",
    subtitle: "When your team can't agree on what the brand stands for.",
    items: [
      "Brand audits",
      "Positioning",
      "Messaging architecture",
      "Go-to-market frameworks",
    ],
  },
  {
    id: "website",
    title: "Website & Messaging",
    subtitle: "When the product has evolved but the website hasn't.",
    items: [
      "Information architecture",
      "Core messaging",
      "Conversion copy",
      "Landing pages",
    ],
  },
  {
    id: "content",
    title: "Content Systems",
    subtitle: "When content exists but nothing compounds.",
    items: [
      "Content strategy",
      "Editorial calendars",
      "Storytelling frameworks",
      "Repurposing systems",
    ],
  },
  {
    id: "discovery",
    title: "Discoverability",
    subtitle: "When good work isn't showing up where it should.",
    items: [
      "SEO mapping",
      "On-page optimisation",
      "Intent structuring",
      "Authority building",
    ],
  },
  {
    id: "campaigns",
    title: "Brand & Campaign Strategy",
    subtitle: "When launches spike and fade instead of building on each other.",
    items: [
      "Campaign architecture",
      "Integrated planning",
      "Launch messaging",
      "Always-on systems",
    ],
  },
  {
    id: "leadership",
    title: "Senior Marketing Leadership",
    subtitle: "When you need experienced judgment without a full-time hire.",
    items: [
      "Strategic planning",
      "Quarterly reviews",
      "Decision support",
      "Team playbooks",
    ],
  },
  {
    id: "ai",
    title: "AI-Assisted Systems",
    subtitle: "When AI is making you faster at producing the wrong things.",
    items: [
      "Content workflows",
      "Insight automation",
      "Monitoring systems",
      "Operational efficiency",
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
              How we work with you.
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
              Every brand arrives with different questions. The starting point is always the same.
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
                <div className="flex items-center gap-3 mb-2">
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
                      fontSize: "clamp(0.8rem, 1vw, 0.85rem)",
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
                    fontSize: "clamp(0.75rem, 0.85vw, 0.82rem)",
                    lineHeight: 1.6,
                    opacity: 0.8,
                    fontStyle: "italic",
                    marginBottom: "0.75rem",
                  }}
                >
                  {service.subtitle}
                </p>

                <div
                  className="flex flex-wrap gap-2"
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  {service.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.05em",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "6px",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "rgba(255, 255, 255, 0.5)",
                        lineHeight: 1,
                      }}
                      data-testid={`badge-service-item-${i}-${itemIdx}`}
                    >
                      {item}
                    </span>
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
