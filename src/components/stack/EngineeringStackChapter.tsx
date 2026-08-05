"use client";

import { motion } from "framer-motion";
import StackHero from "./StackHero";
import TechnologyGrid from "./TechnologyGrid";
import StackSidebar from "./StackSidebar";
import { useState } from "react";

export default function EngineeringStackChapter() {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-0 lg:min-h-screen bg-transparent text-white py-8 lg:py-32 overflow-hidden lg:border-t lg:border-white/5">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="w-full h-full bg-grid-pattern" />
      </div>

      {/* Mobile Ambient HUD Pulse Node (1 blue beacon, mobile only) */}
      <div className="absolute top-12 right-6 z-0 pointer-events-none sm:hidden flex items-center justify-center w-5 h-5" aria-hidden="true">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_5px_rgba(56,189,248,0.7)]" />
        <div className="absolute inset-0 rounded-full border border-[#38BDF8]/40 hud-pulse-ring" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4 sm:px-0">
        
        {/* Center Content */}
        <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-10 xl:gap-12">
          {/* Hero Header */}
          <StackHero />
          
          {/* Categorized Tech Chips Grid with Inline Detail Panel */}
          <TechnologyGrid 
            selectedTechId={selectedTechId} 
            setSelectedTechId={setSelectedTechId} 
          />

          {/* Bottom Quote Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-white/10 bg-[#07090e] mt-4"
          >
            <div className="flex items-center gap-3 text-secondary/80 text-xs font-serif italic">
              <span className="text-accent text-base font-bold font-mono">“</span>
              <span>The right tool in the right hands can build extraordinary products.</span>
              <span className="text-accent text-base font-bold font-mono">”</span>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase whitespace-nowrap">
              ENGINEERING IS PROBLEM SOLVING
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32">
            <StackSidebar />
          </div>
        </div>

      </div>
    </section>
  );
}
