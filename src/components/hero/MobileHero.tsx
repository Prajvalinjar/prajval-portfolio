"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileCards from "@/components/cards/MobileCards";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import HeroBackground from "./HeroBackground";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

const ROLES = [
  "Data Analyst",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver"
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between pt-16 pb-6 overflow-hidden select-none">
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
        {/* 1. Engineer Mode Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080E1A]/90 border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase mb-2.5 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="font-semibold">ENGINEERING PORTFOLIO</span>
        </div>

        {/* 2. Name */}
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight uppercase leading-tight mb-1">
          Prajval Mahadev Injar
        </h1>

        {/* 3. Title (Max 2 lines) */}
        <h2 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight uppercase leading-tight mb-1.5">
          Building <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">Intelligent</span> Products
        </h2>

        {/* 4. Professional Title Rotator */}
        <div className="h-6 flex items-center justify-center relative w-full mb-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5 }}
              className="absolute text-xs sm:text-sm font-mono text-[#00E5FF] font-semibold tracking-wider text-center uppercase"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 5. Short Description */}
        <p className="text-center text-xs text-secondary/85 max-w-xs mx-auto leading-relaxed mb-3 font-normal px-2">
          Building intelligent products through <span className="text-[#00E5FF]">data</span>,{" "}
          <span className="text-[#00E5FF]">engineering</span>, <span className="text-[#00E5FF]">AI</span>, and thoughtful <span className="text-[#00E5FF]">design</span>.
        </p>
      </div>

      {/* 6. Portrait (Primary focal point, visible down to upper chest) */}
      <div className="relative w-full flex flex-col items-center justify-center my-1 z-10 pointer-events-none">
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

      {/* 7. Mobile Cards (Compact, touch-optimized card stack) */}
      <div className="w-full max-w-sm px-3 z-20 relative -mt-4">
        <MobileCards />
      </div>

      {/* Scroll Indicator */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Scroll to My Journey"
        onClick={handleScrollToJourney}
        className="mt-4 mb-2 flex flex-col items-center gap-2 z-20 cursor-pointer group p-2 active:scale-95 transition-all"
      >
        <span className="text-[9px] font-mono tracking-widest text-secondary/60 uppercase">
          EXPLORE STORY ↓
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00E5FF]/50 to-transparent" />
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
export default MobileHero;
