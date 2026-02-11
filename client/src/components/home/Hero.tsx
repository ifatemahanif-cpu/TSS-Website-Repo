import { useRef } from "react";

export function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);

  const handleOrbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    orbRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
  };

  const handleOrbMouseLeave = () => {
    if (!orbRef.current) return;
    orbRef.current.style.transform = `translate(0px, 0px) scale(1)`;
  };

  return (
    <section
      className="w-full min-h-screen flex flex-col relative"
      data-testid="hero-section"
    >
      <div
        className="absolute inset-0 pointer-events-none z-[900]"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="w-full flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16"
        style={{ height: "55vh", backgroundColor: "#FDE8E9" }}
      >
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hidden lg:block" />
          <h1
            className="leading-[0.95]"
            style={{
              fontSize: "clamp(3rem, 5.5vw, 8rem)",
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: "#0C0A3E",
              maxWidth: "14ch",
            }}
          >
            <span className="font-serif italic block mb-2" style={{ fontSize: "0.35em", opacity: 0.7 }}>
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
        className="w-full flex flex-col justify-start px-8 md:px-16 lg:px-24 pt-16"
        style={{ height: "45vh", backgroundColor: "#0C0A3E" }}
      >
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p
              className="font-sans leading-[1.3]"
              style={{
                fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
                letterSpacing: "-0.01em",
                maxWidth: "32ch",
                color: "#FDE8E9",
              }}
            >
              We fix the thinking before we fix the marketing. Most problems
              aren't execution problems — they're clarity problems.
            </p>
            <p
              className="font-mono mt-4"
              style={{
                fontSize: "0.9rem",
                color: "rgba(253,232,233,0.5)",
              }}
            >
              Est. 2026 — Strategy + Narrative + Systems
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute z-50"
        style={{
          top: "55vh",
          right: "clamp(2rem, 15%, 15%)",
          transform: "translateY(-50%)",
        }}
      >
        <div
          ref={orbRef}
          className="flex items-center justify-center text-center cursor-pointer"
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "#7B1E7A",
            color: "#FDE8E9",
            fontSize: "1rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease",
          }}
          onMouseMove={handleOrbMouseMove}
          onMouseLeave={handleOrbMouseLeave}
          data-testid="button-orb-cta"
        >
          <span className="font-serif text-sm leading-tight">
            Let's
            <br />
            Talk
          </span>
        </div>
      </div>
    </section>
  );
}
