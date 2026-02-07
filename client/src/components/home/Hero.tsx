import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pixelHero from "@/assets/pixel-hero.png"; // New pixel art asset
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const centerScale = useTransform(scrollYProgress, [0, 0.4], [1, 5]); 
  const sideOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-primary text-primary-foreground selection:bg-white/30 selection:text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
        
        {/* Vertical Divider Lines */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto w-full">
           <div className="w-[1px] h-full bg-white/5" />
           <div className="w-[1px] h-full bg-white/5" />
           <div className="w-[1px] h-full bg-white/5 hidden lg:block" />
           <div className="w-[1px] h-full bg-white/5 hidden lg:block" />
        </div>

        {/* The 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full max-w-[1800px] mx-auto w-full relative z-10">
          
          {/* LEFT COLUMN */}
          <motion.div 
            style={{ opacity: sideOpacity }}
            className="lg:col-span-4 flex flex-col justify-center h-full order-2 lg:order-1 relative z-10 py-12"
          >
             <div className="mb-auto pt-12">
               <h1 className="font-serif font-medium text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-white mb-12 tracking-tight">
                 We're The <br />
                 <span className="italic text-white/90">Story Shapers.</span>
               </h1>
               
               <p className="font-sans text-xl text-white/60 max-w-md leading-relaxed mb-16 font-light">
                 But you can call us the best marketing decision you’ve made this year.
               </p>

               <button className="group flex items-center gap-4 text-white text-lg transition-all">
                 <span className="border-b border-white/40 pb-1 group-hover:border-white transition-colors font-mono tracking-wide text-sm uppercase">
                   Talk to us
                 </span>
                 <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
               </button>
             </div>
             
             <div className="mt-auto pb-4">
                <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Est. 2026</span>
             </div>
          </motion.div>

          {/* CENTER COLUMN - Pixel Art */}
          <div className="lg:col-span-4 h-full relative flex items-center justify-center order-1 lg:order-2 z-20 pointer-events-none">
             <motion.div 
               style={{ scale: centerScale }}
               className="relative w-full aspect-square flex items-center justify-center p-8"
             >
                {/* Glow */}
                <div className="absolute w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                
                {/* Pixel Art Image */}
                <img 
                  src={pixelHero} 
                  alt="Abstract Pixel Sculpture" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  style={{ 
                    filter: "drop-shadow(0 0 40px rgba(100,50,200,0.1))",
                    imageRendering: "pixelated" // Enforce crisp edges
                  }}
                />
             </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div 
            style={{ opacity: sideOpacity }}
            className="lg:col-span-4 flex flex-col justify-end h-full order-3 relative z-10 py-12 pl-8"
          >
             <div className="h-full flex flex-col justify-end">
                <div className="flex flex-col gap-8">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-white/40 text-xs tracking-wider uppercase">Latest Work</span>
                      <div className="h-[1px] w-8 bg-white/20" />
                   </div>
                   
                   {/* Simplified single card for cleaner look */}
                   <div className="w-full aspect-[4/5] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 right-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>

                      <div className="absolute bottom-6 left-6">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-2">Case Study 01</span>
                          <span className="font-serif text-2xl text-white group-hover:underline decoration-white/30 underline-offset-4">Lumina Tech</span>
                      </div>
                   </div>
                   
                   <div className="mt-4 border-l border-white/10 pl-4">
                      <p className="font-mono text-white/40 text-[10px] max-w-[200px] leading-relaxed">
                        // STRATEGIC NARRATIVE<br/>
                        Crafting compelling stories that drive market action.
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>
        
        </div>

        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-primary z-0 pointer-events-none"
        />

      </div>
    </section>
  );
}
