import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProblemFraming } from "@/components/home/ProblemFraming";
import { Team } from "@/components/home/Team";
import { Work } from "@/components/home/Work";
import { Services } from "@/components/home/Services";
import { CTA } from "@/components/home/CTA";
import logoImg from "@assets/FullLogo_Transparent_NoBuffer_1772265926648.png";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0C0A3E" }} className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemFraming />
        {/* Origin — "What changes when we show up" — is gone, Fatema's call on
            25 Aug. It described the work rather than showing it, and it is the
            same species as every other explanatory section she cut off the
            study: the second fold, both standfirsts, the hand-off line. The
            case rail does that job now, with evidence. Origin.tsx is left in
            the tree rather than deleted until the rework merges. */}
        <Team />
        <Work />
        <Services />
        <CTA />
        <footer
          className="relative overflow-hidden"
          style={{
            backgroundColor: "#0C0A3E",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "3rem 2rem",
            textAlign: "center",
            color: "#FFFFFF",
          }}
          data-testid="footer"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-[1]">
            <img
              src={logoImg}
              alt="The Story Shapers"
              style={{
                height: "32px",
                width: "auto",
                filter: "invert(1) brightness(2)",
                marginBottom: "1rem",
                display: "inline-block",
              }}
              data-testid="img-footer-logo"
            />
            <a
              href="mailto:hello@storyshaperscollective.com"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                display: "block",
                marginBottom: "1.5rem",
              }}
              data-testid="link-footer-email"
            >
              hello@storyshaperscollective.com
            </a>
            <p
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "0.75rem",
                opacity: 0.4,
              }}
            >
              © 2026 The Story Shapers. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
