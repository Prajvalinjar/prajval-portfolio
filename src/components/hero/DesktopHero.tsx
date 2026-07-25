"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesktopCards from "@/components/cards/DesktopCards";
import HeroHUD from "@/components/HeroHUD";
import HeroBackground from "./HeroBackground";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

const ROLES = [
  "Data Analyst",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Building Intelligent Products"
];

export const DesktopHero: React.FC = React.memo(() => {
  const isMobile = useIsMobile();
  const perf = usePerformanceTier();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile || perf.tier === "LOW") return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;

    const updateMouse = () => {
      setMousePos({ x: targetX, y: targetY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 40;
      targetY = (e.clientY / innerHeight - 0.5) * 40;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateMouse);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, perf.tier]);

  const handleScrollToJourney = useCallback(() => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#journey");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-between pt-16 sm:pt-20 md:pt-22 pb-6 overflow-hidden select-none"
    >
      {/* 1. CINEMATIC EARTH COMMAND CENTER BACKGROUND */}
      <HeroBackground
        mousePos={mousePos}
        isMobile={false}
        enableBlur={perf.enableHeavyBlur}
        enableMotion={perf.enableContinuousEarthRotation}
      />

      {/* HUD SYSTEM LAYER */}
      <HeroHUD />

      {/* MAIN HERO CONTENT HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 sm:px-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080E1A]/80 border border-[#00E5FF]/30 text-[#00E5FF] text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="font-semibold">Prajval Mahadev Injar</span>
          <span className="text-white/40">•</span>
          <span className="text-secondary/80 font-normal">ENGINEERING PORTFOLIO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-3 uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          Building <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">Intelligent</span> Products
        </h1>

        <div className="h-8 sm:h-10 flex items-center justify-center relative w-full mb-2">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute text-base sm:text-xl md:text-2xl font-mono text-[#00E5FF] font-semibold tracking-wider text-center drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] uppercase"
            >
              {ROLES[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          className="text-center text-sm sm:text-base md:text-lg text-secondary/85 max-w-xl mx-auto leading-relaxed mb-6 px-4 font-normal"
        >
          Building intelligent products through <span className="text-[#00E5FF] font-medium">data</span>,<br className="hidden sm:block"/> 
          <span className="text-[#00E5FF] font-medium">engineering</span>, <span className="text-[#00E5FF] font-medium">AI</span>, 
          and thoughtful <span className="text-[#00E5FF] font-medium">design</span>.
        </motion.p>
      </motion.div>

      {/* Portrait Container */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center -mt-16 sm:-mt-22 md:-mt-26 z-10 pointer-events-none">
        {perf.enableVolumetricGlow && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[220px] sm:w-[620px] sm:h-[420px] rounded-t-full bg-gradient-to-t from-[#00E5FF]/14 via-[#00E5FF]/04 to-transparent blur-[35px] sm:blur-[75px] pointer-events-none"
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, x: mousePos.x }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            y: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            x: { type: "spring", stiffness: 40, damping: 30 }
          }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] z-10 sm:animate-[breath_8s_ease-in-out_infinite]"
        >
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] drop-shadow-[0_0_18px_rgba(0,229,255,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profile_cutout_clean.webp" 
              alt="Prajval Mahadev Injar"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-contain object-bottom pointer-events-auto mix-blend-normal transform-gpu"
            />
          </div>
        </motion.div>
      </div>

      {/* Experience Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl px-6 -mt-12 sm:-mt-16 md:-mt-18 z-20 relative pointer-events-auto"
      >
        <DesktopCards />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        role="button"
        tabIndex={0}
        aria-label="Scroll to My Journey"
        onClick={handleScrollToJourney}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScrollToJourney();
          }
        }}
        className="mt-10 sm:mt-12 mb-4 flex flex-col items-center gap-4 z-20 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none p-2 rounded-xl"
      >
        <span className="text-[10px] font-mono tracking-widest text-secondary/60 group-hover:text-white transition-colors uppercase">
          Explore My Story <span className="opacity-50 group-hover:translate-y-1 inline-block transition-transform">↓</span>
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00E5FF]/40 to-transparent animate-[pulse_2.5s_ease-in-out_infinite]" />
      </motion.div>

    </motion.div>
  );
});

DesktopHero.displayName = "DesktopHero";
export default DesktopHero;
