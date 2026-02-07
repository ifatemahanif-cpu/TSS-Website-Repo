import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import pixelHero from "@/assets/pixel-hero.png"; 
import { ArrowRight, ChevronRight, ArrowDown } from "lucide-react";

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

  // FIXED: Even faster transition (snappier)
  // Max scale reduced to 3 so it doesn't look "too big"
  const centerScale = useTransform(scrollYProgress, [0, 0.5], [1, 3]); 
  
  // PARALLAX EFFECTS:
  const gridScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.1, 0]);
  
  // Side columns move AWAY vertically while fading
  const leftY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const rightY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Overlay kicks in very early to smooth the boundary
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  return (
    // FIXED: Reduced height to 125vh - Minimal scroll distance required now
    <section ref={containerRef} className="relative h-[125vh] bg-primary text-primary-foreground selection:bg-white/30 selection:text-white">
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
            style={{ opacity: sideOpacity, y: leftY }}
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

          {/* CENTER COLUMN - Section 2 Preview */}
          <div className="lg:col-span-4 h-full relative flex items-center justify-center order-1 lg:order-2 z-20 pointer-events-none">
             <motion.div 
               style={{ scale: centerScale }}
               className="relative w-full aspect-square flex items-center justify-center p-8"
             >
                {/* Glow */}
                <div className="absolute w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                
                {/* Section 2 Snapshot Card */}
                <div className="relative z-10 w-full h-full bg-[#231123] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl rounded-sm hover:border-white/20 transition-colors group">
                  {/* Decorative Grid Background - PARALLAX SCALING */}
                  <motion.div 
                       className="absolute inset-0" 
                       style={{ 
                         opacity: gridOpacity,
                         scale: gridScale,
                         backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', 
                         backgroundSize: '20px 20px',
                         transformOrigin: 'center center'
                       }} 
                  />
                  
                  {/* Card Header */}
                  <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
                     <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-red-500/50 transition-colors" />
                       <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-yellow-500/50 transition-colors" />
                     </div>
                     <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/40">02 // The Reality</span>
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 mt-4 flex-1 flex flex-col justify-center items-center text-center w-full">
                     <h3 className="w-full text-white leading-tight mb-6">
                       <span className="font-serif italic opacity-70 block mb-2 text-lg md:text-xl">Marketing has never been</span>
                       {/* Adjusted font sizes to prevent clipping */}
                       <span className="font-pixel text-white block text-2xl md:text-4xl lg:text-5xl tracking-tight mt-2 break-words w-full px-2">
                         LOUDER
                       </span>
                     </h3>
                     <div className="space-y-3 opacity-30 w-full max-w-[200px] mx-auto">
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent rounded" />
                        <div className="h-1 w-3/4 bg-gradient-to-r from-transparent via-white to-transparent rounded mx-auto" />
                     </div>
                  </div>

                  {/* Card Footer / Visual Data */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                      <div className="flex gap-1 items-end h-12 opacity-60">
                         <div className="w-2 bg-white/20 h-[40%]" />
                         <div className="w-2 bg-white/40 h-[60%]" />
                         <div className="w-2 bg-white/20 h-[30%]" />
                         <div className="w-2 bg-white/80 h-[100%] animate-pulse" />
                         <div className="w-2 bg-white/30 h-[50%]" />
                         <div className="w-2 bg-white/50 h-[70%]" />
                      </div>
                      <div className="text-right">
                        <span className="block font-pixel text-[8px] text-white/30 mb-1">SIGNAL_TO_NOISE</span>
                        <span className="block font-mono text-xs text-red-400">CRITICAL</span>
                      </div>
                  </div>
                </div>
             </motion.div>

             {/* Scroll Indicator */}
             <motion.div 
               style={{ opacity: sideOpacity }}
               className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
             >
                <span className="font-pixel text-[8px] uppercase tracking-widest text-white/30">SCROLL</span>
                <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
             </motion.div>
          </div>

          {/* RIGHT COLUMN - Stacked Carousel */}
          <motion.div 
            style={{ opacity: sideOpacity, y: rightY }}
            className="lg:col-span-4 flex flex-col justify-end h-full order-3 relative z-10 py-12 pl-8"
          >
             <div className="h-full flex flex-col justify-end">
                <div className="flex flex-col gap-8 w-full max-w-sm ml-auto">
                   <div className="flex items-center gap-3 mb-2 justify-end">
                      <span className="font-mono text-white/40 text-xs tracking-wider uppercase">Latest Work</span>
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
                             className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl origin-bottom"
                             onClick={handleNext}
                           >
                              {/* Overlay to darken background cards */}
                              {diff > 0 && <div className="absolute inset-0 bg-primary/40 z-20 transition-all" />}
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-0" />
                              
                              <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${study.color}`} />
                              </div>

                              <div className="absolute bottom-6 left-6 pr-4 z-10">
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
