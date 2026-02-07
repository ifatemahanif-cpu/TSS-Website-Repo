import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, AlertCircle, Lightbulb, ArrowUpRight } from "lucide-react";

export function ProblemFraming() {
  const problems = [
    { title: "Decisions happen in bursts", desc: "Not systems. Random acts of marketing." },
    { title: "AI made output easier", desc: "It didn't make thinking clearer." },
    { title: "Silos Everywhere", desc: "Brand talks awareness. Growth talks acquisition." },
    { title: "Strategy in Decks", desc: "Lives in a PDF somewhere. Not in the work." },
  ];

  const caseStudies = [
    {
      brand: "Akutee",
      problem: "Production ready, no positioning",
      solution: "Built 'From Mine to Yours' positioning from scratch",
      result: "Became the spine for every decision"
    },
    {
      brand: "Art Fervour",
      problem: "Founder overload (70%)",
      solution: "Embedded Fractional Head of Marketing",
      result: "Reduced decision load to 25%"
    },
    {
      brand: "Headout",
      problem: "Scale creator collab from <50",
      solution: "Designed smarter systems, didn't just add hands",
      result: "Scaled to 1,000+ per quarter in 3 months"
    }
  ];

  return (
    <section className="relative py-24 px-8 md:px-12 bg-primary text-primary-foreground min-h-screen flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header - SIMPLIFIED since Hero transitions into this */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
          <div className="hidden lg:col-span-4 lg:flex flex-col sticky top-32">
             {/* Left side Anchor Content */}
             <div className="flex flex-col border-l border-white/20 pl-8 py-2">
                <span className="font-pixel text-6xl text-white/10 mb-4 select-none">02</span>
                <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/60">The Reality</span>
             </div>
          </div>
          
          <div className="lg:col-span-8 flex flex-col justify-end">
            <p className="text-xl md:text-3xl font-light opacity-90 leading-relaxed font-serif">
              <span className="block mb-8 text-primary-foreground/40 font-sans text-lg">
                More tools. More dashboards. More content.
              </span>
              The brands we meet aren't struggling because they're doing too little. <br/>
              <span className="text-white border-b border-white/20 italic mt-4 inline-block pb-1">
                They're struggling because they're doing too much — without knowing why.
              </span>
            </p>
          </div>
        </div>

        {/* The Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 border-t border-primary-foreground/10 pt-12">
           {problems.map((p, i) => (
             <div key={i} className="flex flex-col gap-4">
               <div className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 mb-2">
                 {i + 1}
               </div>
               <h3 className="text-xl font-medium">{p.title}</h3>
               <p className="opacity-70">{p.desc}</p>
             </div>
           ))}
        </div>

        {/* What We Do Differently */}
        <div className="bg-primary-foreground/5 rounded-2xl p-8 md:p-16 border border-primary-foreground/10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">We're marketing's missing middle.</h2>
            <p className="text-lg opacity-80">
              We fix the thinking before we fix the marketing. Most problems aren't execution problems. They're clarity problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-primary-foreground/10 p-8 rounded-xl hover:bg-primary-foreground/15 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-bold text-xl">{study.brand}</h4>
                  <ArrowUpRight className="opacity-50" />
                </div>
                <div className="space-y-4 text-sm opacity-90">
                  <div>
                    <span className="opacity-50 block text-xs uppercase tracking-wider mb-1">Challenge</span>
                    {study.problem}
                  </div>
                  <div>
                    <span className="opacity-50 block text-xs uppercase tracking-wider mb-1">Impact</span>
                    {study.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
