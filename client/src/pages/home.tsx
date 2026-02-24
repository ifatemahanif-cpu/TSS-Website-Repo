import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProblemFraming } from "@/components/home/ProblemFraming";
import { Work } from "@/components/home/Work";
import { Team } from "@/components/home/Team";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0C0A3E" }} className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemFraming />
        <Work />
        <Team />
        <Services />
        <footer className="bg-background text-foreground py-12 px-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
           <h2 className="font-serif text-2xl mb-4">The Story Shapers</h2>
           <p className="opacity-50 text-sm">© 2026 The Story Shapers. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
