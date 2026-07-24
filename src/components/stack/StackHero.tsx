"use client";

import { motion } from "framer-motion";

export default function StackHero() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative">
      
      {/* Left side: Chapter Title & Description */}
      <div className="flex flex-col gap-3 w-full md:w-[65%] z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
              CHAPTER 04 //////////
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white uppercase tracking-wider">
            TECH <span className="text-accent">ECOSYSTEM</span>
          </h2>

          <p className="text-secondary/80 text-xs md:text-sm max-w-lg mt-1 leading-relaxed">
            A curated set of technologies, frameworks and tools I use to build digital products and solve real world problems.
          </p>
        </motion.div>
      </div>

      {/* Right side: Blueprint Explore Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full md:w-auto shrink-0"
      >
        <div className="p-4 rounded-xl border border-white/10 bg-[#070914]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden min-w-[180px]">
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <div className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-secondary/60 uppercase">
            <span>EXPLORE.</span>
            <span>LEARN.</span>
            <span>BUILD.</span>
            <span>REPEAT.</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
