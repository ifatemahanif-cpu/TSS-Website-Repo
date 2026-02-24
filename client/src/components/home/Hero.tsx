import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "clamp(2rem, 5vw, 6rem)",
      }}
      data-testid="hero-section"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(-45deg, #0C0A3E, #1A1852, #2A2870, #7B1E7A, #2A2870, #0C0A3E)",
          backgroundSize: "400% 400%",
          animation: "heroGradient 15s ease infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(123, 30, 122, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(42, 40, 112, 0.2) 0%, transparent 50%)",
          animation: "heroGlow 8s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes heroGradient {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes heroGlow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
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
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            lineHeight: 1.7,
            color: "rgba(255, 255, 255, 0.55)",
            maxWidth: "680px",
            margin: "0 auto",
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
