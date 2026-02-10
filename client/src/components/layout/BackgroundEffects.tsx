import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#E8E8E8]">
      {/* 1. Ambient Aurora Blobs - Adjusted for Light Mode */}
      <div className="absolute inset-0 opacity-40">
        {/* Blob 1: Soft Blue-Grey */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-[#CBD5E1] rounded-full blur-[120px] mix-blend-multiply animate-aurora-1" />
        
        {/* Blob 2: Warm Grey/Beige */}
        <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-[#D6D3D1] rounded-full blur-[100px] mix-blend-multiply animate-aurora-2" />
        
        {/* Blob 3: Accent Orange - Subtle */}
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[#FFCCBC] rounded-full blur-[120px] mix-blend-multiply animate-aurora-3 opacity-30" />
      </div>

      {/* 2. Animated Film Grain Noise */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none">
         <div 
           className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
             backgroundSize: '200px 200px'
           }}
         />
      </div>

      {/* 3. Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient-vignette opacity-70" />
    </div>
  );
}