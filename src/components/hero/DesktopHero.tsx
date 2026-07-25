"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveCards from "@/components/InteractiveCards";
import HeroHUD from "@/components/HeroHUD";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

const ROLES = [
  "Data Analyst",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Building Intelligent Products"
];

interface EarthCinematicBackgroundProps {
  mousePos: { x: number; y: number };
  isMobile: boolean;
  enableBlur: boolean;
  enableMotion: boolean;
}

const EarthCinematicBackground = memo(({ mousePos, isMobile, enableBlur, enableMotion }: EarthCinematicBackgroundProps) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#010309]">
    {/* 1. DEEP BLACK SPACE BASE LAYER */}
    <div className="absolute inset-0 bg-[#010309]" />

    {/* 2. COSMIC PURPLE / CYAN NEBULA DUST */}
    <div className={`absolute -top-[12%] -left-[12%] w-[60vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(56,189,248,0.08)_40%,transparent_75%)] opacity-35 sm:opacity-45 pointer-events-none transform -rotate-12 ${enableBlur ? 'blur-[40px] sm:blur-[110px]' : ''}`} />
    <div className={`absolute -top-[12%] -right-[12%] w-[60vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(56,189,248,0.08)_40%,transparent_75%)] opacity-35 sm:opacity-45 pointer-events-none transform rotate-12 ${enableBlur ? 'blur-[40px] sm:blur-[110px]' : ''}`} />

    {/* 3. MULTI-SCALE DRIFTING STARFIELD */}
    <motion.div
      animate={isMobile || !enableMotion ? { x: 0, y: 0 } : {
        x: mousePos.x * 0.12,
        y: mousePos.y * 0.12
      }}
      transition={isMobile || !enableMotion ? { duration: 0 } : { type: "spring", stiffness: 30, damping: 30 }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      {/* Film Grain Texture */}
      {enableBlur && (
        <div
          className="hidden sm:block absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
        />
      )}

      <div className="absolute inset-0 sm:animate-[starDrift_28s_linear_infinite] opacity-55 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g fill="#ffffff">
            <circle cx="7%" cy="10%" r="0.9" opacity="0.6" />
            <circle cx="20%" cy="6%" r="1.3" opacity="0.7" />
            <circle cx="36%" cy="16%" r="0.7" opacity="0.35" />
            <circle cx="53%" cy="4%" r="1.1" opacity="0.65" />
            <circle cx="70%" cy="10%" r="1.4" opacity="0.7" />
            <circle cx="86%" cy="16%" r="1" opacity="0.6" />
            <circle cx="94%" cy="6%" r="1.2" opacity="0.5" />
            <circle cx="11%" cy="30%" r="0.8" opacity="0.35" />
            <circle cx="28%" cy="36%" r="1" opacity="0.45" />
            <circle cx="66%" cy="26%" r="1.2" opacity="0.5" />
            <circle cx="90%" cy="36%" r="0.9" opacity="0.45" />
            <circle cx="4%" cy="56%" r="1.1" opacity="0.3" />
            <circle cx="23%" cy="50%" r="0.7" opacity="0.25" />
            <circle cx="80%" cy="52%" r="1" opacity="0.3" />
          </g>
          <g fill="#38bdf8">
            <circle cx="16%" cy="18%" r="1.2" opacity="0.6" />
            <circle cx="46%" cy="8%" r="1" opacity="0.5" />
            <circle cx="77%" cy="22%" r="1.5" opacity="0.65" />
          </g>
        </svg>
      </div>
    </motion.div>

    {/* 4. REALISTIC EARTH COMMAND CENTER BACKGROUND ASSET */}
    <motion.div
      animate={isMobile || !enableMotion ? { x: 0, y: 0 } : {
        x: mousePos.x * 0.2,
        y: mousePos.y * 0.08
      }}
      transition={isMobile || !enableMotion ? { duration: 0 } : { type: "spring", stiffness: 35, damping: 30 }}
      className="absolute top-[8%] sm:top-[5%] lg:top-[12%] xl:top-[14%] bottom-0 left-1/2 -translate-x-1/2 w-[132vw] sm:w-[115vw] z-10 pointer-events-none overflow-hidden transform-gpu"
    >
      <div className="relative w-full h-full flex items-start justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/earth_command_center_bg.webp"
          alt="Earth Command Center Horizon"
          decoding="async"
          fetchPriority="high"
          className="w-full h-auto object-cover object-top opacity-95 pointer-events-none select-none drop-shadow-[0_0_80px_rgba(0,229,255,0.28)]"
        />

        {/* Dynamic Atmosphere Rim Glow */}
        <div className="absolute top-[4%] sm:top-[2%] left-1/2 -translate-x-1/2 w-[90%] h-[180px] sm:h-[320px] bg-gradient-to-b from-[#00E5FF]/25 via-[#3B82F6]/10 to-transparent rounded-[100%] blur-[25px] sm:blur-[60px] opacity-80 pointer-events-none mix-blend-screen" />
      </div>
    </motion.div>
  </div>
));
EarthCinematicBackground.displayName = "EarthCinematicBackground";

