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
    <section className="relative py-24 px-8 md:px-12 bg-transparent text-primary-foreground min-h-screen flex flex-col justify-center">
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

        {/* What We Do Differently - Redesigned to match dark/pixel theme */}
        <div className="relative border border-white/10 bg-[#2A152A] p-8 md:p-16 overflow-hidden group">
          {/* Pixel corners decoration */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />

          <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
            <span className="font-pixel text-[10px] text-primary-foreground/40 uppercase tracking-widest mb-4 block">Our Approach</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">We're marketing's <span className="italic text-white/60">missing middle.</span></h2>
            <p className="text-lg opacity-70 font-sans max-w-xl mx-auto">
              We fix the thinking before we fix the marketing. Most problems aren't execution problems. They're clarity problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {caseStudies.map((study, i) => (
              <div key={i} className="group/card bg-white/5 border border-white/5 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-serif font-bold text-xl text-white">{study.brand}</h4>
                  <ArrowUpRight className="opacity-30 group-hover/card:opacity-100 transition-opacity w-5 h-5" />
                </div>
                <div className="space-y-6 text-sm opacity-90">
                  <div>
                    <span className="opacity-40 block font-mono text-[10px] uppercase tracking-widest mb-2 text-white">Challenge</span>
                    <p className="font-light text-white/80">{study.problem}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <span className="opacity-40 block font-mono text-[10px] uppercase tracking-widest mb-2 text-white">Impact</span>
                    <p className="font-medium text-white">{study.result}</p>
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
