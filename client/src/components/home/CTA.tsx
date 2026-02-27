import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

export function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="cta-section"
    >
      <div
        style={{
          backgroundColor: "#0E0C45",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[900px] mx-auto text-center">
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
              data-testid="text-cta-label"
            >
              Let's Talk
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
              data-testid="text-cta-heading"
            >
              Not sure where to start?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.8,
              opacity: 0.75,
              marginBottom: "1.5rem",
            }}
            data-testid="text-cta-p1"
          >
            Tell us where things feel unclear, inconsistent, or stuck. We'll tell you what we see — and what the highest-leverage starting point is.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
              lineHeight: 1.8,
              opacity: 0.6,
              fontStyle: "italic",
              marginBottom: "2.5rem",
            }}
            data-testid="text-cta-p2"
          >
            We work with two to three brands at a time. If what you read above sounds like your situation, a 30-minute conversation will tell us both whether this is the right fit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact#talk"
              className="inline-block transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
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
              Get our recommendation &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
