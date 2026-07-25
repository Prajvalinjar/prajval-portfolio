"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileCards from "@/components/cards/MobileCards";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import HeroBackground from "./HeroBackground";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

const ROLES = [
  "Problem Solver",
  "AI Enthusiast",
  "Full Stack Developer",
  "Data Analyst"
];

export const MobileHero: React.FC = React.memo(() => {
  const perf = usePerformanceTier();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToJourney = useCallback(() => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#journey");
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between pt-16 sm:pt-20 pb-4 overflow-hidden select-none">
      {/* Shared Background Engine with Earth offset 90px lower on mobile */}
      <HeroBackground
        mousePos={{ x: 0, y: 0 }}
        isMobile={true}
        enableBlur={perf.enableHeavyBlur}
        enableMotion={perf.enableContinuousEarthRotation}
        earthOffsetPx={90}
      />

      {/* Minimal Mobile Navigation Header */}
      <MobileNavigation />

      {/* Mobile Storytelling Header Composition */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-sm px-4 pt-2">
        {/* 1. Hero Badge (24px breathing room below fixed nav bar) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080E1A]/90 border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase mb-4.5 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="font-semibold">ENGINEERING PORTFOLIO</span>
        </div>

        {/* 2. Hero Message (18px spacing to Name) */}
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-[1.15] mb-4 uppercase drop-shadow-md">
          Building <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">Intelligent</span> Products
        </h1>

        {/* 3. Name (16px spacing to Role) */}
        <h2 className="text-sm sm:text-base font-mono font-semibold text-[#00E5FF] tracking-widest uppercase mb-4">
          Prajval Mahadev Injar
        </h2>

        {/* 4. Professional Title Rotator (16px spacing to Description) */}
        <div className="h-6 flex items-center justify-center relative w-full mb-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5 }}
              className="absolute text-xs sm:text-sm font-mono text-[#00E5FF]/90 font-medium tracking-wider text-center uppercase"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 5. Tagline Description (24px spacing to Portrait) */}
        <p className="text-center text-xs text-secondary/80 max-w-xs mx-auto leading-relaxed mb-6 font-normal px-2">
          Building intelligent products through <span className="text-[#00E5FF]">data</span>,{" "}
          <span className="text-[#00E5FF]">engineering</span>, <span className="text-[#00E5FF]">AI</span>, and thoughtful <span className="text-[#00E5FF]">design</span>.
        </p>
      </div>

      {/* 6. Portrait (Primary focal point, shifted 24px upward) */}
      <div className="relative w-full flex flex-col items-center justify-center -mt-6 sm:-mt-8 z-10 pointer-events-none">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 z-10">
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile_cutout_clean.webp"
              alt="Prajval Mahadev Injar"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-contain object-bottom pointer-events-auto mix-blend-normal transform-gpu"
            />
          </div>
        </div>
      </div>

      {/* 7. Mobile Cards (Compact 20px gap below portrait) */}
      <div className="w-full max-w-sm px-3 z-20 relative -mt-5">
        <MobileCards />
      </div>

      {/* Scroll Indicator */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Scroll to My Journey"
        onClick={handleScrollToJourney}
        className="mt-3 mb-1 flex flex-col items-center gap-1.5 z-20 cursor-pointer group p-1.5 active:scale-95 transition-all"
      >
        <span className="text-[9px] font-mono tracking-widest text-secondary/60 uppercase">
          EXPLORE STORY ↓
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#00E5FF]/50 to-transparent" />
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
export default MobileHero;
