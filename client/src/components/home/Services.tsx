import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Services() {
  const services = [
    {
      id: "clarity",
      title: "Clarity & Direction",
      subtitle: "You've outgrown gut decisions.",
      items: ["Brand audit + competitive landscape", "Positioning & differentiation", "Messaging hierarchy", "GTM strategy + 90-day roadmap"]
    },
    {
      id: "website",
      title: "Website & Messaging",
      subtitle: "Traffic is fine. Conversions aren't.",
      items: ["Website structure + IA", "Homepage + service page copy", "Conversion-led messaging", "Landing page optimisation"]
    },
    {
      id: "content",
      title: "Content Systems",
      subtitle: "Consistency without burnout.",
      items: ["Content pillars + editorial strategy", "Calendar + distribution plan", "Templates + storytelling frameworks", "Repurposing system"]
    },
    {
      id: "discovery",
      title: "Discoverability (SEO)",
      subtitle: "Turn noise into signal.",
      items: ["SEO strategy", "Content opportunity mapping", "On-page optimisation", "Authority-building plan"]
    },
    {
      id: "fractional",
      title: "Fractional Leadership",
      subtitle: "Senior mind in the room.",
      items: ["Fractional CMO / advisory", "Quarterly planning", "Campaign reviews", "Team enablement"]
    },
     {
      id: "ai",
      title: "AI-Powered Solutions",
      subtitle: "Smarter systems, not more people.",
      items: ["Custom AI content assistants", "Automated reporting", "Research systems", "Workflow automation"]
    }
  ];

  return (
    <section id="services" className="py-32 px-8 md:px-12 bg-transparent text-primary-foreground border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-4 sticky top-32 h-fit">
           <div className="flex flex-col border-l border-white/20 pl-8 py-2 mb-12">
              <span className="font-pixel text-6xl text-white/10 mb-4 select-none">04</span>
              <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/60">How We Work</span>
           </div>

           <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">
             Interactive <br/> <span className="italic text-white/50">Discovery.</span>
           </h2>
           <p className="text-lg text-white/60 mb-12 font-light">
             We don't just deliver decks. We build systems that let your team keep running after we leave.
           </p>
           
           <div className="bg-white/5 p-8 border border-white/10 backdrop-blur-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <h3 className="font-serif text-xl mb-4 text-white relative z-10">Ready to start?</h3>
             <p className="text-white/60 mb-6 text-sm relative z-10">
               Let's fix the thinking before we fix the marketing.
             </p>
             <button className="w-full bg-white text-primary py-3 hover:bg-white/90 transition-colors font-medium relative z-10 font-mono text-xs uppercase tracking-widest">
               Book a Discovery Call
             </button>
           </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {services.map((service) => (
              <AccordionItem key={service.id} value={service.id} className="bg-white/5 border border-white/5 px-6 data-[state=open]:bg-white/10 data-[state=open]:border-white/20 transition-all duration-300">
                <AccordionTrigger className="hover:no-underline py-8 group">
                  <div className="flex flex-col items-start text-left gap-2">
                    <span className="text-2xl font-serif font-medium text-white group-hover:text-white/80 transition-colors">{service.title}</span>
                    <span className="text-sm text-white/40 font-mono uppercase tracking-wider">{service.subtitle}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-8 pl-4 border-l border-white/10 ml-1">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                          <div className="w-1 h-1 bg-white/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
