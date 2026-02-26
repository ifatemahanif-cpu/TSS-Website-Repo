import { motion } from "framer-motion";
import { Link } from "wouter";

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
      `}</style>

      <div className="relative w-full" style={{ maxWidth: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block mb-6"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.4,
              color: "#FFFFFF",
            }}
            data-testid="text-hero-label"
          >
            The Story Shapers
          </span>
          <h1
            className="hero-gradient-sweep"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              marginBottom: "1.5rem",
              background: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 30%, #FFFFFF 50%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0.4) 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "100% 0",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientSweep 8s ease-in-out infinite",
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
            maxWidth: "580px",
            marginBottom: "1.5rem",
          }}
          data-testid="text-hero-subhead"
        >
          A collective of senior marketers who bring clarity and direction to brands that have outgrown tactics and guesswork.
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "rgba(255, 255, 255, 0.55)",
              marginLeft: "2px",
              animation: "cursorBlink 1s step-end infinite",
            }}
            data-testid="cursor-blink"
          >|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-6 flex-wrap"
          style={{ marginBottom: "2.5rem" }}
          data-testid="ticker-companies"
        >
          {["Social", "Art Fervour", "LBB", "Headout"].map((company, i) => (
            <span key={i} className="flex items-center gap-6">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                }}
                data-testid={`text-ticker-company-${i}`}
              >
                {company}
              </span>
              {i < 3 && (
                <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.4rem" }}>●</span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact#talk"
            className="inline-flex items-center gap-2 transition-all duration-200 group"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "0.01em",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
            }}
            data-testid="button-lets-talk"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
              e.currentTarget.style.borderBottomColor = "transparent";
            }}
          >
            Let's talk
            <span style={{ fontSize: "1.1rem", transition: "transform 0.2s ease" }} className="group-hover:translate-x-1 inline-block">→</span>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradientSweep {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>

    </section>
  );
}
