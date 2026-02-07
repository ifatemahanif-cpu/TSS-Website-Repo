import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import pixelHero from "@/assets/pixel-hero.png"; 
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "01",
    client: "Lumina Tech",
    category: "Strategic Narrative",
    desc: "Crafting compelling stories that drive market action.",
    color: "bg-emerald-500"
  },
  {
    id: "02",
    client: "Velvet Space", 
    category: "Brand Identity",
    desc: "Redefining luxury for the digital-first generation.",
    color: "bg-purple-500"
  },
  {
    id: "03",
    client: "Apex Growth",
    category: "GTM Strategy", 
    desc: "From zero to market leader in 90 days.",
    color: "bg-orange-500"
  }
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const centerScale = useTransform(scrollYProgress, [0, 0.4], [1, 5]); 
  const sideOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

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
               <h1 className="text-4xl md:text-5xl lg:text-5xl leading-[1.4] text-white mb-12 tracking-tight">
                 <span className="font-serif italic block text-3xl md:text-4xl mb-4 opacity-80">We're</span>
                 <span className="font-pixel text-white block leading-normal mt-2 text-2xl md:text-3xl lg:text-4xl">THE STORY<br/>SHAPERS.</span>
               </h1>
               
               <p className="font-sans text-xl text-white/60 max-w-md leading-relaxed mb-16 font-light">
                 But you can call us the best marketing decision you’ve made this year.
               </p>

               <button className="group flex items-center gap-4 text-white text-lg transition-all">
                 <span className="border-b border-white/40 pb-1 group-hover:border-white transition-colors font-pixel text-xs uppercase tracking-wide">
                   Talk to us
                 </span>
                 <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
               </button>
             </div>
             
             <div className="mt-auto pb-4">
                <span className="font-pixel text-[10px] text-white/30 tracking-widest uppercase">Est. 2026</span>
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

          {/* RIGHT COLUMN - Stacked Carousel */}
          <motion.div 
            style={{ opacity: sideOpacity }}
            className="lg:col-span-4 flex flex-col justify-end h-full order-3 relative z-10 py-12 pl-8"
          >
             <div className="h-full flex flex-col justify-end">
                <div className="flex flex-col gap-8 w-full max-w-sm ml-auto">
                   <div className="flex items-center gap-3 mb-2 justify-end">
                      <span className="font-mono text-white/40 text-xs tracking-wider uppercase">Latest Work</span>
                      <div className="h-[1px] w-8 bg-white/20" />
                   </div>
                   
                   {/* Stacked Cards Container */}
                   <div 
                      className="relative w-full aspect-[4/5] cursor-pointer"
                      onClick={handleNext}
                   >
                     <AnimatePresence initial={false} mode="popLayout">
                       {caseStudies.map((study, index) => {
                         // Only render current and next 2 cards to simulate stack
                         const diff = (index - activeIndex + caseStudies.length) % caseStudies.length;
                         if (diff > 2) return null;

                         return (
                           <motion.div
                             key={study.id}
                             layoutId={study.id}
                             initial={{ scale: 0.9, opacity: 0, y: 20 }}
                             animate={{ 
                               scale: 1 - diff * 0.05, 
                               opacity: 1 - diff * 0.3,
                               y: diff * 15,
                               zIndex: 10 - diff
                             }}
                             exit={{ opacity: 0, scale: 0.95, y: -20 }}
                             transition={{ duration: 0.4, ease: "easeOut" }}
                             className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden group shadow-2xl"
                             style={{
                               transformOrigin: "bottom center"
                             }}
                           >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                              
                              <div className="absolute top-4 right-4 flex gap-2">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${study.color}`} />
                              </div>

                              <div className="absolute bottom-6 left-6 pr-4">
                                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/60 mb-2">
                                    Case Study {study.id}
                                  </span>
                                  <span className="block font-serif text-2xl text-white mb-2 leading-none">
                                    {study.client}
                                  </span>
                                  <p className="font-mono text-white/40 text-[10px] leading-relaxed line-clamp-2">
                                    // {study.category}<br/>
                                    {study.desc}
                                  </p>
                              </div>
                           </motion.div>
                         );
                       })}
                     </AnimatePresence>
                   </div>
                   
                   <div className="flex justify-end gap-2 mt-2">
                      {caseStudies.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                        />
                      ))}
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
