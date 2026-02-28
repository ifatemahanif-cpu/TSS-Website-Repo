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
      className={`block mb-6 relative inline-flex ${className}`}
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
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "120px",
          height: "60px",
          marginTop: "-30px",
          marginLeft: "-60px",
          background: "radial-gradient(ellipse at center, rgba(123,30,122,0.6) 0%, rgba(42,40,112,0.4) 40%, transparent 70%)",
          filter: "blur(16px)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={
          isInView
            ? {
                opacity: [0, 1, 0],
                scale: [0.3, 2.5, 3],
              }
            : {}
        }
        transition={{ duration: 1.5, ease: "easeOut" }}
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
    <h2
      style={{
        fontFamily: "'Libre Baskerville', serif",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        fontWeight: 400,
        marginBottom: "1.5rem",
        color: "#FFFFFF",
        ...style,
      }}
      data-testid={testId}
    >
      {children}
    </h2>
  );
}
