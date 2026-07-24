"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ExecutiveSummary from "./ExecutiveSummary";
import Overview from "./Overview";
import ProblemInvestigation from "./ProblemInvestigation";
import EngineeringWorkspace from "./EngineeringWorkspace";
import Results from "./Results";
import CaseFileFooter from "./CaseFileFooter";

const RIGHT_NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "engineering", label: "Engineering" },
  { id: "results", label: "Results" },
  { id: "next", label: "Next Project" },
];

export default function CaseFileChapter() {
  const [activeSection, setActiveSection] = useState("overview");

  // Intersection Observer for right sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    RIGHT_NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // Run once on mount

  return (
    <section className="relative w-full min-h-screen bg-[#050505] z-40 overflow-hidden">
      


      {/* Blueprint background lines for chapter */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] pt-24">
        <div className="absolute top-8 right-12 text-[8px] font-mono text-white/50 tracking-widest">X: 231.88 <br/> Y: 120.11</div>
        <div className="w-full h-[1px] bg-white absolute top-10 flex items-center justify-around">
          {[...Array(20)].map((_, i) => <div key={i} className="h-1 w-[1px] bg-white" />)}
        </div>
        <div className="w-[1px] h-full bg-white absolute left-1/4 flex flex-col items-center justify-around">
          {[...Array(20)].map((_, i) => <div key={i} className="w-1 h-[1px] bg-white" />)}
        </div>
        <div className="w-[1px] h-full bg-white absolute right-[15%]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 pt-24 pb-32">
        
        {/* Left Navigation Spacer */}
        <div className="lg:col-span-2 hidden lg:block">
          {/* Handled globally in page.tsx */}
        </div>

        {/* Center Content: Case File Sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="lg:col-span-8 flex flex-col w-full max-w-5xl mx-auto"
        >
          
          <div id="overview" className="flex flex-col gap-24 xl:gap-32 scroll-mt-24">
            <ExecutiveSummary />
            <Overview />
          </div>

          <div id="problem" className="mt-32 scroll-mt-24">
            <ProblemInvestigation />
          </div>

          <div id="engineering" className="mt-32 scroll-mt-24">
            <EngineeringWorkspace />
          </div>

          <div id="results" className="mt-32 scroll-mt-24">
            <Results />
          </div>

          <div id="next" className="mt-32 scroll-mt-24">
            <CaseFileFooter />
          </div>

        </motion.div>

        {/* Right Navigation: Contextual Sidebar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="lg:col-span-2 hidden lg:block"
        >
          <div className="sticky top-32 flex flex-col gap-6 pl-8">
            <div className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase mb-4">
              Case File Contents
            </div>
            <div className="flex flex-col gap-4 relative">
              {/* Animated active indicator line */}
              <div className="absolute left-[-16px] top-0 bottom-0 w-[1px] bg-white/5" />
              <motion.div 
                className="absolute left-[-16px] w-[1px] bg-accent"
                initial={false}
                animate={{
                  top: `${Math.max(0, RIGHT_NAV_ITEMS.findIndex(item => item.id === activeSection) * 36)}px`,
                  height: "16px"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {RIGHT_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-left text-[11px] font-mono tracking-widest uppercase transition-colors h-5 flex items-center ${
                      isActive ? "text-accent" : "text-secondary/50 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
