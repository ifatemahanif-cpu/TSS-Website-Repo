import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#F4F4F0]">
      {/* 1. Subtle Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(#E0E0DE 1px, transparent 1px), linear-gradient(90deg, #E0E0DE 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* 2. Grain for Texture */}
      <div className="absolute inset-0 opacity-[0.3] mix-blend-multiply pointer-events-none">
         <div 
           className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
             backgroundSize: '200px 200px'
           }}
         />
      </div>
    </div>
  );
}