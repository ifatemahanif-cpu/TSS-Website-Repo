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
        <footer className="bg-foreground text-background py-12 px-8 text-center">
           <h2 className="font-serif text-2xl mb-4">The Story Shapers</h2>
           <p className="opacity-50 text-sm">© 2026 The Story Shapers. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
