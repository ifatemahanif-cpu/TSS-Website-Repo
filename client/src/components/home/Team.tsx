import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import teamFatema from "@/assets/images/team-fatema.png";
import teamShaili from "@/assets/images/team-shaili.png";
import teamAakanksha from "@/assets/images/team-aakanksha.png";

const team = [
  {
    name: "Fatema Hanif",
    image: teamFatema,
    decisionsLed: "Brand positioning & frameworks \u00b7 Creator-program design \u00b7 Go-to-market strategy \u00b7 Multi-market expansion \u00b7 Content systems",
    contextsNavigated: "",
    brandsLabel: "Brands",
    brands: "Headout, Singapore Tourism Board, Mandai Wildlife, Coca-Cola India, ITC Classmate, Little Black Book, Penguin Publishing, Art Fervour, SOCIAL",
    whatSheBrings: [
      "Fatema brings strategic vision and hands-on operational judgment in equal measure.",
      "She has built and scaled marketing functions across markets, led creator programs at scale, and driven brand transformations for startups and global brands alike.",
      "Her strength is alignment \u2014 making sure brand, growth, and execution pull in the same direction.",
    ],
  },
  {
    name: "Shaili Contractor",
    image: teamShaili,
    decisionsLed: "Content strategy \u00b7 Brand narrative \u00b7 Editorial systems \u00b7 Founder thought-leadership \u00b7 Long-form storytelling",
    contextsNavigated: "",
    brandsLabel: "Brands",
    brands: "Axis Bank, Heinz, Google Pixel, Tata Sampann, Bajaj Motors, General Mills, FirstCry India, Little Black Book, Headout, STEM Learning",
    whatSheBrings: [
      "Shaili brings the kind of senior judgment to content and narrative that stops brands from saying clever things that don't actually matter.",
      'She moves teams from scattered messaging and ad-hoc content to structured storytelling systems that build recall, credibility, and long-term brand equity.',
      'Her work turns \u201cmore content\u201d into \u201cthe right content.\u201d',
    ],
  },
  {
    name: "Aakanksha Singh Devi",
    image: teamAakanksha,
    decisionsLed: "Brand narrative frameworks \u00b7 Voice definition \u00b7 Editorial positioning \u00b7 Storytelling systems",
    contextsNavigated: "",
    brandsLabel: "Brands",
    brands: "Little Black Book, Headout, Cadbury's, Singapore Tourism Board, Mantri, VR Bengaluru, Arbor Brewing Company, Arrow, Classmate, Columbia Asia",
    whatSheBrings: [
      "Aakanksha brings narrative discipline and strategic sensitivity to brand storytelling.",
      "She moves teams from inconsistent messaging to coherent brand voices that carry meaning across platforms and growth stages.",
      "Her work ensures brands sound like themselves \u2013 clearly, consistently, and with intent.",
    ],
  },
];

