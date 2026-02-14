import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const team = [
  {
    name: "Fatema Hanif",
    role: "Strategic Vision & Operations",
    desc: "Built and scaled marketing functions across markets. The rare combination of strategic vision and hands-on operational judgment.",
    brands: ["Headout", "Coca-Cola", "Disney Broadway"],
    focus: ["Brand Positioning", "GTM Strategy", "Creator Programs"],
  },
  {
    name: "Shaili Contractor",
    role: "Content & Narrative Strategy",
    desc: "Senior judgment on content and narrative — the kind that stops brands from saying clever things that don't actually matter.",
    brands: ["Google Pixel", "Heinz", "FirstCry India"],
    focus: ["Content Strategy", "Brand Narrative", "Founder Thought-Leadership"],
  },
  {
    name: "Aakanksha Singh Devi",
    role: "Brand Voice & Storytelling",
    desc: "Narrative discipline and strategic sensitivity. Moves teams from inconsistent messaging to coherent brand voices.",
    brands: ["Cadbury's", "Singapore Tourism Board", "LBB"],
    focus: ["Editorial Positioning", "Voice Definition", "Storytelling Systems"],
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
    { rotate: -12, x: -420, y: 20 },
    { rotate: 0, x: 0, y: -10 },
    { rotate: 12, x: 420, y: 20 },
  ];

  const tabletFanConfigs = [
    { rotate: -10, x: -280, y: 15 },
    { rotate: 0, x: 0, y: -8 },
    { rotate: 10, x: 280, y: 15 },
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
          minHeight: isMobile ? "auto" : "130vh",
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
              003 / Team
            </span>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                color: "#FDE8E9",
                lineHeight: 1.6,
              }}
              data-testid="text-team-heading"
            >
              Deliberately assembled.
            </h2>
            <p
              className="max-w-2xl"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                color: "rgba(253, 232, 233, 0.5)",
                lineHeight: 1.8,
              }}
              data-testid="text-team-subtitle"
            >
              The people you meet are the people doing the work.
              No layers, no hand-offs, no junior proxies.
            </p>
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
  const colors = cardColors[index];

  const rotate = useTransform(fanProgress, [0, 1], [0, targetRotate]);
  const x = useTransform(fanProgress, [0, 1], [0, targetX]);
  const y = useTransform(fanProgress, [0, 1], [stackOffset, targetY]);
  const scale = useTransform(fanProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(
    fanProgress,
    [0, 0.2 + index * 0.15, 0.4 + index * 0.15],
    [index === 0 ? 1 : 0.3, index === 0 ? 1 : 0.8, 1]
  );

  return (
    <motion.div
      className="absolute flex flex-col justify-between group"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        width: "clamp(300px, 28vw, 380px)",
        height: "clamp(420px, 50vh, 520px)",
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: "16px",
        padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
        border: `1px solid ${colors.accent}33`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        transformOrigin: "center bottom",
        cursor: "default",
      }}
      tabIndex={0}
      data-testid={`card-team-${index}`}
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: colors.accent,
              opacity: 0.7,
              letterSpacing: "0.15em",
            }}
          >
            0{index + 1}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: colors.accent,
              opacity: 0.5,
              letterSpacing: "0.1em",
            }}
          >
            SHAPER
          </span>
        </div>

        <h3
          className="mb-2"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            lineHeight: 1.8,
            letterSpacing: "0.05em",
          }}
          data-testid={`text-team-name-${index}`}
        >
          {member.name}
        </h3>
        <p
          className="mb-5"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "0.75rem",
            color: colors.accent,
            fontStyle: "italic",
          }}
        >
          {member.role}
        </p>
        <p
          className="mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            opacity: 0.75,
          }}
        >
          {member.desc}
        </p>
      </div>

      <div>
        <div className="mb-4">
          <span
            className="block mb-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.4,
            }}
          >
            Focus
          </span>
          <div className="flex flex-wrap gap-1.5">
            {member.focus.map((f, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  border: `1px solid ${colors.accent}44`,
                  borderRadius: "999px",
                  padding: "0.25rem 0.6rem",
                  opacity: 0.7,
                }}
                data-testid={`tag-focus-${index}-${idx}`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span
            className="block mb-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.4,
            }}
          >
            Brands
          </span>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              opacity: 0.5,
            }}
          >
            {member.brands.join(" · ")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MobileCards() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {team.map((member, i) => {
        const colors = cardColors[i];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col justify-between"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              borderRadius: "16px",
              padding: "2rem",
              border: `1px solid ${colors.accent}33`,
              minHeight: "380px",
            }}
            tabIndex={0}
            data-testid={`card-team-mobile-${i}`}
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: colors.accent,
                    opacity: 0.7,
                    letterSpacing: "0.15em",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    color: colors.accent,
                    opacity: 0.5,
                  }}
                >
                  SHAPER
                </span>
              </div>

              <h3
                className="mb-2"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "0.7rem",
                  lineHeight: 1.8,
                }}
                data-testid={`text-team-name-mobile-${i}`}
              >
                {member.name}
              </h3>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "0.75rem",
                  color: colors.accent,
                  fontStyle: "italic",
                }}
              >
                {member.role}
              </p>
              <p
                className="mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  opacity: 0.75,
                }}
              >
                {member.desc}
              </p>
            </div>

            <div>
              <div className="mb-3">
                <span
                  className="block mb-2"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                  }}
                >
                  Focus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.focus.map((f, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        border: `1px solid ${colors.accent}44`,
                        borderRadius: "999px",
                        padding: "0.25rem 0.6rem",
                        opacity: 0.7,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span
                  className="block mb-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                  }}
                >
                  Brands
                </span>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    opacity: 0.5,
                  }}
                >
                  {member.brands.join(" · ")}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
