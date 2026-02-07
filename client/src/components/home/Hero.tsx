import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroShape from "@/assets/hero-shape.png";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // EXPANSION LOGIC:
  // The center column will scale up to cover the other columns
  const centerScale = useTransform(scrollYProgress, [0, 0.4], [1, 5]); 
  // Fading out the side columns so they don't clip weirdly during expansion
  const sideOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // Moving the center column content down/up if needed, or keeping it centered
  const centerY = useTransform(scrollYProgress, [0, 0.5], [0, 0]);
  
  // Controls the "Curtain" overlay opacity for smooth transition to next section
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12">
        
        {/* The 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-[1600px] mx-auto w-full relative z-10">
          
          {/* LEFT COLUMN (Text) - Fades out on scroll */}
          <motion.div 
            style={{ opacity: sideOpacity }}
            className="lg:col-span-4 flex flex-col justify-center h-full order-2 lg:order-1 relative z-10"
          >
             <div className="mb-12">
               <h1 className="font-serif font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-foreground mb-8 tracking-tight">
                 We're The <br />
                 <span className="text-primary italic">Story Shapers.</span>
               </h1>
               
               <p className="font-sans text-lg text-muted-foreground max-w-md leading-relaxed mb-10 font-light">
                 But you can call us the best marketing decision you’ve made this year.
               </p>

               <button className="group w-fit flex items-center gap-3 text-foreground font-medium text-lg hover:gap-4 transition-all">
                 <span className="border-b border-foreground/30 pb-1 group-hover:border-primary transition-colors">
                   Talk to us
                 </span>
                 <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-primary" />
               </button>
             </div>
             
             <div className="mt-auto">
                <span className="text-xs uppercase tracking-widest text-muted-foreground/60">Established 2026</span>
             </div>
          </motion.div>

          {/* CENTER COLUMN (Image) - EXPANDS on scroll */}
          <div className="lg:col-span-4 h-full relative flex items-center justify-center order-1 lg:order-2 z-20 pointer-events-none">
             {/* The Expandable Wrapper */}
             <motion.div 
               style={{ scale: centerScale }}
               className="relative w-full aspect-[3/4] md:aspect-square flex items-center justify-center"
             >
                {/* Spotlight/Glow */}
                <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                
                {/* 3D Shape Image */}
                <img 
                  src={heroShape} 
                  alt="Story Shapers Abstract" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
                />
             </motion.div>
          </div>

          {/* RIGHT COLUMN (Cards/Nav) - Fades out on scroll */}
          <motion.div 
            style={{ opacity: sideOpacity }}
            className="lg:col-span-4 flex flex-col justify-end h-full order-3 relative z-10"
          >
             {/* "Click to go to 3rd section" Button area as requested */}
             <div className="h-full flex flex-col justify-between py-12">
                <div className="flex justify-end">
                   <a href="#services" className="px-6 py-3 border border-border rounded hover:bg-foreground hover:text-background transition-colors text-sm font-medium">
                      Jump to Services
                   </a>
                </div>

                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="text-muted-foreground text-sm">Latest Work</span>
                      <div className="h-[1px] w-12 bg-border" />
                   </div>
                   
                   <div className="flex gap-4 w-full">
                      <div className="aspect-[4/5] w-1/2 bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm rounded-lg p-4 flex flex-col justify-end">
                          <span className="text-xs font-medium uppercase tracking-wider opacity-50">Case Study</span>
                          <span className="text-sm font-serif">Lumina Tech</span>
                      </div>
                      <div className="aspect-[4/5] w-1/2 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-xs opacity-50">View All</span>
                      </div>
                   </div>
                   
                   <div className="mt-4">
                      <p className="text-muted-foreground text-xs max-w-[200px]">
                        Crafting compelling stories that drive market action.
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>
        
        </div>

        {/* Transition Overlay - Matches the next section's background color */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-primary z-0 pointer-events-none"
        />

      </div>
    </section>
  );
}
