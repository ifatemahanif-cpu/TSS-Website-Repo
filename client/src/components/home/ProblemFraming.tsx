import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel, SectionHeading } from "./SectionAnimations";
import { GradientBlobs, problemBlobs } from "./GradientBlobs";
import { useCmsSettings, useCmsProblems } from "@/hooks/use-cms";

const hardcodedProblems = [
  { id: "01", text: "You're doing marketing. You just can't explain why any of it's working." },
  { id: "02", text: "Your website says one thing. Your pitch deck says another. Your team says a third." },
  { id: "03", text: "Content goes out every week. You couldn't point to a single lead it brought in." },
  { id: "04", text: "You have a strategy doc somewhere. Nobody's opened it since the offsite." },
];

export function ProblemFraming() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { data: settings } = useCmsSettings();
  const { data: cmsProblems } = useCmsProblems();

  const problemSettings = settings?.problem;
  const problemItems = cmsProblems
    ? cmsProblems.map((p: any) => ({ id: p.displayId, text: p.text }))
    : hardcodedProblems;

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
        paddingTop: "0",
        position: "relative",
        zIndex: 1,
      }}
      data-testid="problem-framing-section"
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0C0A3E",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
          paddingBottom: "clamp(6rem, 10vw, 10rem)",
          marginTop: "0",
          marginBottom: "-6rem",
        }}
      >
        <GradientBlobs blobs={problemBlobs} />
        <motion.div
          className="max-w-[1100px] mx-auto relative z-[1]"
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel isInView={isInView}>{problemSettings?.label ?? "THE PROBLEM"}</SectionLabel>

            <SectionHeading isInView={isInView} testId="text-problem-heading">
              <span dangerouslySetInnerHTML={{ __html: problemSettings?.heading ?? "Your product is clear.<br />Your marketing isn't." }} />
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
            >{problemSettings?.subheading ?? "These are the patterns we see again and again."} </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {problemItems.map((item, index) => (
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
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 20px rgba(123, 30, 122, 0.15)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                className="flex gap-4 items-center rounded-full border cursor-default"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  padding: "1rem 2rem",
                  transition: "background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
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
