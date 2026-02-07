import { motion } from "framer-motion";

export function Team() {
  const team = [
    {
      name: "Fatema Hanif",
      role: "Strategic Vision & Operations",
      desc: "Fatema brings the rare combination of strategic vision and hands-on operational judgment. She has built and scaled marketing functions across markets.",
      brands: ["Headout", "Coca-Cola", "Disney Broadway"],
      focus: ["Brand Positioning", "GTM Strategy", "Creator Programs"]
    },
    {
      name: "Shaili Contractor",
      role: "Content & Narrative Strategy",
      desc: "Shaili brings senior judgment to content and narrative; the kind that stops brands from saying clever things that don’t actually matter.",
      brands: ["Google Pixel", "Heinz", "FirstCry India"],
      focus: ["Content Strategy", "Brand Narrative", "Thought Leadership"]
    },
    {
      name: "Aakanksha Singh Devi",
      role: "Brand Voice & Storytelling",
      desc: "Aakanksha brings narrative discipline and strategic sensitivity. She helps teams move from inconsistent messaging to coherent brand voices.",
      brands: ["Cadbury's", "Singapore Tourism Board", "LBB"],
      focus: ["Editorial Positioning", "Voice Definition", "Storytelling"]
    }
  ];

  return (
    <section className="py-32 px-8 md:px-12 bg-primary text-primary-foreground border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4 sticky top-32 h-fit">
             <div className="flex flex-col border-l border-white/20 pl-8 py-2">
                <span className="font-pixel text-6xl text-white/10 mb-4 select-none">03</span>
                <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/60">The Collective</span>
             </div>
          </div>
          
          <div className="lg:col-span-8">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white leading-tight">
              The people you meet are the <span className="italic text-white/50">people doing the work.</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-light max-w-2xl">
              We didn’t build The Story Shapers around personalities or job titles. 
              It’s a deliberately assembled group of senior marketing and brand leaders who have owned real decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              <div className="aspect-[3/4] bg-white/5 mb-8 border border-white/10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
                 {/* Placeholder for team image */}
                 <div className="w-full h-full flex flex-col items-center justify-center text-white/20 font-mono text-xs uppercase tracking-widest">
                    [Photo]
                    <span className="mt-2 text-white/40 font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">{member.name}</span>
                 </div>
              </div>
              
              <h3 className="text-2xl font-serif mb-2 text-white">{member.name}</h3>
              <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-6">{member.role}</p>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4">
                {member.desc}
              </p>

              <div className="space-y-6">
                <div>
                   <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-3">Decisions Led</span>
                   <div className="flex flex-wrap gap-2">
                     {member.focus.map((f, idx) => (
                       <span key={idx} className="text-[10px] border border-white/10 px-2 py-1 bg-white/5 text-white/70">{f}</span>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
