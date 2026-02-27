import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function WhatChanges() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="what-changes-section"
    >
      <div
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[750px] mx-auto">
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
                opacity: 0.4,
              }}
              data-testid="text-what-changes-label"
            >
              What Changes After
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
              data-testid="text-what-changes-heading"
            >
              When the story becomes clear,{" "}
              <span className="italic" style={{ opacity: 0.5 }}>
                things start to feel simpler.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.6,
              }}
              data-testid="text-what-changes-p1"
            >
              People describe the company the same way. Decisions feel grounded and easier to make. You stop rewriting the website or tweaking the pitch because something feels slightly off.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.6,
              }}
              data-testid="text-what-changes-p2"
            >
              Customers understand what you do without needing it explained twice. Teams stop debating language and start focusing on progress.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.7,
                fontStyle: "italic",
                opacity: 0.55,
                marginTop: "1rem",
              }}
              data-testid="text-what-changes-closing"
            >
              It's not a dramatic shift. It just suddenly feels right. And once that clarity is in place, it tends to stay.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
