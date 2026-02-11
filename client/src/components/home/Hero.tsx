import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapeState, setShapeState] = useState(0);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setShapeState((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const centerScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const shapeStyles = [
    { width: 160, height: 160, borderRadius: "0%", rotate: 0, borderStyle: "solid" as const },
    { width: 120, height: 200, borderRadius: "50%", rotate: 15, borderStyle: "dotted" as const },
    { width: 220, height: 80, borderRadius: "100px", rotate: -5, borderStyle: "solid" as const },
    { width: 140, height: 140, borderRadius: "0%", rotate: 20, borderStyle: "solid" as const },
    { width: 180, height: 180, borderRadius: "20px", rotate: 0, borderStyle: "solid" as const },
  ];

  const currentShape = shapeStyles[shapeState];

  const handleOrbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    orbRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
  };

  const handleOrbMouseLeave = () => {
    if (!orbRef.current) return;
    orbRef.current.style.transform = "translate(0px, 0px) scale(1)";
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[130vh]"
      data-testid="hero-section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col relative">

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex flex-col h-full"
        >
          <div
            className="flex-[55] flex flex-col justify-end relative"
            style={{ backgroundColor: "#0C0A3E", padding: "2rem" }}
          >
            <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 lg:pb-16">
              <div className="hidden lg:block" />
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 7rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  fontWeight: 400,
                  color: "#FDE8E9",
                  maxWidth: "14ch",
                }}
              >
                <span className="font-serif italic block opacity-70 mb-3" style={{ fontSize: "0.35em" }}>
                  We're
                </span>
                <span className="font-pixel block" style={{ fontSize: "0.3em", lineHeight: 1.4 }}>
                  THE STORY
                  <br />
                  SHAPERS.
                </span>
              </h1>
            </div>
          </div>

          <div
            className="flex-[45] flex flex-col justify-start relative"
            style={{ backgroundColor: "#7B1E7A", padding: "2rem" }}
          >
            <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12 lg:pt-16">

              <div className="relative">
                <div
                  className="absolute right-0 lg:right-[15%] z-50"
                  style={{ top: "calc(-55vh * 0.18 - 70px)" }}
                >
                  <div
                    ref={orbRef}
                    className="flex items-center justify-center text-center cursor-pointer"
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      backgroundColor: "#FDE8E9",
                      color: "#0C0A3E",
                      fontSize: "0.95rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseMove={handleOrbMouseMove}
                    onMouseLeave={handleOrbMouseLeave}
                    data-testid="button-lets-talk"
                  >
                    <span>Let's<br />Talk</span>
                  </div>
                </div>
              </div>

              <div>
                <p
                  className="font-sans mb-4"
                  style={{
                    fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    maxWidth: "32ch",
                    color: "#FDE8E9",
                  }}
                >
                  We fix the thinking before we fix the marketing.
                  Most problems aren't execution problems — they're clarity problems.
                </p>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "rgba(253,232,233,0.6)",
                    marginTop: "1rem",
                  }}
                >
                  The Story Shapers — Strategy + Narrative + Systems
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div style={{ scale: centerScale }}>
            <motion.div
              animate={{
                width: currentShape.width,
                height: currentShape.height,
                borderRadius: currentShape.borderRadius,
                rotate: currentShape.rotate,
              }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              style={{
                border: `1px ${currentShape.borderStyle} rgba(253,232,233,0.25)`,
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
                  backgroundColor: "#FDE8E9",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="absolute font-mono text-[9px]"
                style={{ top: -18, left: 0, color: "rgba(253,232,233,0.25)" }}
              >
                Generating...
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[900]"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 pointer-events-none z-30"
          aria-hidden="true"
        >
          <div className="w-full h-full" style={{ backgroundColor: "#0C0A3E" }} />
        </motion.div>
      </div>
    </section>
  );
}
