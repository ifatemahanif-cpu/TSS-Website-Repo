import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProblemFraming } from "@/components/home/ProblemFraming";
import { Team } from "@/components/home/Team";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemFraming />
        <Team />
        <Services />
        <footer className="bg-primary text-white border-t border-white/10 py-12 px-8 text-center">
           <h2 className="font-serif text-2xl mb-4">The Story Shapers</h2>
           <p className="opacity-40 text-xs font-mono tracking-widest uppercase">© 2026 The Story Shapers. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
