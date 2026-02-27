import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Origin() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="origin-section"
    >
      <div
        style={{
          backgroundColor: "#0E0C45",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[1000px] mx-auto">
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
              data-testid="text-origin-label"
            >
              Where It All Began
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "2.5rem",
              }}
              data-testid="text-origin-heading"
            >
              We didn't start in a boardroom.{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                We started in living rooms. Cafes. At the dinner table.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
              }}
              data-testid="text-origin-p1"
            >
              We had built content and brand systems inside companies that were scaling fast. We managed teams across markets. We owned traffic targets and revenue numbers. We fixed websites that no longer reflected the business. We sat in rooms where growth was expected but messaging was unclear.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
              }}
              data-testid="text-origin-p2"
            >
              Over time, we saw the same pattern repeat. The business moved forward. The story lagged behind.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
              }}
              data-testid="text-origin-p3"
            >
              We built The Story Shapers to sit in that gap. Not as an agency that hands over a presentation. Not as a writing service that produces assets without context. But as partners who understand what happens after strategy — because we've been responsible for execution.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.7,
                fontStyle: "italic",
                opacity: 0.65,
                marginTop: "1rem",
              }}
              data-testid="text-origin-closing"
            >
              Positioning must hold across teams. Messaging must survive scale.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
