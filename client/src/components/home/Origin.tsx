import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

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
          fontFamily: "'Inter', sans-serif",
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
    title: "We start by figuring out what the brand actually stands for.",
    description: "Before campaigns or content, we establish what the brand should say and how.",
    teaser: "SOCIAL had 55+ outlets and no consistent answer for what held them together. We found it. Everything else followed.",
    expanded: "At SOCIAL (Impresario Entertainment & Hospitality) — the brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
  },
  {
    title: "You work with us directly. Not someone we've briefed.",
    description: "The person you speak to is the person working on your brand. No handoffs.",
    teaser: "Art Fervour — 90 days embedded. Founder's decision load dropped from 70% to 25%.",
    expanded: "At Art Fervour, we didn't advise from the sidelines. We embedded 20–25 hours a week for 90 days. Restructured the team. Rebuilt social strategy. The founder's decision load dropped from 70% to 25%. The story got structure, so it could unfold without constant authorship.",
  },
  {
    title: "We build what your team runs after we leave.",
    description: "Playbooks, workflows, editorial systems — not a deck.",
    teaser: "LBB — content infrastructure across multiple cities. Still running.",
    expanded: "At LBB, we built content infrastructure for lean editorial teams across multiple cities. Repeatable formats. Clear calendars. An editorial backbone that didn't collapse after two busy weeks.",
  },
  {
    title: "We make what you're already doing work harder.",
    description: "Before adding anything new, we look at what exists and fix that first.",
    teaser: "Headout — 50 to 1,000+ creator collaborations per quarter. Same team. Three months.",
    expanded: "At Headout, we scaled the creator program from under 50 to 1,000+ collaborations per quarter. In three months. Not by adding more people — by designing a smarter narrative system.",
  },
];

function WhatWeDoBlock({ block, index, isInView }: { block: typeof blocks[0]; index: number; isInView: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.025)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "2rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      data-testid={`card-whatwedo-${index}`}
    >
      <div className="flex-grow">
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1,
            color: "rgba(255, 255, 255, 0.05)",
            marginBottom: "1rem",
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: "0.75rem",
            lineHeight: 1.3,
          }}
          data-testid={`text-whatwedo-title-${index}`}
        >
          {block.title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "2rem",
          }}
          data-testid={`text-whatwedo-desc-${index}`}
        >
          {block.description}
        </p>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            padding: "1.25rem",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              fontStyle: "italic",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "1rem",
            }}
          >
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.p
                  key="teaser"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-testid={`text-whatwedo-teaser-${index}`}
                >
                  {highlightBrands(block.teaser)}
                </motion.p>
              ) : (
                <motion.p
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-testid={`text-whatwedo-expanded-${index}`}
                >
                  {highlightBrands(block.expanded)}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              color: "#FFFFFF",
              opacity: 0.8,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            data-testid={`button-read-story-${index}`}
          >
            {isExpanded ? "Close story ↑" : "Read the full story →"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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
        <div className="max-w-[1100px] mx-auto">
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
                opacity: 0.6,
              }}
              data-testid="text-origin-label"
            >
              WHAT WE DO
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                marginBottom: "3.5rem",
                maxWidth: "900px",
              }}
              data-testid="text-origin-heading"
            >
              We fix positioning, messaging, content, and campaigns — and build the systems to keep them running.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((block, i) => (
              <WhatWeDoBlock key={i} block={block} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