export const DesktopHero: React.FC = memo(() => {
  const isMobile = useIsMobile();
  const perf = usePerformanceTier();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotate tagline roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Mouse Parallax listener with requestAnimationFrame throttling
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
      className="relative w-full min-h-screen flex flex-col items-center justify-between pt-16 sm:pt-20 md:pt-22 pb-4 overflow-hidden select-none"
    >
      {/* 1. CINEMATIC EARTH COMMAND CENTER BACKGROUND */}
      <EarthCinematicBackground 
        mousePos={mousePos} 
        isMobile={isMobile} 
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
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080E1A]/80 border border-[#00E5FF]/30 text-[#00E5FF] text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="font-semibold">Prajval Mahadev Injar</span>
          <span className="text-white/40">•</span>
          <span className="text-secondary/80 font-normal">ENGINEERING PORTFOLIO</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-3 uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          Building <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">Intelligent</span> Products
        </h1>

        {/* Roles Rotator */}
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

        {/* Highlighted Tagline */}
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
      <div className="relative w-full flex-1 flex flex-col items-center justify-center -mt-20 sm:-mt-26 md:-mt-28 z-10 pointer-events-none">
        
        {/* Soft Cyan Volumetric Light emanating upward */}
        {perf.enableVolumetricGlow && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[250px] sm:w-[680px] sm:h-[500px] rounded-t-full bg-gradient-to-t from-[#00E5FF]/20 via-[#00E5FF]/08 to-transparent blur-[35px] sm:blur-[85px] pointer-events-none"
          />
        )}

        {/* The Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isMobile || perf.tier === "LOW" ? { opacity: 1, y: 0, x: 0 } : { 
            opacity: 1, 
            y: 0,
            x: mousePos.x,
          }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            y: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            x: { type: "spring", stiffness: 40, damping: 30 }
          }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] z-10 sm:animate-[breath_8s_ease-in-out_infinite]"
        >
          {/* Subtle cyan rim light and soft shadow */}
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]">
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
        className="w-full max-w-6xl px-6 -mt-10 sm:-mt-14 md:-mt-16 z-20 relative pointer-events-auto"
      >
        <InteractiveCards />
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
        className="mt-12 mb-4 flex flex-col items-center gap-4 z-20 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none p-2 rounded-xl"
      >
        <span className="text-[10px] font-mono tracking-widest text-secondary/60 group-hover:text-white transition-colors uppercase">
          Explore My Story <span className="opacity-50 group-hover:translate-y-1 inline-block transition-transform">↓</span>
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#00E5FF]/40 to-transparent animate-[pulse_2.5s_ease-in-out_infinite]" />
      </motion.div>

    </motion.div>
  );
});

DesktopHero.displayName = "DesktopHero";
export default DesktopHero;
