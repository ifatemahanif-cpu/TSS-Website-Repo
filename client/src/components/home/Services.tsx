import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel, SectionHeading } from "./SectionAnimations";
import { GradientBlobs, servicesBlobs } from "./GradientBlobs";
import { useCmsSettings, useCmsServices } from "@/hooks/use-cms";

const hardcodedServices = [
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
    title: "Website, Messaging & Discoverability",
    subtitle: "When the product has evolved but the website hasn't — and good work isn't showing up where it should.",
    items: [
      "Core messaging",
      "Conversion copy",
      "Landing pages",
      "SEO",
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
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { data: settings } = useCmsSettings();
  const { data: cmsServicesData } = useCmsServices();

  const serviceSettings = settings?.services;
  const services = cmsServicesData
    ? cmsServicesData.map((s: any, i: number) => ({
        id: s.id?.toString() ?? `service-${i}`,
        title: s.title,
        subtitle: s.subtitle,
        items: s.items || [],
      }))
    : hardcodedServices;

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="services-section"
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
        />
        <GradientBlobs blobs={servicesBlobs} />
        <div className="max-w-[1100px] mx-auto relative z-[1]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-14"
          >
            <SectionLabel isInView={isInView} testId="text-services-label">{serviceSettings?.label ?? "Services"}</SectionLabel>

            <SectionHeading isInView={isInView} testId="text-services-heading">
              {serviceSettings?.heading ?? "How we work with you."}
            </SectionHeading>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.8,
                fontStyle: "italic",
              }}
            >
              {serviceSettings?.subheading ?? "Every brand arrives with different questions. The starting point is always the same."}
            </p>
          </motion.div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5rem" }}
            className="services-grid"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  gridColumn: i < 3 ? "span 2" : "span 3",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  padding: "clamp(1.5rem, 2.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(123, 30, 122, 0.35)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(123, 30, 122, 0.15), 0 2px 8px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid={`card-service-${service.id}`}
              >
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(123, 30, 122, 0.5), rgba(42, 40, 112, 0.4), transparent)",
                  }}
                />

                <div className="flex items-start gap-4 mb-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "rgba(123, 30, 122, 0.5)",
                      flexShrink: 0,
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      lineHeight: 1.3,
                    }}
                    data-testid={`text-service-title-${i}`}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.82rem, 0.95vw, 0.9rem)",
                    lineHeight: 1.65,
                    opacity: 0.7,
                    fontStyle: "italic",
                    marginBottom: "1rem",
                  }}
                >
                  {service.subtitle}
                </p>

                <div
                  className="flex flex-col gap-2"
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {service.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        letterSpacing: "0.04em",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "rgba(255, 255, 255, 0.85)",
                        lineHeight: 1.2,
                        alignSelf: "flex-start",
                        transition: "border-color 0.2s ease, background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(123, 30, 122, 0.4)";
                        e.currentTarget.style.backgroundColor = "rgba(123, 30, 122, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
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
