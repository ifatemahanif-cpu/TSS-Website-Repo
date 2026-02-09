import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import pixelHero from "@/assets/pixel-hero.png"; 
import gradientEmerald from "@/assets/gradient-emerald.png";
import gradientPurple from "@/assets/gradient-purple.png";
import gradientWarm from "@/assets/gradient-warm.png";
import { ArrowRight, ChevronRight, ArrowDown } from "lucide-react";

const caseStudies = [
  {
    id: "01",
    client: "Lumina Tech",
    category: "Strategic Narrative",
    desc: "Crafting compelling stories that drive market action.",
    color: "bg-emerald-500",
    image: gradientEmerald
  },
  {
    id: "02",
    client: "Velvet Space", 
    category: "Brand Identity",
    desc: "Redefining luxury for the digital-first generation.",
    color: "bg-purple-500",
    image: gradientPurple
  },
  {
    id: "03",
    client: "Apex Growth",
    category: "GTM Strategy", 
    desc: "From zero to market leader in 90 days.",
    color: "bg-orange-500",
    image: gradientWarm
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

  // Simplified animations since we removed the central element
  // Just keeping some subtle parallax
  const leftY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const rightY = useTransform(scrollYProgress, [0, 0.4], [0, 50]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  return (
    <section ref={containerRef} className="relative h-[125vh] bg-transparent text-primary-foreground selection:bg-white/30 selection:text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12">
        
        {/* The 2-Column Grid - Simplified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full max-w-[1800px] mx-auto w-full relative z-10">
          
          {/* LEFT COLUMN - Header (Expanded to 8 cols) */}
          <motion.div 
            style={{ opacity: sideOpacity, y: leftY }}
            className="lg:col-span-8 flex flex-col justify-center h-full order-2 lg:order-1 relative z-10 py-12"
          >
             <div className="mb-auto pt-24">
               <h1 className="text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] text-white mb-16 tracking-tight">
                 <span className="font-serif italic block text-4xl md:text-5xl mb-6 opacity-80">We're</span>
                 <span className="font-pixel text-white block">THE STORY</span>
                 <span className="font-pixel text-white block text-stroke-0 opacity-80">SHAPERS.</span>
               </h1>
               
               <p className="font-sans text-2xl text-white/60 max-w-2xl leading-relaxed mb-20 font-light border-l-2 border-white/20 pl-8">
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

          {/* RIGHT COLUMN - Stacked Carousel (4 cols) */}
          <motion.div 
            style={{ opacity: sideOpacity, y: rightY }}
            className="lg:col-span-4 flex flex-col justify-end h-full order-3 relative z-10 py-12 pl-8"
          >
             <div className="h-full flex flex-col justify-end">
                <div className="flex flex-col gap-8 w-full max-w-sm ml-auto">
                   {/* Simplified Header - Removed "Latest Work" text for decluttering */}
                   <div className="flex items-center gap-3 mb-2 justify-end opacity-0">
                      <div className="h-[1px] w-8 bg-white/20" />
                   </div>
                   
                   {/* Stacked Cards Container */}
                   <div className="relative w-full aspect-[4/5] perspective-1000">
                     <AnimatePresence initial={false} mode="popLayout">
                       {caseStudies.map((study, index) => {
                         // Only render current and next 2 cards to simulate stack
                         const diff = (index - activeIndex + caseStudies.length) % caseStudies.length;
                         if (diff > 2) return null;

                         return (
                           <motion.div
                             key={study.id}
                             layoutId={study.id}
                             initial={{ scale: 0.9, opacity: 0, y: 40 }}
                             animate={{ 
                               scale: 1 - diff * 0.1,  // More exaggerated scale difference
                               opacity: 1 - diff * 0.4,
                               y: diff * 25,           // More visible offset
                               zIndex: 10 - diff,
                               rotateX: diff * -5      // Slight 3D rotation
                             }}
                             exit={{ opacity: 0, scale: 0.9, y: -40 }}
                             transition={{ duration: 0.5, ease: "easeInOut" }}
                             className="absolute inset-0 w-full h-full bg-[#152020] border border-white/10 rounded-xl overflow-hidden shadow-2xl origin-bottom"
                             onClick={handleNext}
                           >
                              {/* Gradient Image Background */}
                              <div className="absolute inset-0 z-0">
                                <img 
                                  src={study.image} 
                                  alt="" 
                                  className="w-full h-full object-cover opacity-80 scale-110"
                                />
                                {/* Grain Overlay */}
                                <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
                              </div>

                              {/* Overlay to darken background cards - Adjusted for images */}
                              {diff > 0 && <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] z-20 transition-all duration-500" />}
                              
                              {/* Text Readability Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-10" />
                              
                              <div className="absolute top-4 right-4 flex gap-2 z-20">
                                <div className="w-2 h-2 rounded-full bg-white/40 backdrop-blur-sm" />
                              </div>

                              <div className="absolute bottom-6 left-6 pr-4 z-20">
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
                   
                   {/* Navigation Controls */}
                   <div className="flex justify-between items-center mt-2 px-2">
                      <div className="flex gap-2">
                          {caseStudies.map((_, idx) => (
                            <div 
                              key={idx}
                              className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                            />
                          ))}
                      </div>
                      
                      <button 
                        onClick={handleNext}
                        className="p-2 rounded-full border border-white/20 hover:bg-white hover:text-primary transition-all group"
                        aria-label="Next case study"
                      >
                         <ChevronRight className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                      </button>
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