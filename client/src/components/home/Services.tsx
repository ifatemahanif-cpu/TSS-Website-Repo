import { useState, useCallback, useEffect } from "react";
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
              What This Looks Like IRL
            </span>
            <h2
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

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "2.5rem",
              marginTop: "2.5rem",
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
                color: "#FFFFFF",
                backgroundColor: "#7B1E7A",
                border: "none",
                borderRadius: "8px",
                padding: "0.9rem 2rem",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B3E9A"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; }}
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
