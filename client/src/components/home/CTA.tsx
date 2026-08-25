import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { SectionLabel, SectionHeading } from "./SectionAnimations";
import { GradientBlobs, ctaBlobs } from "./GradientBlobs";
import { useCmsSettings } from "@/hooks/use-cms";

export function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { data: settings } = useCmsSettings();
  const ctaSettings = settings?.cta;

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4 overflow-hidden"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="cta-section"
    >
      <div
        className="relative"
        style={{
          backgroundColor: "#0E0C45",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 5vw, 5rem) clamp(2rem, 5vw, 5rem)",
          overflow: "hidden"
        }}
      >
        <GradientBlobs blobs={ctaBlobs} />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel isInView={isInView} testId="text-cta-label">{ctaSettings?.label ?? "Let's Talk"}</SectionLabel>

            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-12 h-[1px] mb-6 opacity-30" 
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <SectionHeading
                isInView={isInView}
                testId="text-cta-heading"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  lineHeight: 1.15,
                  marginBottom: "0",
                }}
              >
                {ctaSettings?.heading ?? "Not sure where to start?"}
              </SectionHeading>
              <div 
                className="w-12 h-[1px] mt-6 opacity-30" 
                style={{ backgroundColor: "#FFFFFF" }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.8,
              opacity: 0.85,
              marginBottom: "2.5rem",
            }}
            data-testid="text-cta-p1"
          >
            {ctaSettings?.paragraph ?? "Tell us where things feel off. We'll tell you what we see and where to begin."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={ctaSettings?.buttonLink ?? "/contact#talk"}
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#FFFFFF",
                backgroundColor: "#7B1E7A",
                border: "1px solid #7B1E7A",
                borderRadius: "8px",
                padding: "0.9rem 2.5rem",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#9B3E9A"; e.currentTarget.style.borderColor = "#9B3E9A"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#7B1E7A"; e.currentTarget.style.borderColor = "#7B1E7A"; }}
              data-testid="button-get-recommendation"
            >
              {ctaSettings?.buttonText ?? "Get our recommendation →"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
