import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { useEffect } from "react";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

const BG = "#0C0A3E";
const ACCENT = "#7B1E7A";
const ACCENT_HOVER = "#9B3E9A";
const BORDER = "rgba(255,255,255,0.12)";
const MUTED = "rgba(255,255,255,0.6)";
const CARD = "#151340";

type HeroBlock = { eyebrow?: string; headlineLine1?: string; headlineLine2?: string; headlineLine2Italic?: boolean; subtext?: string; portrait?: string };
type AboutBlock = { label?: string; title?: string; paragraphs?: string[]; tags?: string[] };
type StatsBlock = { items?: { value: string; label: string }[] };

type PortfolioSummary = {
  id: number;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroBlock;
  stats: StatsBlock;
  about: AboutBlock;
};

export default function TeamPage() {
  const { data: members, isLoading } = useQuery<PortfolioSummary[]>({
    queryKey: ["/api/portfolios/summaries"],
  });

  useEffect(() => {
    document.title = "Our Team — The Story Shapers";
  }, []);

  return (
    <div style={{ backgroundColor: BG, color: "#FFFFFF", minHeight: "100vh", fontFamily: "'Switzer', sans-serif" }} data-testid="page-team">
      <Navbar />

      {/* HERO */}
      <section style={{ padding: "9rem 1.5rem 5rem", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED, marginBottom: "1.5rem" }}>
          The Collective
        </div>
        <h1 style={{ fontFamily: "'Zodiak', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Meet the team.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: MUTED, maxWidth: "560px", margin: "0 auto" }}>
          Three senior strategists. One shared belief: that the best brand work happens when strategy, content, and editorial thinking move together.
        </p>
      </section>

      {/* MEMBER CARDS */}
      <section style={{ padding: "0 1.5rem 7rem", maxWidth: "1100px", margin: "0 auto" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", color: MUTED, fontFamily: "'Switzer', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", padding: "4rem 0" }}>
            LOADING…
          </div>
        ) : (
          // Three across from tablet up, stacked on a phone. The column count
          // used to be an inline repeat(3, 1fr), which held at every width and
          // squeezed all three cards into a 390px screen — headlines came out a
          // word per line. It stays in the class list precisely so it can be
          // overridden by breakpoint; an inline grid-template-columns cannot be.
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1.25rem" }}>
            {(members || []).map((member, idx) => (
              <MemberCard key={member.slug} member={member} idx={idx} />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, padding: "3rem 2rem", textAlign: "center", color: "#FFFFFF" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <img src={logoImg} alt="The Story Shapers" style={{ height: "44px", width: "auto", filter: "invert(1) brightness(2)", marginBottom: "1rem" }} />
            <p style={{ fontFamily: "'Zodiak', serif", fontStyle: "italic", fontSize: "0.85rem", color: MUTED, marginBottom: "1.25rem" }}>
              Brand strategy. Content leadership. Editorial thinking.
            </p>
            <Link href="/" style={{ fontFamily: "'Switzer', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }} data-testid="link-footer-home">
              ← Back to homepage
            </Link>
            <p style={{ marginTop: "2rem", fontFamily: "'Switzer', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} The Story Shapers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MemberCard({ member, idx }: { member: PortfolioSummary; idx: number }) {
  const portrait = (member.hero as HeroBlock).portrait;
  const subtext = (member.hero as HeroBlock).subtext;

  // Where to crop each portrait. The card is 4:3 and the source photos are tall,
  // so only about half of each image's height survives — which half has to be
  // chosen per photo or a face ends up sliced.
  //
  // Aakanksha's is a full-length shot: her face sits roughly a quarter of the way
  // down a 3000x4500 frame, and "center center" started the visible window at
  // exactly that point, cutting her off at the eyes. A Y percentage of 16 opens
  // the window at about 8% of the image instead, which clears the top of her head.
  const photoPosition =
    member.slug === "aakanksha" ? "center 16%" :
    member.slug === "shaili" ? "center calc(50% + 35px)" :
    "center calc(50% + 15px)";

  // Panning alone still left her much further away than the other two, which are
  // head-and-shoulders: three cards in a row, one of them a full-length shot,
  // reads as a mistake. Scaling in about her face brings her to the same distance.
  // The source is 3000x4500, so there is far more resolution here than the card
  // needs even after the zoom. The card already clips.
  const photoZoom = member.slug === "aakanksha" ? 1.45 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: CARD,
        borderRadius: "16px",
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
      }}
      data-testid={`member-card-${member.slug}`}
    >
      {/* Photo */}
      <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", flexShrink: 0 }}>
        {portrait ? (
          <img
            src={portrait}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: photoPosition, transform: `scale(${photoZoom})`, transformOrigin: "center 25%" }}
            data-testid={`img-member-${member.slug}`}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(123,30,122,0.15)" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED }}>
          {member.name}
        </div>

        <h2 style={{ fontFamily: "'Zodiak', serif", fontSize: "1.15rem", lineHeight: 1.25, fontWeight: 400, letterSpacing: "-0.01em", margin: 0 }} data-testid={`text-member-name-${member.slug}`}>
          {(member.hero as HeroBlock).headlineLine1 || member.name}
          {(member.hero as HeroBlock).headlineLine2 && (
            <>
              {" "}
              <span style={{
                fontStyle: (member.hero as HeroBlock).headlineLine2Italic ? "italic" : "normal",
                color: (member.hero as HeroBlock).headlineLine2Italic ? "#FFAEDA" : "inherit",
              }}>
                {(member.hero as HeroBlock).headlineLine2}
              </span>
            </>
          )}
        </h2>

        {subtext && (
          <p style={{ fontSize: "0.8rem", lineHeight: 1.55, color: MUTED, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties} data-testid={`text-member-subtext-${member.slug}`}>
            {subtext}
          </p>
        )}

        <div style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
          <Link
            href={`/${member.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "'Switzer', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFAEDA",
              textDecoration: "none",
              gap: "0.3rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            data-testid={`link-view-portfolio-${member.slug}`}
          >
            View full portfolio →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
