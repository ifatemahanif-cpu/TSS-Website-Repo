import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProblemFraming } from "@/components/home/ProblemFraming";
import { Team } from "@/components/home/Team";
import { Work } from "@/components/home/Work";
import { Services } from "@/components/home/Services";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

/**
 * THE HOMEPAGE, AS A SCORE.
 *
 * Six acts in order, and the order is the argument:
 *
 *   the Shaping   a sentence cuts itself down to what it means
 *   the turn      the belief underneath the work, on near-black
 *   the peak      the three people, on the only light ground
 *   the work      five cases, panned sideways, with the proof in them
 *   what we do    the offer, as three stages and eighteen things
 *   the close     the page stops moving and starts responding
 *
 * Every one of them is an <Act> and publishes its own ground so the fixed nav
 * can pick its ink. Nothing here decides anything; the acts do.
 */
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
        <Footer />
      </main>
    </div>
  );
}
