import { motion } from "framer-motion";
import { Link } from "wouter";

const tickerItems = [
  { text: "Brand Strategy", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Northvolt", font: "'Inter', sans-serif", style: "normal" },
  { text: "NARRATIVE", font: "'JetBrains Mono', monospace", style: "normal" },
  { text: "Culture Shift", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Meridian Health", font: "'Inter', sans-serif", style: "normal" },
  { text: "CLARITY", font: "'JetBrains Mono', monospace", style: "normal" },
  { text: "Visual Identity", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Arcadia Labs", font: "'Inter', sans-serif", style: "normal" },
  { text: "DIRECTION", font: "'JetBrains Mono', monospace", style: "normal" },
  { text: "Go-to-Market", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Solstice & Co.", font: "'Inter', sans-serif", style: "normal" },
  { text: "IMPACT", font: "'JetBrains Mono', monospace", style: "normal" },
  { text: "Positioning", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Vantage Point", font: "'Inter', sans-serif", style: "normal" },
  { text: "RESONANCE", font: "'JetBrains Mono', monospace", style: "normal" },
  { text: "Creative Direction", font: "'Libre Baskerville', serif", style: "italic" },
  { text: "Ember Collective", font: "'Inter', sans-serif", style: "normal" },
  { text: "MOMENTUM", font: "'JetBrains Mono', monospace", style: "normal" },
];

const itemOpacities = [0.15, 0.3, 0.2, 0.4, 0.25, 0.35, 0.18, 0.3, 0.22, 0.4, 0.15, 0.35, 0.28, 0.2, 0.38, 0.22, 0.3, 0.18];
const itemSizes = ["1.1rem", "1.6rem", "0.85rem", "1.3rem", "1.5rem", "0.9rem", "1.4rem", "1.2rem", "0.95rem", "1.7rem", "1.3rem", "0.85rem", "1.5rem", "1.1rem", "0.9rem", "1.4rem", "1.6rem", "1rem"];

function TickerColumn() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="flex flex-col items-end gap-4">
      {doubled.map((item, i) => {
        const idx = i % tickerItems.length;
        return (
          <span
            key={i}
            style={{
              fontFamily: item.font,
              fontStyle: item.style,
              fontSize: itemSizes[idx],
              color: `rgba(255, 255, 255, ${itemOpacities[idx]})`,
              whiteSpace: "nowrap",
              lineHeight: 1.4,
              letterSpacing: item.font.includes("JetBrains") ? "0.15em" : item.font.includes("Libre") ? "-0.01em" : "0",
            }}
          >
            {item.text}
          </span>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        backgroundColor: "#0C0A3E",
        minHeight: "100vh",
        padding: "clamp(2rem, 5vw, 6rem)",
      }}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "700px",
            maxHeight: "700px",
            top: "-15%",
            left: "-10%",
            borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
            background: "radial-gradient(circle at 30% 40%, rgba(123, 30, 122, 0.35), rgba(123, 30, 122, 0.05) 70%, transparent 100%)",
            filter: "blur(60px)",
            animation: "meshBlob1 5s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            top: "10%",
            right: "-12%",
            borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%",
            background: "radial-gradient(circle at 60% 50%, rgba(42, 40, 112, 0.4), rgba(42, 40, 112, 0.08) 65%, transparent 100%)",
            filter: "blur(50px)",
            animation: "meshBlob2 6s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "45vw",
            height: "45vw",
            maxWidth: "550px",
            maxHeight: "550px",
            bottom: "-10%",
            left: "20%",
            borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%",
            background: "radial-gradient(circle at 50% 60%, rgba(123, 30, 122, 0.22), rgba(42, 40, 112, 0.1) 60%, transparent 100%)",
            filter: "blur(55px)",
            animation: "meshBlob3 7s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "35vw",
            height: "35vw",
            maxWidth: "420px",
            maxHeight: "420px",
            top: "30%",
            left: "40%",
            borderRadius: "45% 55% 50% 50% / 50% 45% 55% 50%",
            background: "radial-gradient(circle at 45% 45%, rgba(42, 40, 112, 0.25), rgba(123, 30, 122, 0.08) 65%, transparent 100%)",
            filter: "blur(65px)",
            animation: "meshBlob4 5.5s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: "350px",
            maxHeight: "350px",
            bottom: "5%",
            right: "10%",
            borderRadius: "60% 40% 50% 50% / 40% 60% 40% 60%",
            background: "radial-gradient(circle at 55% 55%, rgba(123, 30, 122, 0.18), rgba(42, 40, 112, 0.12) 55%, transparent 100%)",
            filter: "blur(50px)",
            animation: "meshBlob5 4s ease-in-out infinite alternate",
          }}
        />
      </div>

      <style>{`
        @keyframes meshBlob1 {
          0% {
            border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%;
            transform: translate(0%, 0%) scale(1);
            opacity: 0.7;
          }
          25% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(10%, 6%) scale(1.12);
            opacity: 1;
          }
          50% {
            border-radius: 35% 65% 65% 35% / 40% 60% 40% 60%;
            transform: translate(-6%, 12%) scale(0.92);
            opacity: 0.6;
          }
          75% {
            border-radius: 65% 35% 45% 55% / 55% 45% 35% 65%;
            transform: translate(8%, -5%) scale(1.08);
            opacity: 0.9;
          }
          100% {
            border-radius: 50% 50% 60% 40% / 35% 65% 50% 50%;
            transform: translate(-4%, 8%) scale(1.05);
            opacity: 0.75;
          }
        }
        @keyframes meshBlob2 {
          0% {
            border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
            transform: translate(0%, 0%) scale(1);
            opacity: 0.8;
          }
          25% {
            border-radius: 35% 65% 60% 40% / 60% 40% 55% 45%;
            transform: translate(-8%, 10%) scale(1.15);
            opacity: 0.6;
          }
          50% {
            border-radius: 60% 40% 35% 65% / 40% 60% 65% 35%;
            transform: translate(7%, -8%) scale(0.9);
            opacity: 1;
          }
          75% {
            border-radius: 45% 55% 55% 45% / 65% 35% 40% 60%;
            transform: translate(-5%, 5%) scale(1.1);
            opacity: 0.7;
          }
          100% {
            border-radius: 30% 70% 50% 50% / 50% 50% 60% 40%;
            transform: translate(6%, -4%) scale(1.02);
            opacity: 0.85;
          }
        }
        @keyframes meshBlob3 {
          0% {
            border-radius: 50% 50% 45% 55% / 55% 45% 50% 50%;
            transform: translate(0%, 0%) scale(1);
            opacity: 0.65;
          }
          25% {
            border-radius: 65% 35% 55% 45% / 35% 65% 60% 40%;
            transform: translate(9%, -7%) scale(1.1);
            opacity: 0.9;
          }
          50% {
            border-radius: 40% 60% 65% 35% / 55% 45% 35% 65%;
            transform: translate(-10%, 8%) scale(0.95);
            opacity: 0.5;
          }
          75% {
            border-radius: 55% 45% 35% 65% / 45% 55% 55% 45%;
            transform: translate(5%, 10%) scale(1.08);
            opacity: 0.8;
          }
          100% {
            border-radius: 35% 65% 50% 50% / 60% 40% 45% 55%;
            transform: translate(-6%, -3%) scale(0.98);
            opacity: 0.7;
          }
        }
        @keyframes meshBlob4 {
          0% {
            border-radius: 45% 55% 50% 50% / 50% 45% 55% 50%;
            transform: translate(0%, 0%) scale(1);
            opacity: 0.6;
          }
          25% {
            border-radius: 30% 70% 65% 35% / 60% 40% 45% 55%;
            transform: translate(-7%, -9%) scale(1.18);
            opacity: 0.9;
          }
          50% {
            border-radius: 60% 40% 40% 60% / 35% 65% 55% 45%;
            transform: translate(10%, 6%) scale(0.88);
            opacity: 0.55;
          }
          75% {
            border-radius: 50% 50% 55% 45% / 55% 45% 35% 65%;
            transform: translate(-4%, 10%) scale(1.12);
            opacity: 1;
          }
          100% {
            border-radius: 65% 35% 45% 55% / 45% 55% 60% 40%;
            transform: translate(6%, -6%) scale(1.04);
            opacity: 0.7;
          }
        }
        @keyframes meshBlob5 {
          0% {
            border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%;
            transform: translate(0%, 0%) scale(1);
            opacity: 0.75;
          }
          25% {
            border-radius: 40% 60% 35% 65% / 65% 35% 55% 45%;
            transform: translate(8%, -10%) scale(1.14);
            opacity: 0.5;
          }
          50% {
            border-radius: 55% 45% 60% 40% / 40% 60% 35% 65%;
            transform: translate(-9%, 7%) scale(0.92);
            opacity: 1;
          }
          75% {
            border-radius: 35% 65% 45% 55% / 55% 45% 60% 40%;
            transform: translate(5%, 8%) scale(1.1);
            opacity: 0.6;
          }
          100% {
            border-radius: 50% 50% 55% 45% / 45% 55% 45% 55%;
            transform: translate(-6%, -5%) scale(1.06);
            opacity: 0.85;
          }
        }
        @keyframes tickerScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

      <div className="relative w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-center gap-12 md:gap-8">
        <div className="flex-1 md:max-w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                color: "#FFFFFF",
                marginBottom: "1.5rem",
              }}
              data-testid="text-hero-heading"
            >
              We're{" "}
              <span className="italic">The Story Shapers.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.55)",
              maxWidth: "540px",
              marginBottom: "2.5rem",
            }}
            data-testid="text-hero-subhead"
          >
            A collective of senior marketers who bring clarity and direction to brands that have outgrown tactics and guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact#talk"
              className="inline-block font-medium text-sm transition-all duration-200"
              style={{
                backgroundColor: "#7B1E7A",
                color: "#FFFFFF",
                padding: "0.85rem 2.5rem",
                border: "1px solid #7B1E7A",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.02em",
              }}
              data-testid="button-lets-talk"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#9B3E9A";
                e.currentTarget.style.borderColor = "#9B3E9A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#7B1E7A";
                e.currentTarget.style.borderColor = "#7B1E7A";
              }}
            >
              Let's talk &rarr;
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 md:max-w-[40%] relative overflow-hidden"
          style={{ height: "clamp(300px, 50vh, 500px)" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          data-testid="hero-ticker"
        >
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, #0C0A3E 0%, transparent 15%, transparent 85%, #0C0A3E 100%)",
            }}
          />
          <div
            style={{
              transform: "rotate(-6deg)",
              transformOrigin: "center center",
              height: "120%",
              marginTop: "-10%",
            }}
          >
            <div
              style={{
                animation: "tickerScroll 25s linear infinite",
              }}
            >
              <TickerColumn />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        data-testid="scroll-indicator"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          &darr;
        </motion.div>
      </motion.div>
    </section>
  );
}
