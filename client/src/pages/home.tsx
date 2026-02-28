import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProblemFraming } from "@/components/home/ProblemFraming";
import { Origin } from "@/components/home/Origin";
import { Team } from "@/components/home/Team";
import { Services } from "@/components/home/Services";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0C0A3E" }} className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemFraming />
        <Origin />
        <Team />
        <Services />
        <CTA />
        <footer
          style={{
            backgroundColor: "#0C0A3E",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "3rem 2rem",
            textAlign: "center",
            color: "#FFFFFF",
          }}
          data-testid="footer"
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.25rem",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            The Story Shapers
          </h2>
          <a
            href="mailto:hello@storyshaperscollective.com"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              opacity: 0.3,
            }}
          >
            © 2026 The Story Shapers. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
