import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function SectionLabel({
  children,
  isInView,
  className = "",
  testId,
}: {
  children: ReactNode;
  isInView: boolean;
  className?: string;
  testId?: string;
}) {
  return (
    <span
      className={`block mb-6 relative ${className}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        opacity: 0.6,
      }}
      data-testid={testId}
    >
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,30,122,0.4) 0%, rgba(42,40,112,0.3) 40%, transparent 70%)",
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView
            ? {
                opacity: [0, 0.7, 0],
                scale: [0.5, 1.8, 2.2],
              }
            : {}
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}

export function SectionHeading({
  children,
  isInView,
  testId,
  style = {},
}: {
  children: ReactNode;
  isInView: boolean;
  testId?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="relative">
      <h2
        className="section-heading-shimmer"
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          fontWeight: 400,
          marginBottom: "1.5rem",
          backgroundImage: isInView
            ? "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 40%, rgba(255,255,255,0.5) 50%, #FFFFFF 60%, #FFFFFF 100%)"
            : "none",
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: isInView ? "transparent" : "#FFFFFF",
          animation: isInView ? "shimmerSweep 1.5s ease-out forwards" : "none",
          ...style,
        }}
        data-testid={testId}
      >
        {children}
      </h2>
      <motion.div
        style={{
          position: "absolute",
          bottom: "-4px",
          left: 0,
          height: "1px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
