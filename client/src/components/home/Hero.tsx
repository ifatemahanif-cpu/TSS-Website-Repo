import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
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
            animation: "meshBlob1 18s ease-in-out infinite alternate",
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
            animation: "meshBlob2 22s ease-in-out infinite alternate",
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
            animation: "meshBlob3 20s ease-in-out infinite alternate",
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
            animation: "meshBlob4 25s ease-in-out infinite alternate",
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
            animation: "meshBlob5 15s ease-in-out infinite alternate",
          }}
        />
      </div>

      <style>{`
        @keyframes meshBlob1 {
          0% {
            border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%;
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            border-radius: 50% 50% 45% 55% / 55% 45% 50% 50%;
            transform: translate(5%, 3%) scale(1.05);
          }
          66% {
            border-radius: 45% 55% 60% 40% / 45% 55% 45% 55%;
            transform: translate(-3%, 5%) scale(0.98);
          }
          100% {
            border-radius: 55% 45% 50% 50% / 50% 50% 55% 45%;
            transform: translate(2%, -2%) scale(1.03);
          }
        }
        @keyframes meshBlob2 {
          0% {
            border-radius: 55% 45% 40% 60% / 45% 55% 45% 55%;
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            border-radius: 45% 55% 55% 45% / 50% 50% 50% 50%;
            transform: translate(-4%, 4%) scale(1.06);
          }
          66% {
            border-radius: 50% 50% 45% 55% / 55% 45% 55% 45%;
            transform: translate(3%, -3%) scale(0.97);
          }
          100% {
            border-radius: 40% 60% 50% 50% / 45% 55% 50% 50%;
            transform: translate(-2%, 2%) scale(1.04);
          }
        }
        @keyframes meshBlob3 {
          0% {
            border-radius: 50% 50% 45% 55% / 55% 45% 50% 50%;
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            border-radius: 55% 45% 50% 50% / 45% 55% 55% 45%;
            transform: translate(4%, -2%) scale(1.04);
          }
          66% {
            border-radius: 40% 60% 55% 45% / 50% 50% 45% 55%;
            transform: translate(-5%, 3%) scale(1.02);
          }
          100% {
            border-radius: 45% 55% 45% 55% / 55% 45% 50% 50%;
            transform: translate(3%, 4%) scale(0.96);
          }
        }
        @keyframes meshBlob4 {
          0% {
            border-radius: 45% 55% 50% 50% / 50% 45% 55% 50%;
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            border-radius: 50% 50% 55% 45% / 45% 55% 50% 50%;
            transform: translate(-3%, -4%) scale(1.07);
          }
          66% {
            border-radius: 55% 45% 45% 55% / 55% 45% 45% 55%;
            transform: translate(4%, 2%) scale(0.95);
          }
          100% {
            border-radius: 40% 60% 50% 50% / 50% 50% 55% 45%;
            transform: translate(-2%, 5%) scale(1.02);
          }
        }
        @keyframes meshBlob5 {
          0% {
            border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%;
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            border-radius: 50% 50% 55% 45% / 55% 45% 50% 50%;
            transform: translate(3%, -5%) scale(1.05);
          }
          66% {
            border-radius: 45% 55% 45% 55% / 50% 50% 55% 45%;
            transform: translate(-4%, 3%) scale(0.98);
          }
          100% {
            border-radius: 55% 45% 50% 50% / 45% 55% 45% 55%;
            transform: translate(2%, 4%) scale(1.03);
          }
        }
      `}</style>

      <div className="relative max-w-[900px] mx-auto text-center">
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
