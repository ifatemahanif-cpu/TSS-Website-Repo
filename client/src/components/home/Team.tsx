import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import teamFatema from "@/assets/images/team-fatema.png";
import teamShaili from "@/assets/images/team-shaili.png";
import teamAakanksha from "@/assets/images/team-aakanksha.png";

const team = [
  {
    name: "Fatema Hanif",
    image: teamFatema,
    decisionsLed: "Brand positioning, creator-program design, go-to-market strategy, multi-market expansion, content-systems architecture",
    contextsNavigated: "Early-stage uncertainty, scale-up complexity, global expansion, marketplace dynamics",
    brands: "Headout, Singapore Tourism Board, Mandai Wildlife, Disney Broadway, Coca-Cola India, ITC Classmate, Little Black Book, Penguin Publishing, Universal Studios Japan, Art Fervour, Socials",
    whatSheBrings: "Fatema brings the rare combination of strategic vision and hands-on operational judgment. She has built and scaled marketing functions across markets, led creator programs at scale, and driven brand storytelling transformations for both startups and global brands. Her strength is alignment — making sure brand, growth, and execution pull in the same direction.",
  },
  {
    name: "Shaili Contractor",
    image: teamShaili,
    decisionsLed: "Content strategy frameworks, brand narrative resets, editorial system design, founder thought-leadership strategy, long-form storytelling programs, content-led growth direction",
    contextsNavigated: "Early-stage ambiguity, scale-up complexity, content-led growth phases, brand reinvention moments, leadership positioning for founders",
    brands: "Axis Bank, Heinz, Google Pixel, Tata Sampann, Bajaj Motors, General Mills, FirstCry India, Little Black Book, Headout, STEM Learning",
    whatSheBrings: "Shaili brings senior judgment to content and narrative; the kind that stops brands from saying clever things that don't actually matter. She helps leadership teams move from scattered messaging and ad-hoc content to structured storytelling systems that build recall, credibility, and long-term brand equity. Her work turns \"more content\" into \"the right content,\" aligned to business direction.",
  },
  {
    name: "Aakanksha Singh Devi",
    image: teamAakanksha,
    decisionsLed: "Brand narrative frameworks, voice definition, editorial positioning, storytelling systems, long-form narrative programs",
    contextsNavigated: "Founder-led brands, early-to-scale transitions, repositioning moments, content-led growth phases",
    brands: "Little Black Book (LBB), Headout, Cadbury's, Singapore Tourism Board, Mantri, VR Bengaluru, Arbor Brewing Company, Arrow, Classmate, Columbia Asia",
    whatSheBrings: "Aakanksha brings narrative discipline and strategic sensitivity to brand storytelling. She helps teams move from inconsistent messaging to coherent brand voices that carry meaning across platforms and growth stages. Her work ensures that brands sound like themselves — clearly, consistently, and with intent.",
  },
];

