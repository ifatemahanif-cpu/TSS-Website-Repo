import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="problem-framing-section"
    >
      <div
        style={{
          backgroundColor: "#0C0A3E",
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
            >
              THE PROBLEM
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "3.5rem",
              }}
              data-testid="text-problem-heading"
            >
              Your brand has grown. Your marketing hasn't kept up.
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { id: "01", text: "Marketing is active. Direction is unclear." },
              { id: "02", text: "The website, pitch, and product all say different things." },
              { id: "03", text: "Content goes out. Nothing compounds." },
              { id: "04", text: "Strategy exists on paper. Nowhere else." },
              { id: "05", text: "Everyone's working. Nobody's aligned." },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 items-start"
                data-testid={`problem-item-${item.id}`}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.9rem",
                    opacity: 0.4,
                    marginTop: "0.3rem",
                  }}
                  data-testid={`text-problem-number-${item.id}`}
                >
                  {item.id}
                </span>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                    lineHeight: 1.4,
                    opacity: 0.9,
                    fontWeight: 400,
                  }}
                  data-testid={`text-problem-content-${item.id}`}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
