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
    <div style={{ backgroundColor: BG, color: "#FFFFFF", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }} data-testid="page-team">
      <Navbar />

      {/* HERO */}
      <section style={{ padding: "9rem 1.5rem 5rem", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED, marginBottom: "1.5rem" }}>
          The Collective
        </div>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Meet the team.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: MUTED, maxWidth: "560px", margin: "0 auto" }}>
          Three senior strategists. One shared belief: that the best brand work happens when strategy, content, and editorial thinking move together.
        </p>
      </section>

      {/* MEMBER CARDS */}
      <section style={{ padding: "0 1.5rem 7rem", maxWidth: "1200px", margin: "0 auto" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", color: MUTED, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", padding: "4rem 0" }}>
            LOADING…
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
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
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: "0.85rem", color: MUTED, marginBottom: "1.25rem" }}>
              Brand strategy. Content leadership. Editorial thinking.
            </p>
            <Link href="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }} data-testid="link-footer-home">
              ← Back to homepage
            </Link>
            <p style={{ marginTop: "2rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} The Story Shapers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MemberCard({ member, idx }: { member: PortfolioSummary; idx: number }) {
  const isEven = idx % 2 === 0;
  const portrait = (member.hero as HeroBlock).portrait;
  const subtext = (member.hero as HeroBlock).subtext;
  const tags = member.about?.tags || [];
  const stats = (member.stats?.items || []).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        display: "grid",
        gridTemplateColumns: portrait ? "1fr 1fr" : "1fr",
        gap: "3rem",
        alignItems: "start",
        backgroundColor: CARD,
        borderRadius: "20px",
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
        padding: "0",
      }}
      data-testid={`member-card-${member.slug}`}
    >
      {/* Photo — left on even, right on odd */}
      {portrait && (
        <div
          style={{
            order: isEven ? 0 : 1,
            aspectRatio: "3/4",
            overflow: "hidden",
            minHeight: "400px",
          }}
        >
          <img
            src={portrait}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            data-testid={`img-member-${member.slug}`}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          order: isEven ? 1 : 0,
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED }}>
          {(member.hero as HeroBlock).eyebrow || member.name}
        </div>

        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.15, fontWeight: 400, letterSpacing: "-0.01em", margin: 0 }} data-testid={`text-member-name-${member.slug}`}>
          {(member.hero as HeroBlock).headlineLine1 || member.name}
          {(member.hero as HeroBlock).headlineLine2 && (
            <>
              <br />
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
          <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: MUTED, maxWidth: "520px", margin: 0 }} data-testid={`text-member-subtext-${member.slug}`}>
            {subtext}
          </p>
        )}

        {stats.length > 0 && (
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", margin: "0.5rem 0" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: "0.75rem" }} data-testid={`stat-${member.slug}-${i}`}>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.3rem", fontWeight: 400, color: "#fff" }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: MUTED, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {tags.slice(0, 5).map((t, i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.4rem 0.7rem", borderRadius: "999px", border: `1px solid ${BORDER}`, color: MUTED }}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: "0.5rem" }}>
          <Link
            href={`/${member.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              backgroundColor: ACCENT,
              padding: "0.85rem 1.5rem",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT_HOVER)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT)}
            data-testid={`link-view-portfolio-${member.slug}`}
          >
            View full portfolio →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
