"use client";

import { motion } from "framer-motion";

export default function CaseFileFooter() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="w-full flex flex-col items-center justify-center gap-12 mt-12 mb-24"
    >
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="w-2 h-2 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-accent/50" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      <div className="flex flex-col items-center text-center gap-8">
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-widest uppercase opacity-80">
          Engineering Archive #001 Closed
        </h2>
        <p className="text-[10px] font-mono tracking-widest text-secondary/50 max-w-sm uppercase leading-loose">
          Every engineering project is another step toward building better software.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 group relative flex items-center gap-6 px-8 py-4 rounded-full border border-white/10 bg-[#050505] hover:border-accent/50 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
        >
          {/* Animated glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          
          <div className="flex flex-col items-start relative z-10">
            <span className="text-[9px] font-mono tracking-widest text-secondary/50 uppercase group-hover:text-accent transition-colors">Open Archive #002</span>
            <span className="text-lg font-bold text-white tracking-wide">TransitOps</span>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center relative z-10 group-hover:bg-accent group-hover:border-accent transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#050505] transition-colors">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </motion.button>
      </div>

    </motion.div>
  );
}
