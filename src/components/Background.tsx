"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ultra subtle blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Faint scan lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none mix-blend-overlay" />
      
      {/* Distant cyan pulse */}
      <motion.div 
        animate={{ opacity: [0, 0.1, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] opacity-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />

      {/* Tiny animated engineering coordinates */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 text-[10px] font-mono text-secondary/30 tracking-widest opacity-50">
        <span>SYS.ENV: <span className="text-secondary/50">PRD-X9</span></span>
        <span>LAT: <span className="text-secondary/50">40.7128 N</span></span>
        <span>LNG: <span className="text-secondary/50">74.0060 W</span></span>
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1 text-[10px] font-mono text-secondary/30 tracking-widest opacity-50">
        <span>FRAME: <span className="text-secondary/50">60.0FPS</span></span>
        <span>RENDER: <span className="text-secondary/50">ACTIVE</span></span>
      </div>
      
      {/* Slow moving dust particles via CSS animation in globals.css */}
      <div className="absolute inset-0 opacity-20 dust-particles" />
      
      {/* Soft Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80 pointer-events-none" />
    </div>
  );
}
