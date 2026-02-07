import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroShape from "@/assets/hero-shape.png";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center px-8 md:px-12 pt-24 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-900/40 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 max-w-[1400px] mx-auto w-full">
        
        {/* Left Content */}
        <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white mb-8 tracking-tight">
              We're The <br />
              <span className="text-primary-foreground/90">Story Shapers.</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/70 max-w-md leading-relaxed mb-10 font-light">
              But you can call us the best marketing decision you’ve made this year.
            </p>

            <button className="group w-fit flex items-center gap-3 text-white font-medium text-lg hover:gap-4 transition-all">
              <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                Talk to us
              </span>
              <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100" />
            </button>
          </motion.div>

          <div className="mt-24 md:mt-32">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-white/40">Established</span>
              <span className="text-sm text-white/80">2026 — Global</span>
            </div>
          </div>
        </div>

        {/* Center Visual */}
        <div className="lg:col-span-4 flex justify-center items-center relative h-[50vh] lg:h-[70vh] order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Spotlight effect behind object */}
            <div className="absolute w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <img 
              src={heroShape} 
              alt="Abstract Story Shape" 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
            />
            
            {/* Floating details to mimic the 'tech' feel of the reference */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-[20%] right-[10%] glass-panel px-3 py-1.5 rounded text-xs text-white/80 font-mono hidden md:block"
            >
              Creative_Flow.01
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content / Cards */}
        <div className="lg:col-span-4 flex flex-col justify-end h-full order-3 pb-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 overflow-hidden relative"
          >
             {/* Mimicking the 'Next' cards from reference */}
            <div className="w-full flex flex-col items-start gap-4">
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/40 text-sm">Latest Work</span>
                  <div className="h-[1px] w-12 bg-white/20" />
               </div>
               
               <div className="flex gap-4 w-full">
                  <div className="group relative aspect-[4/5] w-1/2 bg-black/20 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all rounded-lg overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-medium">Brand Identity</p>
                      <p className="text-white/50 text-xs mt-1">Lumina Tech</p>
                    </div>
                  </div>
                  
                  <div className="group relative aspect-[4/5] w-1/2 bg-black/20 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all rounded-lg overflow-hidden cursor-pointer opacity-50 hover:opacity-100">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/40 text-xs tracking-wider uppercase">View All</span>
                     </div>
                  </div>
               </div>
               
               <div className="mt-8">
                  <h3 className="text-white/90 text-sm font-medium">Strategic Narrative</h3>
                  <p className="text-white/50 text-xs mt-1 max-w-[200px]">Crafting compelling stories that drive market action.</p>
               </div>
            </div>
          </motion.div>
        </div>

      </div>
      
      {/* Decorative vertical lines to match grid feel */}
      <div className="absolute top-0 bottom-0 left-[33%] w-[1px] bg-white/5 hidden lg:block pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[33%] w-[1px] bg-white/5 hidden lg:block pointer-events-none" />
      
    </section>
  );
}
