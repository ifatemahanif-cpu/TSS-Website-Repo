import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel, SectionHeading } from "./SectionAnimations";

const problems = [
  { id: "01", text: "Marketing is active. Direction is unclear." },
  { id: "02", text: "The website, pitch, and product all say different things." },
  { id: "03", text: "Content goes out. Nothing compounds." },
  { id: "04", text: "Strategy exists on paper. Nowhere else." },
  { id: "05", text: "Everyone's working. Nobody's aligned." },
];

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0.2, 0.85], [0, -80]);
  const contentScale = useTransform(scrollYProgress, [0.3, 0.85], [1, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6"
      style={{
        backgroundColor: "#0C0A3E",
        paddingBottom: "0",
        paddingTop: "1rem",
      }}
      data-testid="problem-framing-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
          paddingBottom: "clamp(6rem, 10vw, 10rem)",
          marginBottom: "-6rem",
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "250px",
            background: "radial-gradient(ellipse at center, rgba(42,40,112,0.22) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="max-w-[1100px] mx-auto relative z-[1]"
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel isInView={isInView}>THE PROBLEM</SectionLabel>

            <SectionHeading isInView={isInView} testId="text-problem-heading">
              Your brand has grown. Your marketing hasn't kept up.
            </SectionHeading>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.8,
                fontStyle: "italic",
                marginBottom: "2.5rem",
              }}
              data-testid="text-problem-subheading"
            >
              These are the patterns we see again and again — the things founders tell us when they know something's off but can't quite name it.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {problems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  delay: 0.2 + index * 0.1,
                }}
                className="flex gap-4 items-center rounded-full border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  padding: "1rem 2rem",
                }}
                data-testid={`problem-item-${item.id}`}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.85rem",
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                  data-testid={`text-problem-number-${item.id}`}
                >
                  {item.id}
                </span>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
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
        </motion.div>
      </div>
    </section>
  );
}
