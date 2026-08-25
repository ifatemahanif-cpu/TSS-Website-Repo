import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const brandNames = ["SOCIAL", "Art Fervour", "LBB", "Headout"];

function highlightBrands(text: string): ReactNode {
  const regex = new RegExp(`(${brandNames.join("|")})`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    brandNames.includes(part) ? (
      <span
        key={i}
        style={{
          fontStyle: "normal",
          fontFamily: "'Switzer', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.02em",
          opacity: 1,
          color: "#FFFFFF",
        }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const blocks = [
  {
    label: "We start with clarity, not campaigns",
    principle: "Most marketing problems aren't execution problems. They're story problems. The brand doesn't know what it stands for — so everything downstream is guesswork. We fix that first.",
    caseStudy: "At SOCIAL (Impressario Entertainment & Hospitality) — the brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    label: "The people you meet do the work",
    principle: "No handoffs. No juniors learning on your brief. Each of us works with two or three brands at a time. You get senior thinking applied directly to your business. That's it.",
    caseStudy: "At Art Fervour, we didn't advise from the sidelines. We embedded 20–25 hours a week for 90 days. Restructured the team. Rebuilt social strategy. The founder's decision load dropped from 70% to 25%. The story got structure, so it could unfold without constant authorship.",
  },
  {
    label: "We leave scaffolding, not dependency",
    principle: "Strategy that lives in a deck is decoration. We build systems — the workflows, the playbooks, the editorial rhythms — that your team keeps running long after we step back.",
    caseStudy: "At LBB, we built content infrastructure for lean editorial teams across multiple cities. Repeatable formats. Clear calendars. An editorial backbone that didn't collapse after two busy weeks.",
  },
  {
    label: "We turn noise into signal",
    principle: "More content isn't the answer. The right content is. We cut what's not working, sharpen what is, and design systems that make less do more.",
    caseStudy: "At Headout, we scaled the creator program from under 50 to 1,000+ collaborations per quarter. In three months. Not by adding more people — by designing a smarter narrative system.",
  },
];

function WorkBlock({ block, index, isInView }: { block: typeof blocks[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingTop: "clamp(2.5rem, 4vw, 3.5rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 3.5rem)",
        borderBottom: index < blocks.length - 1 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        position: "relative",
      }}
      data-testid={`card-work-${index}`}
    >
      <span
        style={{
          position: "absolute",
          top: "clamp(1.5rem, 3vw, 2.5rem)",
          right: 0,
          fontFamily: "'Zodiak', serif",
          fontSize: "clamp(5rem, 10vw, 9rem)",
          fontWeight: 400,
          opacity: 0.03,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        0{index + 1}
      </span>

      <div className="flex items-baseline gap-3 mb-5">
        <span
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.35)",
            flexShrink: 0,
          }}
        >
          0{index + 1}
        </span>
        <h3
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "clamp(0.72rem, 0.95vw, 0.82rem)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.4,
          }}
        >
          {block.label}
        </h3>
      </div>

      <p
        className="max-w-[750px]"
        style={{
          fontFamily: "'Switzer', sans-serif",
          fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)",
          lineHeight: 1.8,
          color: "rgba(255, 255, 255, 0.85)",
          marginBottom: "1.5rem",
        }}
      >
        {block.principle}
      </p>

      <motion.div
        whileHover={{
          y: -3,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.025)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "12px",
          padding: "clamp(1.25rem, 2vw, 1.75rem)",
          cursor: "default",
        }}
      >
        <span
          className="block mb-2"
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          Case Study
        </span>
        <p
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
            lineHeight: 1.8,
            fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.6)",
          }}
          data-testid={`text-case-study-${index}`}
        >
          {highlightBrands(block.caseStudy)}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="work-section"
    >
      <div
        style={{
          backgroundColor: "#0E0C45",
          color: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5rem)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="block mb-6"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              How We're Different
            </span>

            <h2
              style={{
                fontFamily: "'Zodiak', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
              data-testid="text-work-heading"
            >
              We are marketing's{" "}
              <span className="italic" style={{ opacity: 0.6 }}>
                missing middle.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                lineHeight: 1.8,
                opacity: 0.75,
                marginBottom: "3.5rem",
                maxWidth: "800px",
              }}
              data-testid="text-work-intro"
            >
              We're not an agency. We're not consultants. We're marketing's missing middle — senior leaders who embed with your team, find the thread that holds your brand together, and build the systems that keep it running.
            </p>
          </motion.div>

          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {blocks.map((block, i) => (
              <WorkBlock key={i} block={block} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
