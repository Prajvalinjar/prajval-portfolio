"use client";

import { motion } from "framer-motion";

export default function ChapterFooter() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-32 relative flex items-center justify-center w-full"
    >
      
      {/* Container */}
      <div className="relative flex items-center justify-between w-full max-w-2xl px-6 py-6 sm:px-8 sm:py-8 border border-white/5 bg-[#0a0a0a] rounded-2xl group overflow-hidden">
        
        {/* Subtle top inner border highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
        
        {/* Text */}
        <div className="flex flex-col gap-1 z-10 pr-8">
          <p className="text-sm sm:text-base text-secondary/80 leading-relaxed font-medium">
            The best way to know an engineer isn&apos;t by reading their resume.
          </p>
          <p className="text-sm sm:text-base text-secondary/60 leading-relaxed">
            It&apos;s by exploring the work.
          </p>
        </div>

        {/* CTA Button container */}
        <div className="relative z-10 flex items-center gap-4 shrink-0">
          <span className="text-xs font-mono tracking-widest text-accent uppercase hidden sm:block">
            Open Project Intelligence Center
          </span>
          
          <button className="w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent group-hover:translate-x-1 transition-transform duration-300">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

      </div>

      {/* Blueprint routing graphics (desktop only) */}
      <div className="hidden xl:block absolute right-[-80px] top-1/2 -translate-y-1/2 w-[80px] h-full pointer-events-none">
        {/* Connection line from button to right sidebar */}
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-white/10" />
        {/* A circle node on the path */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center bg-[#050505]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>

    </motion.div>
  );
}
