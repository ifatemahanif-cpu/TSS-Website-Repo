import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const engineCells = Array.from({ length: 48 }); // 12 cols × 4 rows

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [seed, setSeed] = useState(9938210);
  const [shapeState, setShapeState] = useState(0);

  useEffect(() => {
    const seedTimer = setInterval(() => {
      setSeed(Math.floor(Math.random() * 9999999));
    }, 2000);
    return () => clearInterval(seedTimer);
  }, []);

  useEffect(() => {
    const shapeTimer = setInterval(() => {
      setShapeState((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(shapeTimer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const centerScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.8]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const leftY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const rightY = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const shapeStyles = [
    { width: 180, height: 180, borderRadius: "0%", rotate: 0, borderStyle: "solid" as const },
    { width: 140, height: 220, borderRadius: "50%", rotate: 15, borderStyle: "dotted" as const },
    { width: 260, height: 90, borderRadius: "100px", rotate: -5, borderStyle: "solid" as const },
    { width: 160, height: 160, borderRadius: "0%", rotate: 0, borderStyle: "solid" as const },
    { width: 200, height: 200, borderRadius: "20px", rotate: 0, borderStyle: "solid" as const },
  ];

  const currentShape = shapeStyles[shapeState];

  return (
    <section
      ref={containerRef}
      className="relative h-[130vh]"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="hero-section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        <div
          className="grid grid-cols-2 md:grid-cols-4 w-full shrink-0"
          style={{ borderBottom: "1px solid rgba(253,232,233,0.12)" }}
        >
          <div
            className="px-4 py-3 text-sm"
            style={{ borderRight: "1px solid rgba(253,232,233,0.12)", color: "#FDE8E9" }}
          >
            <strong className="font-pixel text-[10px]">TSS</strong>
            <span className="ml-2 opacity-40 font-mono text-xs">v2.0</span>
          </div>
          <div
            className="px-4 py-3 text-sm font-mono hidden md:block"
            style={{ borderRight: "1px solid rgba(253,232,233,0.12)", color: "rgba(253,232,233,0.5)" }}
          >
            Status: <span style={{ color: "#7B1E7A" }}>●</span> Active
          </div>
          <div
            className="px-4 py-3 text-sm font-mono hidden md:block"
            style={{ borderRight: "1px solid rgba(253,232,233,0.12)", color: "rgba(253,232,233,0.5)" }}
          >
            Mode: Story_Engine
          </div>
          <div
            className="px-4 py-3 text-sm font-mono text-right"
            style={{ color: "rgba(253,232,233,0.5)" }}
          >
            Menu +
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row w-full relative">

          <motion.div
            style={{ opacity: sideOpacity, y: leftY }}
            className="lg:w-[35%] flex flex-col justify-between p-6 md:p-10 relative z-10"
          >
            <div className="pt-4">
              <h1
                className="leading-[0.85] mb-8"
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
                className="font-sans text-base md:text-lg max-w-sm leading-relaxed mb-10"
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

            <div className="mt-auto pb-4 flex items-end justify-between">
              <span className="font-pixel text-[9px] tracking-widest uppercase" style={{ color: "rgba(253,232,233,0.2)" }}>
                Est. 2026
              </span>
              <p className="font-mono text-[10px] text-right leading-relaxed" style={{ color: "rgba(253,232,233,0.3)" }}>
                Strategy + Narrative + Systems.
                <br />
                No fluff. Pure logic.
              </p>
            </div>
          </motion.div>

          <div
            className="lg:w-[30%] relative flex items-center justify-center z-20"
            style={{ borderLeft: "1px solid rgba(253,232,233,0.08)", borderRight: "1px solid rgba(253,232,233,0.08)" }}
          >
            <motion.div
              style={{ scale: centerScale }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: gridOpacity }}
              >
                <div
                  className="w-full h-full grid grid-cols-12 grid-rows-4"
                  style={{ gap: "1px" }}
                >
                  {engineCells.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        borderRight: "1px solid rgba(253,232,233,0.06)",
                        borderBottom: "1px solid rgba(253,232,233,0.06)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  animate={{
                    width: currentShape.width,
                    height: currentShape.height,
                    borderRadius: currentShape.borderRadius,
                    rotate: currentShape.rotate,
                  }}
                  transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    border: `1px ${currentShape.borderStyle} rgba(123,30,122,0.6)`,
                    position: "relative",
                  }}
                  data-testid="variant-object"
                >
                  <motion.div
                    className="absolute top-1/2 left-1/2"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#7B1E7A",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <span
                    className="absolute font-mono text-[9px]"
                    style={{
                      top: -18,
                      left: 0,
                      color: "rgba(253,232,233,0.3)",
                    }}
                  >
                    Generating...
                  </span>
                </motion.div>
              </div>

              <div
                className="absolute bottom-6 left-6 font-mono text-[10px] leading-relaxed z-10"
                style={{ color: "rgba(253,232,233,0.25)" }}
              >
                RENDER_TARGET: BRAND
                <br />
                LATENCY: 12ms
                <br />
                SEED: {seed}
              </div>

              <div
                className="absolute top-6 right-6 font-mono text-[10px] text-right z-10"
                style={{ color: "rgba(253,232,233,0.25)" }}
              >
                SIGNAL_STRENGTH: HIGH
                <br />
                AUDIENCE_REACH: ∞
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: sideOpacity, y: rightY }}
            className="lg:w-[35%] flex flex-col relative z-10"
          >
            <div
              className="grid grid-cols-4 px-4 py-2 text-[10px] font-mono uppercase tracking-wider"
              style={{
                color: "rgba(253,232,233,0.3)",
                borderBottom: "1px solid rgba(253,232,233,0.08)",
                position: "sticky",
                top: 0,
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
                className="grid grid-cols-4 px-4 py-4 items-baseline cursor-pointer transition-all duration-200 group"
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

            <div className="mt-auto p-6 md:p-10 flex flex-col gap-6">
              <div>
                <span
                  className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: "rgba(253,232,233,0.3)" }}
                >
                  Complexity
                </span>
                <div className="relative w-full h-[1px]" style={{ backgroundColor: "rgba(253,232,233,0.15)" }}>
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#7B1E7A",
                      left: "70%",
                    }}
                    animate={{ left: ["60%", "80%", "70%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div>
                <span
                  className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: "rgba(253,232,233,0.3)" }}
                >
                  Entropy
                </span>
                <div className="relative w-full h-[1px]" style={{ backgroundColor: "rgba(253,232,233,0.15)" }}>
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#FDE8E9",
                      left: "20%",
                    }}
                    animate={{ left: ["15%", "35%", "20%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