const cardColors = [
  { bg: "#0C0A3E", text: "#FDE8E9", accent: "#7B1E7A" },
  { bg: "#7B1E7A", text: "#FDE8E9", accent: "#FDE8E9" },
  { bg: "#FDE8E9", text: "#0C0A3E", accent: "#7B1E7A" },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fanProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  const desktopFanConfigs = [
    { rotate: -8, x: -340, y: 20 },
    { rotate: 0, x: 0, y: -10 },
    { rotate: 8, x: 340, y: 20 },
  ];

  const tabletFanConfigs = [
    { rotate: -6, x: -220, y: 15 },
    { rotate: 0, x: 0, y: -8 },
    { rotate: 6, x: 220, y: 15 },
  ];

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
          minHeight: isMobile ? "auto" : "140vh",
          padding: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 md:mb-10">
            <span
              className="block mb-3 tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#7B1E7A",
                letterSpacing: "0.3em",
              }}
              data-testid="text-team-label"
            >
              003 / The 3 Marketeers
            </span>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(0.9rem, 2.2vw, 1.4rem)",
                color: "#FDE8E9",
                lineHeight: 1.6,
              }}
              data-testid="text-team-heading"
            >
              Deliberately assembled.
            </h2>
            <div className="max-w-3xl space-y-4">
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                  color: "rgba(253, 232, 233, 0.6)",
                  lineHeight: 1.8,
                }}
                data-testid="text-team-intro-1"
              >
                The Story Shapers is built around complementary ways of thinking that every growing brand eventually needs in the room. It's not here to just generate more ideas, but to generate better decisions. When you work with us, this is the leadership layer you are actually buying into.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                  color: "rgba(253, 232, 233, 0.4)",
                  lineHeight: 1.7,
                }}
                data-testid="text-team-intro-2"
              >
                The people you meet are the people who do the thinking. And the people who do the thinking are the people who stay accountable for it.
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(253, 232, 233, 0.25)",
                letterSpacing: "0.15em",
              }}
            >
              CLICK A CARD TO FLIP
            </span>
          </div>

          {isMobile ? (
            <MobileCards />
          ) : (
            <DesktopFanCards
              fanProgress={fanProgress}
              desktopFanConfigs={desktopFanConfigs}
              tabletFanConfigs={tabletFanConfigs}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function DesktopFanCards({
  fanProgress,
  desktopFanConfigs,
  tabletFanConfigs,
}: {
  fanProgress: any;
  desktopFanConfigs: { rotate: number; x: number; y: number }[];
  tabletFanConfigs: { rotate: number; x: number; y: number }[];
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
      style={{ height: "80vh", perspective: "1200px" }}
    >
      {team.map((member, i) => {
        const config = configs[i];
        const stackOffset = (i - 1) * 6;

        return (
          <FanFlipCard
            key={i}
            member={member}
            index={i}
            fanProgress={fanProgress}
            targetRotate={config.rotate}
            targetX={config.x}
            targetY={config.y}
            stackOffset={stackOffset}
            zIndex={team.length - i}
          />
        );
      })}
    </div>
  );
}

function FanFlipCard({
  member,
  index,
  fanProgress,
  targetRotate,
  targetX,
  targetY,
  stackOffset,
  zIndex,
}: {
  member: (typeof team)[0];
  index: number;
  fanProgress: any;
  targetRotate: number;
  targetX: number;
  targetY: number;
  stackOffset: number;
  zIndex: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
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

  const cardW = "clamp(280px, 24vw, 340px)";
  const cardH = "clamp(400px, 48vh, 480px)";

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        rotateZ,
        scale,
        opacity: cardOpacity,
        zIndex: isFlipped ? 50 : zIndex,
        width: cardW,
        height: cardH,
        perspective: "1000px",
        transformOrigin: "center bottom",
        cursor: "pointer",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${member.name} card. ${isFlipped ? "Showing details. Click to see photo." : "Showing photo. Click to see details."}`}
      data-testid={`card-team-${index}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${colors.accent}33`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
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
              background: `linear-gradient(180deg, transparent 40%, ${colors.bg}ee 85%, ${colors.bg} 100%)`,
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)",
                color: "#FDE8E9",
                lineHeight: 1.8,
                marginBottom: "0.25rem",
              }}
              data-testid={`text-team-name-${index}`}
            >
              {member.name}
            </h3>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                color: colors.accent,
                opacity: 0.7,
                letterSpacing: "0.1em",
                display: "block",
              }}
            >
              TAP TO REVEAL →
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.accent}33`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div className="flex items-start justify-between mb-3">
              <h3
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "clamp(0.5rem, 0.8vw, 0.6rem)",
                  lineHeight: 1.8,
                }}
              >
                {member.name}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem",
                  color: colors.accent,
                  opacity: 0.5,
                }}
              >
                ← FLIP
              </span>
            </div>

            <BackSection label="What she brings" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  lineHeight: 1.65,
                  opacity: 0.8,
                }}
              >
                {member.whatSheBrings}
              </p>
            </BackSection>

            <BackSection label="Decisions led" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  lineHeight: 1.6,
                  opacity: 0.65,
                }}
              >
                {member.decisionsLed}
              </p>
            </BackSection>

            <BackSection label="Contexts navigated" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  lineHeight: 1.6,
                  opacity: 0.65,
                }}
              >
                {member.contextsNavigated}
              </p>
            </BackSection>

            <BackSection label="Brands" colors={colors} last>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  lineHeight: 1.5,
                  opacity: 0.5,
                }}
              >
                {member.brands}
              </p>
            </BackSection>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BackSection({
  label,
  colors,
  children,
  last = false,
}: {
  label: string;
  colors: { bg: string; text: string; accent: string };
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : "0.75rem" }}>
      <span
        className="block mb-1"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: colors.accent,
          opacity: 0.5,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function MobileCards() {
  return (
    <div className="flex flex-col gap-5 mt-4">
      {team.map((member, i) => {
        const colors = cardColors[i];
        return <MobileFlipCard key={i} member={member} index={i} colors={colors} />;
      })}
    </div>
  );
}

function MobileFlipCard({
  member,
  index,
  colors,
}: {
  member: (typeof team)[0];
  index: number;
  colors: { bg: string; text: string; accent: string };
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        perspective: "1000px",
        height: "480px",
        cursor: "pointer",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`${member.name} card. ${isFlipped ? "Showing details." : "Showing photo."}`}
      data-testid={`card-team-mobile-${index}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${colors.accent}33`,
          }}
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
              background: `linear-gradient(180deg, transparent 40%, ${colors.bg}ee 85%, ${colors.bg} 100%)`,
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "0.7rem",
                color: "#FDE8E9",
                lineHeight: 1.8,
                marginBottom: "0.25rem",
              }}
              data-testid={`text-team-name-mobile-${index}`}
            >
              {member.name}
            </h3>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                color: colors.accent,
                opacity: 0.7,
              }}
            >
              TAP TO REVEAL →
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.accent}33`,
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div className="flex items-start justify-between mb-4">
              <h3
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "0.6rem",
                  lineHeight: 1.8,
                }}
              >
                {member.name}
              </h3>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem",
                  color: colors.accent,
                  opacity: 0.5,
                }}
              >
                ← FLIP
              </span>
            </div>

            <BackSection label="What she brings" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  opacity: 0.8,
                }}
              >
                {member.whatSheBrings}
              </p>
            </BackSection>

            <BackSection label="Decisions led" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  opacity: 0.65,
                }}
              >
                {member.decisionsLed}
              </p>
            </BackSection>

            <BackSection label="Contexts navigated" colors={colors}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  opacity: 0.65,
                }}
              >
                {member.contextsNavigated}
              </p>
            </BackSection>

            <BackSection label="Brands" colors={colors} last>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  lineHeight: 1.5,
                  opacity: 0.5,
                }}
              >
                {member.brands}
              </p>
            </BackSection>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
