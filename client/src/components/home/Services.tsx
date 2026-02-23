import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    id: "clarity",
    title: "Clarity & Direction",
    subtitle: "If your team debates positioning every few months, that's not a healthy iteration. That's a signal. When positioning is unstable, everything downstream fragments. We help you define what your brand stands for, how it differentiates, and where it should move.",
    items: [
      "Brand & narrative audits",
      "Positioning & differentiation",
      "Messaging architecture & value propositions",
      "Go-to-market direction & decision frameworks",
    ],
  },
  {
    id: "website",
    title: "Website & Messaging",
    subtitle: "A website is rarely just a design problem. It is often a clarity problem. We reshape how your brand presents itself — so what visitors see makes sense instantly.",
    items: [
      "Information architecture & structure",
      "Homepage & core messaging systems",
      "Conversion-led copy & interaction logic",
      "Landing page optimisation",
    ],
  },
  {
    id: "content",
    title: "Content Systems",
    subtitle: "We design content ecosystems teams can sustain and audiences can recognise. And which doesn't collapse after two busy weeks.",
    items: [
      "Content strategy & narrative pillars",
      "Editorial systems & calendars",
      "Storytelling & format frameworks",
      "Repurposing systems (AI-assisted where useful)",
    ],
  },
  {
    id: "discovery",
    title: "Discoverability",
    subtitle: "You're doing good work. But when someone searches for you, your competitors show up first. Visibility is rarely solved by publishing more. It's solved by aligning search behaviour, intent, and narrative.",
    items: [
      "SEO & content opportunity mapping",
      "On-page optimisation & structuring",
      "Intent & answer-driven architecture",
      "Authority & credibility systems",
    ],
  },
  {
    id: "campaigns",
    title: "Brand & Campaign Strategy",
    subtitle: "One-off campaigns are exciting. Compounding brand momentum is more useful. We help you build marketing that strengthens over time rather than constantly restarting with every launch.",
    items: [
      "Brand strategy & campaign architecture",
      "Integrated planning & narrative alignment",
      "Launch & messaging direction",
      "Always-on storytelling systems",
    ],
  },
  {
    id: "fractional",
    title: "Fractional Leadership",
    subtitle: "Not ready for a full-time CMO? Understandable. Few companies are. We embed as strategic partners, helping leadership teams prioritise, align, and make clearer decisions.",
    items: [
      "Fractional marketing & brand leadership",
      "Quarterly planning & prioritisation",
      "Strategic oversight & reviews",
      "Team enablement & operating playbooks",
    ],
  },
  {
    id: "ai",
    title: "AI-Powered Systems",
    subtitle: "AI is an extraordinary amplifier. It is also exceptionally good at accelerating confusion when foundations are weak. We design AI-assisted workflows that enhance thinking, speed, and consistency without diluting brand voice.",
    items: [
      "AI-assisted content & research systems",
      "Reporting & insight workflows",
      "Monitoring & intelligence structures",
      "Operational automation for lean teams",
    ],
  },
];

export function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = useCallback((id: string) => {
    setExpandedService(prev => prev === id ? null : id);
  }, []);

  return (
    <section
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0D1321" }}
      data-testid="services-section"
    >
      <div
        style={{
          backgroundColor: "#F0EBD8",
          color: "#0D1321",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[800px] mx-auto">
          <div className="mb-10 md:mb-14">
            <span
              className="block mb-6"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
              data-testid="text-services-label"
            >
              What This Looks Like IRL
            </span>
            <h2
              className="mb-5"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
              }}
              data-testid="text-services-heading"
            >
              What this looks like{" "}
              <span className="italic" style={{ opacity: 0.45 }}>
                IRL
              </span>
            </h2>
          </div>

          <div className="space-y-3 mb-12">
            {services.map((service, idx) => {
              const isExpanded = expandedService === service.id;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  style={{
                    border: `1px solid ${isExpanded ? "rgba(116, 140, 171, 0.4)" : "rgba(29, 45, 68, 0.12)"}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    backgroundColor: isExpanded ? "rgba(116, 140, 171, 0.06)" : "transparent",
                  }}
                  data-testid={`card-service-${service.id}`}
                >
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full text-left"
                    style={{
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: "#0D1321",
                    }}
                    data-testid={`button-toggle-${service.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.55rem",
                              opacity: 0.3,
                              letterSpacing: "0.1em",
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                              fontWeight: 600,
                            }}
                          >
                            {service.title}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "'Libre Baskerville', serif",
                            fontSize: "clamp(0.8rem, 0.95vw, 0.88rem)",
                            opacity: 0.55,
                            lineHeight: 1.75,
                          }}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          border: `1.5px solid ${isExpanded ? "#748CAB" : "rgba(29, 45, 68, 0.2)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "0.25rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: isExpanded ? "#748CAB" : "rgba(29, 45, 68, 0.4)",
                            lineHeight: 1,
                            fontWeight: 300,
                          }}
                        >
                          +
                        </span>
                      </motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            padding: "0 1.5rem 1.25rem 1.5rem",
                            borderTop: "1px solid rgba(116, 140, 171, 0.15)",
                            paddingTop: "1rem",
                          }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  style={{
                                    width: "4px",
                                    height: "4px",
                                    borderRadius: "50%",
                                    backgroundColor: "#748CAB",
                                    flexShrink: 0,
                                    marginTop: "0.5rem",
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.85rem",
                                    opacity: 0.65,
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              borderTop: "1px solid rgba(29, 45, 68, 0.1)",
              paddingTop: "2.5rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
                lineHeight: 1.4,
                marginBottom: "0.75rem",
              }}
            >
              Not sure what needs fixing?
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                opacity: 0.5,
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: "500px",
                margin: "0 auto 1.5rem",
              }}
            >
              Tell us where things feel unclear, inconsistent, or misaligned. We'll help you identify the highest-leverage starting point.
            </p>
            <Link
              href="/contact#talk"
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#F0EBD8",
                backgroundColor: "#1D2D44",
                border: "none",
                borderRadius: "8px",
                padding: "0.9rem 2rem",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3E5C76"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1D2D44"; }}
              data-testid="button-get-recommendation"
            >
              Get Our Recommendation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
