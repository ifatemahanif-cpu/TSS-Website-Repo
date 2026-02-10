import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

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
    <section className="py-24 px-8 md:px-12 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-5">
           <div className="sticky top-32">
             <span className="text-secondary font-medium tracking-widest text-sm uppercase mb-4 block">How We Work</span>
             <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">
               Interactive Discovery.
             </h2>
             <p className="text-lg text-muted-foreground mb-12">
               We don't just deliver decks. We build systems that let your team keep running after we leave.
             </p>
             
             <div className="bg-card/5 p-8 rounded-xl shadow-sm border border-border/20 backdrop-blur-sm">
               <h3 className="font-serif text-xl mb-4 text-foreground">Ready to start?</h3>
               <p className="text-muted-foreground mb-6 text-sm">
                 Let's fix the thinking before we fix the marketing.
               </p>
               <button className="w-full bg-secondary text-secondary-foreground py-3 rounded hover:bg-secondary/80 transition-colors font-medium">
                 Book a Discovery Call
               </button>
             </div>
           </div>
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {services.map((service) => (
              <AccordionItem key={service.id} value={service.id} className="bg-card/5 border-none rounded-lg px-6 shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-secondary/50">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex flex-col items-start text-left gap-1">
                    <span className="text-xl font-serif font-medium text-foreground">{service.title}</span>
                    <span className="text-sm text-muted-foreground font-normal">{service.subtitle}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-6 pl-4 border-l-2 border-secondary/20 ml-2">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
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
