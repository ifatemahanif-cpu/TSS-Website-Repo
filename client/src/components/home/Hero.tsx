import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const caseStudies = [
  {
    id: "01",
    client: "Lumina Tech",
    category: "Strategic Narrative",
    output: "Brand Story",
  },
  {
    id: "02",
    client: "Velvet Space",
    category: "Brand Identity",
    output: "Visual System",
  },
  {
    id: "03",
    client: "Apex Growth",
    category: "GTM Strategy",
    output: "90-Day Roadmap",
  },
  {
    id: "04",
    client: "Akutee",
    category: "Positioning",
    output: "From Mine to Yours",
  },
  {
    id: "05",
    client: "Headout",
    category: "Creator Programs",
    output: "1,000+ / Quarter",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sideOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const leftY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const rightY = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[115vh]"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="hero-section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        <div className="flex-1 flex flex-col lg:flex-row w-full relative gap-6 lg:gap-10 px-6 md:px-10 lg:px-16 items-center">

          <motion.div
            style={{ opacity: sideOpacity, y: leftY }}
            className="lg:w-1/2 flex flex-col justify-center relative z-10"
          >
            <div className="pt-16 lg:pt-0">
              <h1
                className="leading-[0.85] mb-6"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  letterSpacing: "-0.04em",
                  fontWeight: 400,
                  color: "#FDE8E9",
                }}
              >
                <span className="font-serif italic block opacity-70" style={{ fontSize: "0.4em", marginBottom: "0.5rem" }}>
                  We're
                </span>
                <span className="font-pixel block" style={{ lineHeight: 1.2, fontSize: "0.35em" }}>
                  THE STORY
                  <br />
                  SHAPERS.
                </span>
              </h1>

              <p
                className="font-sans text-base md:text-lg max-w-sm leading-relaxed mb-8"
                style={{ color: "rgba(253,232,233,0.5)" }}
              >
                We fix the thinking before we fix the marketing. Most problems aren't execution problems — they're clarity problems.
              </p>

              <a
                href="#"
                className="inline-block font-medium text-sm transition-all duration-200"
                style={{
                  backgroundColor: "#7B1E7A",
                  color: "#FDE8E9",
                  padding: "0.85rem 2rem",
                  border: "1px solid #7B1E7A",
                }}
                data-testid="button-initialize"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#FDE8E9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7B1E7A";
                  e.currentTarget.style.color = "#FDE8E9";
                }}
              >
                Initialize Engine →
              </a>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: sideOpacity, y: rightY }}
            className="lg:w-1/2 flex flex-col justify-center relative z-10"
          >
            <div
              className="grid grid-cols-4 px-4 py-2 text-[10px] font-mono uppercase tracking-wider"
              style={{
                color: "rgba(253,232,233,0.3)",
                borderBottom: "1px solid rgba(253,232,233,0.08)",
              }}
            >
              <div>idx</div>
              <div className="col-span-1">Client</div>
              <div className="hidden md:block">Processing</div>
              <div className="hidden md:block">Output</div>
            </div>

            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="grid grid-cols-4 px-4 py-5 items-baseline cursor-pointer transition-all duration-200 group"
                style={{
                  borderBottom: "1px solid rgba(253,232,233,0.08)",
                  color: "#FDE8E9",
                }}
                data-testid={`row-casestudy-${study.id}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDE8E9";
                  e.currentTarget.style.color = "#0C0A3E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#FDE8E9";
                }}
              >
                <div className="font-mono text-sm transition-transform duration-500 group-hover:-rotate-45">
                  ↓
                </div>
                <div className="col-span-1">
                  <span className="font-serif text-base">{study.client}</span>
                </div>
                <div className="font-mono text-xs opacity-60 hidden md:block">
                  {study.category}
                </div>
                <div className="font-mono text-xs opacity-60 hidden md:block">
                  {study.output}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          data-testid="scroll-indicator"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(253,232,233,0.4)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-sm"
            style={{ color: "rgba(253,232,233,0.4)" }}
          >
            ↓
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <div className="w-full h-full" style={{ backgroundColor: "#0C0A3E" }} />
        </motion.div>
      </div>
    </section>
  );
}