const cardColors = [
  { bg: "#0C0A3E", text: "#FDE8E9", accent: "#7B1E7A", overlayDark: true },
  { bg: "#7B1E7A", text: "#FDE8E9", accent: "#FDE8E9", overlayDark: true },
  { bg: "#FDE8E9", text: "#0C0A3E", accent: "#7B1E7A", overlayDark: false },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedIndex]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fanProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  const desktopFanConfigs = [
    { rotate: -10, x: -180, y: 20 },
    { rotate: 0, x: 0, y: -10 },
    { rotate: 10, x: 180, y: 20 },
  ];

  const tabletFanConfigs = [
    { rotate: -8, x: -140, y: 15 },
    { rotate: 0, x: 0, y: -8 },
    { rotate: 8, x: 140, y: 15 },
  ];

  const handleCardClick = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-2 md:px-4 lg:px-6 py-4"
      style={{ backgroundColor: "#000" }}
      data-testid="team-section"
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0C0A3E",
          borderRadius: "20px",
          minHeight: isMobile ? "auto" : "100vh",
          padding: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          {isMobile ? (
            <>
              <div className="mb-6">
                <span
                  className="block mb-3 tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#7B1E7A",
                    letterSpacing: "0.3em",
                  }}
                  data-testid="text-team-label"
                >Who You'll Work With</span>
                <h2
                  className="mb-4"
                  style={{
                    color: "#FDE8E9",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                  data-testid="text-team-heading"
                >
                  <span
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                      fontWeight: 400,
                    }}
                  >
                    Three senior perspectives{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      opacity: 0.6,
                    }}
                  >
                    that growing brands need in the room.
                  </span>
                </h2>
                <div className="space-y-4">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                      color: "rgba(253, 232, 233, 0.6)",
                      lineHeight: 1.8,
                    }}
                    data-testid="text-team-intro-1"
                  >
                    We've led brand resets, growth inflection points, and narrative reinventions across categories and stages. We understand the weight of decisions — and the cost of getting them wrong.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                      color: "rgba(253, 232, 233, 0.45)",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                    }}
                    data-testid="text-team-intro-2"
                  >
                    The people you meet are the people who do the thinking.
                  </p>
                </div>
              </div>
              <MobileCards onCardClick={handleCardClick} />
            </>
          ) : (
            <div className="flex items-start gap-8 lg:gap-12" style={{ minHeight: "80vh" }}>
              <div className="w-[42%] shrink-0 sticky" style={{ top: "clamp(2rem, 4vw, 4rem)" }}>
                <span
                  className="block mb-3 tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#7B1E7A",
                    letterSpacing: "0.3em",
                  }}
                  data-testid="text-team-label"
                >Who You'll Work With</span>
                <h2
                  className="mb-5"
                  style={{
                    color: "#FDE8E9",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                  data-testid="text-team-heading"
                >
                  <span
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                      fontWeight: 400,
                    }}
                  >
                    Three senior perspectives{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      opacity: 0.6,
                    }}
                  >
                    that growing brands need in the room.
                  </span>
                </h2>
                <div className="space-y-4">
                  <p
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                      color: "rgba(253, 232, 233, 0.6)",
                      lineHeight: 1.8,
                    }}
                    data-testid="text-team-intro-1"
                  >
                    We've led brand resets, growth inflection points, and narrative reinventions across categories and stages. We understand the weight of decisions — and the cost of getting them wrong.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.78rem, 1vw, 0.9rem)",
                      color: "rgba(253, 232, 233, 0.45)",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                    }}
                    data-testid="text-team-intro-2"
                  >
                    The people you meet are the people who do the thinking.
                  </p>
                </div>
                <div className="mt-6">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      color: "rgba(253, 232, 233, 0.25)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    CLICK A CARD TO READ MORE
                  </span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <DesktopFanCards
                  fanProgress={fanProgress}
                  desktopFanConfigs={desktopFanConfigs}
                  tabletFanConfigs={tabletFanConfigs}
                  onCardClick={handleCardClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {expandedIndex !== null && (
          <TeamModal
            member={team[expandedIndex]}
            index={expandedIndex}
            colors={cardColors[expandedIndex]}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function TeamModal({
  member,
  index,
  colors,
  onClose,
}: {
  member: (typeof team)[0];
  index: number;
  colors: (typeof cardColors)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const modalBg = "#0C0A3E";
  const modalText = "#FDE8E9";
  const modalAccent = "#7B1E7A";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
      data-testid={`modal-team-${index}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: modalBg,
          color: modalText,
          borderRadius: "20px",
          border: `1px solid ${modalAccent}33`,
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex flex-col md:flex-row">
          <div
            className="md:w-2/5 relative"
            style={{
              minHeight: "300px",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px 20px 0 0",
              }}
              className="md:!rounded-l-[20px] md:!rounded-r-none"
            />
            <div
              className="md:hidden"
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, transparent 50%, ${modalBg} 100%)`,
                borderRadius: "20px 20px 0 0",
              }}
            />
          </div>

          <div
            className="md:w-3/5 p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: modalAccent,
                    opacity: 0.6,
                    letterSpacing: "0.2em",
                  }}
                >
                  0{index + 1} / SHAPER
                </span>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)",
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                  data-testid={`modal-team-name-${index}`}
                >
                  {member.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: modalAccent,
                  opacity: 0.6,
                  background: "none",
                  border: `1px solid ${modalAccent}44`,
                  borderRadius: "6px",
                  padding: "0.4rem 0.75rem",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
                data-testid={`button-close-modal-${index}`}
              >
                CLOSE ×
              </button>
            </div>

            <ModalSection label="What she brings" accent={modalAccent}>
              {member.whatSheBrings.map((line, idx) => (
                <p
                  key={idx}
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                    lineHeight: 1.8,
                    opacity: 0.85,
                    marginBottom: idx < member.whatSheBrings.length - 1 ? "0.5rem" : 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </ModalSection>

            <ModalSection label="Decisions led" accent={modalAccent}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  opacity: 0.7,
                }}
              >
                {member.decisionsLed}
              </p>
            </ModalSection>

            <ModalSection label={member.brandsLabel} accent={modalAccent} last>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  opacity: 0.5,
                }}
              >
                {member.brands}
              </p>
            </ModalSection>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModalSection({
  label,
  accent,
  children,
  last = false,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : "1.25rem" }}>
      <span
        className="block mb-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: accent,
          opacity: 0.5,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function DesktopFanCards({
  fanProgress,
  desktopFanConfigs,
  tabletFanConfigs,
  onCardClick,
}: {
  fanProgress: any;
  desktopFanConfigs: { rotate: number; x: number; y: number }[];
  tabletFanConfigs: { rotate: number; x: number; y: number }[];
  onCardClick: (index: number) => void;
}) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const configs = isTablet ? tabletFanConfigs : desktopFanConfigs;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "70vh", perspective: "1200px" }}
    >
      {team.map((member, i) => {
        const config = configs[i];
        const stackOffset = (i - 1) * 6;

        return (
          <FanCard
            key={i}
            member={member}
            index={i}
            fanProgress={fanProgress}
            targetRotate={config.rotate}
            targetX={config.x}
            targetY={config.y}
            stackOffset={stackOffset}
            zIndex={team.length - i}
            onCardClick={onCardClick}
          />
        );
      })}
    </div>
  );
}

