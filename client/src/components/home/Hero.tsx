import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  driftX: number;
  driftY: number;
  driftRot: number;
  alpha: number;
  color: [number, number, number];
}

function DriftingEllipses() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const ellipsesRef = useRef<Ellipse[]>([]);
  const initedRef = useRef(false);

  const initEllipses = useCallback((w: number, h: number) => {
    const colors: [number, number, number][] = [
      [123, 30, 122],
      [253, 232, 233],
      [160, 60, 160],
      [200, 140, 200],
      [80, 20, 80],
    ];

    const ellipses: Ellipse[] = [];
    for (let i = 0; i < 7; i++) {
      ellipses.push({
        cx: w * (0.1 + Math.random() * 0.8),
        cy: h * (0.1 + Math.random() * 0.8),
        rx: w * (0.25 + Math.random() * 0.5),
        ry: h * (0.03 + Math.random() * 0.06),
        rotation: Math.random() * Math.PI,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.08,
        driftRot: (Math.random() - 0.5) * 0.0003,
        alpha: 0.04 + Math.random() * 0.06,
        color: colors[i % colors.length],
      });
    }
    ellipsesRef.current = ellipses;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    if (!initedRef.current || ellipsesRef.current.length === 0) {
      initEllipses(w, h);
      initedRef.current = true;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    for (const e of ellipsesRef.current) {
      e.cx += e.driftX;
      e.cy += e.driftY;
      e.rotation += e.driftRot;

      if (e.cx - e.rx > w + 100) e.cx = -e.rx;
      if (e.cx + e.rx < -100) e.cx = w + e.rx;
      if (e.cy - e.ry > h + 100) e.cy = -e.ry;
      if (e.cy + e.ry < -100) e.cy = h + e.ry;

      ctx.save();
      ctx.translate(e.cx, e.cy);
      ctx.rotate(e.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, e.rx, e.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${e.color[0]}, ${e.color[1]}, ${e.color[2]}, ${e.alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    }

    tickRef.current += 1;
    animFrameRef.current = requestAnimationFrame(draw);
  }, [initEllipses]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

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

function AnimatedDots() {
  const dots = [".", "..", "..."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dots.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return <span style={{ display: "inline-block", minWidth: "1.5em", textAlign: "left", letterSpacing: "-0.15em" }}>{dots[index]}</span>;
}

function TypewriterHeading() {
  const text = "Our work";
  const [displayedCount, setDisplayedCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (displayedCount < text.length) {
        timeout = setTimeout(() => setDisplayedCount((c) => c + 1), 120);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayedCount > 0) {
        timeout = setTimeout(() => setDisplayedCount((c) => c - 1), 60);
      } else {
        timeout = setTimeout(() => setDeleting(false), 500);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedCount, deleting]);

  return (
    <h2
      className="font-pixel text-xs uppercase tracking-wider mb-4"
      style={{ color: "rgba(253,232,233,0.5)" }}
      data-testid="text-our-work"
    >
      {text.slice(0, displayedCount)}
      <span className="inline-block w-[2px] h-[1em] ml-1 align-middle" style={{ backgroundColor: "rgba(253,232,233,0.5)", animation: "blink 1s step-end infinite" }} />
    </h2>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sideOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const leftY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const rightY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen"
      style={{ backgroundColor: "#0C0A3E" }}
      data-testid="hero-section"
    >
      <DriftingEllipses />

      <div className="h-full w-full overflow-hidden flex flex-col relative z-[1]">

        <div className="flex-1 flex flex-col lg:flex-row w-full relative gap-6 lg:gap-10 px-6 md:px-10 lg:px-16 items-center">

          <motion.div
            style={{ opacity: sideOpacity, y: leftY }}
            className="lg:w-1/2 flex flex-col justify-center relative z-10"
          >
            <div className="pt-16 lg:pt-0">
              <h1
                className="leading-[0.85] mb-6"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  letterSpacing: "-0.04em",
                  fontWeight: 400,
                  color: "#FDE8E9",
                }}
              >
                <span className="font-serif italic block opacity-70" style={{ fontSize: "0.35em", marginBottom: "0.5rem" }}>
                  We're
                </span>
                <span className="font-pixel block" style={{ lineHeight: 1.3, fontSize: "0.45em" }}>
                  THE STORY
                  <br />
                  SHAPERS<AnimatedDots />
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
              >Let's talk →</a>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: sideOpacity, y: rightY }}
            className="lg:w-1/2 flex flex-col justify-center relative z-10"
          >
            <TypewriterHeading />

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

      </div>
    </section>
  );
}
