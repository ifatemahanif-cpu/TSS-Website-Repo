import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroShape from "@/assets/hero-shape.png";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform for the "Expansion" effect
  // As we scroll, the middle section expands to cover the screen
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Top Section - Fades out */}
        <motion.div 
          style={{ opacity, y: useTransform(scrollYProgress, [0, 0.5], [0, -200]) }}
          className="absolute top-0 w-full h-[33vh] flex items-center justify-center z-10"
        >
           <h1 className="text-4xl md:text-6xl font-serif italic text-primary/80">We're The</h1>
        </motion.div>

        {/* Middle Section - The "Expanding" Window */}
        <motion.div 
          className="relative z-20 w-full h-[33vh] flex items-center justify-center overflow-hidden"
        >
          {/* This circle expands to fill screen */}
          <motion.div 
            style={{ scale }}
            className="absolute inset-0 bg-primary origin-center rounded-full sm:rounded-none sm:w-full"
          />
          
          {/* Content inside the middle band */}
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }} className="relative z-30 flex flex-col items-center text-center">
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-primary-foreground tracking-tighter">
                Story Shapers.
             </h1>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Fades out */}
        <motion.div 
          style={{ opacity, y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
          className="absolute bottom-0 w-full h-[33vh] flex flex-col items-center justify-center z-10 px-4 text-center"
        >
          <p className="text-xl md:text-2xl text-foreground/80 font-sans max-w-2xl mb-8">
            But you can call us the best marketing decision you’ve made this year.
          </p>
          <button className="flex items-center gap-2 text-primary font-medium border-b border-primary/20 pb-1 hover:border-primary transition-colors">
            Talk to us <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* The "Reveal" Content that appears when expanded */}
        {/* This is actually PART of the next section visually, but we can transition into it */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
           {/* This overlay smooths the transition to the next solid color section */}
           <div className="w-full h-full bg-primary" />
        </motion.div>

      </div>
    </section>
  );
}
