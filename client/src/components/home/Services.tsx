import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "clarity",
    title: "Clarity & Direction",
    subtitle: "Your team debates positioning every few months. Investors want a story. Your team wants a plan. You want both. We define what your brand stands for, how it's different, and where it should go next.",
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
    subtitle: "Traffic is fine. Conversions aren't. People land, scroll, and leave. Something's off — you just can't name it. We reshape how your brand presents itself so what visitors see makes sense instantly.",
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
    subtitle: "Your founder posts when they remember. Social feels random. You know consistency matters — but you can't maintain it. We design content systems teams can actually sustain. Without burning out.",
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
    subtitle: "You're doing good work. But when someone searches for what you do, your competitors show up first. We fix how you show up — not by publishing more, but by aligning what you write with what people actually search for.",
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
    subtitle: "You've done one-off launches. They spike and fade. What you need is marketing that compounds — campaigns that build on each other over time.",
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
    subtitle: "You need a senior mind in the room. Not another agency. Not a full-time hire you're not ready for. Just experienced judgment, applied to your business, for as long as you need it.",
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
    subtitle: "AI is an extraordinary amplifier. It's also very good at accelerating confusion when the foundation is shaky. We build AI workflows that help your team move faster without diluting your voice.",
    items: [
      "AI content & research workflows",
      "Reporting & insight automation",
      "Monitoring & intelligence systems",
      "Operational automation for lean teams",
    ],
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= services.length) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    if (activeIndex < services.length - 1) goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  const service = services[activeIndex];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <section
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
        <div className="max-w-[900px] mx-auto">
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
              <span className="italic" style={{ opacity: 0.45 }}>
                your story.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.5,
                fontStyle: "italic",
              }}
            >
              Every brand arrives with different questions. The patterns underneath are usually familiar.
            </p>
          </div>

          <div style={{ minHeight: "340px", position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`card-service-${service.id}`}
              >
                <div className="flex items-baseline gap-4 md:gap-6 mb-6">
                  <span
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(3.5rem, 8vw, 6rem)",
                      lineHeight: 1,
                      fontWeight: 400,
                      opacity: 0.15,
                      letterSpacing: "-0.03em",
                      flexShrink: 0,
                    }}
                  >
                    0{activeIndex + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                      lineHeight: 1.15,
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                    data-testid={`text-service-title-${activeIndex}`}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                    opacity: 0.55,
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    marginBottom: "1.75rem",
                    maxWidth: "700px",
                  }}
                >
                  {service.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          backgroundColor: "rgba(255, 255, 255, 0.25)",
                          flexShrink: 0,
                          marginTop: "0.55rem",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.88rem",
                          opacity: 0.65,
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="flex items-center justify-between mt-10"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "1.5rem",
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: `1px solid ${activeIndex === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"}`,
                  background: "none",
                  color: activeIndex === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
                  cursor: activeIndex === 0 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                }}
                data-testid="button-prev-service"
              >
                ←
              </button>
              <button
                onClick={goNext}
                disabled={activeIndex === services.length - 1}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: `1px solid ${activeIndex === services.length - 1 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"}`,
                  background: "none",
                  color: activeIndex === services.length - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
                  cursor: activeIndex === services.length - 1 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                }}
                data-testid="button-next-service"
              >
                →
              </button>
            </div>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                opacity: 0.3,
              }}
            >
              0{activeIndex + 1} / 0{services.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