function FanCard({
  member,
  index,
  fanProgress,
  targetRotate,
  targetX,
  targetY,
  stackOffset,
  zIndex,
  onCardClick,
}: {
  member: (typeof team)[0];
  index: number;
  fanProgress: any;
  targetRotate: number;
  targetX: number;
  targetY: number;
  stackOffset: number;
  zIndex: number;
  onCardClick: (index: number) => void;
}) {
  const colors = cardColors[index];

  const rotateZ = useTransform(fanProgress, [0, 1], [0, targetRotate]);
  const x = useTransform(fanProgress, [0, 1], [0, targetX]);
  const y = useTransform(fanProgress, [0, 1], [stackOffset, targetY]);
  const scale = useTransform(fanProgress, [0, 1], [0.95, 1]);
  const cardOpacity = useTransform(
    fanProgress,
    [0, 0.2 + index * 0.15, 0.4 + index * 0.15],
    [index === 0 ? 1 : 0.3, index === 0 ? 1 : 0.8, 1]
  );

  const cardW = "clamp(220px, 18vw, 280px)";
  const cardH = "clamp(320px, 42vh, 400px)";

  const overlayGradient = colors.overlayDark
    ? `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)`
    : `linear-gradient(180deg, transparent 30%, rgba(12,10,62,0.5) 70%, rgba(12,10,62,0.85) 100%)`;

  return (
    <motion.div
      className="absolute group"
      style={{
        x,
        y,
        rotateZ,
        scale,
        opacity: cardOpacity,
        zIndex,
        width: cardW,
        height: cardH,
        transformOrigin: "center bottom",
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${colors.accent}33`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
      onClick={() => onCardClick(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Read more about ${member.name}`}
      data-testid={`card-team-${index}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayGradient,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          right: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#FDE8E9",
            opacity: 0.8,
            letterSpacing: "0.15em",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          0{index + 1}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5rem",
            color: "#FDE8E9",
            opacity: 0.6,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          SHAPER
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
            fontWeight: 600,
            color: "#FDE8E9",
            lineHeight: 1.5,
            marginBottom: "0.5rem",
          }}
          data-testid={`text-team-name-${index}`}
        >
          {member.name}
        </h3>
        <span
          className="inline-block transition-all duration-300 group-hover:translate-x-1"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "#FDE8E9",
            opacity: 0.5,
            letterSpacing: "0.1em",
          }}
        >
          READ MORE →
        </span>
      </div>
    </motion.div>
  );
}

function MobileCards({ onCardClick }: { onCardClick: (index: number) => void }) {
  return (
    <div className="flex flex-col gap-5 mt-4">
      {team.map((member, i) => {
        const colors = cardColors[i];
        return (
          <MobileCard
            key={i}
            member={member}
            index={i}
            colors={colors}
            onCardClick={onCardClick}
          />
        );
      })}
    </div>
  );
}

function MobileCard({
  member,
  index,
  colors,
  onCardClick,
}: {
  member: (typeof team)[0];
  index: number;
  colors: (typeof cardColors)[0];
  onCardClick: (index: number) => void;
}) {
  const overlayGradient = colors.overlayDark
    ? `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)`
    : `linear-gradient(180deg, transparent 30%, rgba(12,10,62,0.5) 70%, rgba(12,10,62,0.85) 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        height: "420px",
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${colors.accent}33`,
        position: "relative",
      }}
      onClick={() => onCardClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`Read more about ${member.name}`}
      data-testid={`card-team-mobile-${index}`}
    >
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayGradient,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          right: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#FDE8E9",
            opacity: 0.8,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          0{index + 1}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "#FDE8E9",
            opacity: 0.6,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          SHAPER
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#FDE8E9",
            lineHeight: 1.5,
            marginBottom: "0.5rem",
          }}
          data-testid={`text-team-name-mobile-${index}`}
        >
          {member.name}
        </h3>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "#FDE8E9",
            opacity: 0.5,
          }}
        >
          READ MORE →
        </span>
      </div>
    </motion.div>
  );
}
