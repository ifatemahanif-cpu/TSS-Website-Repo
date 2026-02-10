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
      focus: ["Content Strategy", "Brand Narrative", "Founder Thought-Leadership"]
    },
    {
      name: "Aakanksha Singh Devi",
      role: "Brand Voice & Storytelling",
      desc: "Aakanksha brings narrative discipline and strategic sensitivity. She helps teams move from inconsistent messaging to coherent brand voices.",
      brands: ["Cadbury's", "Singapore Tourism Board", "LBB"],
      focus: ["Editorial Positioning", "Voice Definition", "Storytelling Systems"]
    }
  ];

  return (
    <section className="py-24 px-8 md:px-12 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-4xl mb-20">
          <span className="text-primary font-medium tracking-widest text-sm uppercase mb-4 block">The 3 Marketeers</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">
            The people you meet are the people doing the work.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We didn’t build The Story Shapers around personalities or job titles. 
            It’s a deliberately assembled group of senior marketing and brand leaders who have owned real decisions.
            <br/><br/>
            And the people who do the thinking are the people who stay accountable for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden rounded-lg">
                 {/* Placeholder for team image - in a real app would be real photos */}
                 <div className="w-full h-full bg-white/5 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-700">
                    [Photo: {member.name}]
                 </div>
              </div>
              
              <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-sm font-medium text-primary mb-4">{member.role}</p>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {member.desc}
              </p>

              <div className="space-y-4">
                <div>
                   <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">Decisions Led</span>
                   <div className="flex flex-wrap gap-2">
                     {member.focus.map((f, idx) => (
                       <span key={idx} className="text-xs border border-border px-2 py-1 rounded-full bg-white/50">{f}</span>
                     ))}
                   </div>
                </div>
                
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Brands</span>
                  <p className="text-xs text-muted-foreground">{member.brands.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
