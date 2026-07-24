"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveCards from "./InteractiveCards";
import HeroHUD from "./HeroHUD";

const ROLES = [
  "Data Analyst",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Building Intelligent Products"
];

interface EarthCinematicBackgroundProps {
  mousePos: { x: number; y: number };
}

const EarthCinematicBackground = ({ mousePos }: EarthCinematicBackgroundProps) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#010309]">
    {/* 1. DEEP BLACK SPACE BASE LAYER */}
    <div className="absolute inset-0 bg-[#010309]" />

    {/* 2. COSMIC PURPLE / CYAN NEBULA DUST (Soft ambient depth, low brightness) */}
    <div className="absolute -top-[12%] -left-[12%] w-[60vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(56,189,248,0.08)_40%,transparent_75%)] blur-[110px] opacity-45 pointer-events-none transform -rotate-12" />
    <div className="absolute -top-[12%] -right-[12%] w-[60vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(56,189,248,0.08)_40%,transparent_75%)] blur-[110px] opacity-45 pointer-events-none transform rotate-12" />

    {/* 3. MULTI-SCALE DRIFTING STARFIELD (Layer 2) */}
    <motion.div
      animate={{
        x: mousePos.x * 0.12,
        y: mousePos.y * 0.12
      }}
      transition={{ type: "spring", stiffness: 30, damping: 30 }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
      />

      <div className="absolute inset-0 animate-[starDrift_28s_linear_infinite] opacity-55 pointer-events-none">
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

    {/* 4. REALISTIC EARTH COMMAND CENTER BACKGROUND ASSET (Scaled down 12% to feel more distant, nudged 2-3% lower) */}
    <motion.div
      animate={{
        x: mousePos.x * 0.2,
        y: mousePos.y * 0.08
      }}
      transition={{ type: "spring", stiffness: 35, damping: 30 }}
      className="absolute top-[8%] sm:top-[5%] bottom-0 left-1/2 -translate-x-1/2 w-[132vw] sm:w-[115vw] z-10 pointer-events-none overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/earth_command_center_bg.png"
        alt="Digital Earth Command Center"
        className="w-full h-full object-cover object-[center_18%] opacity-65 brightness-[0.65] contrast-[1.1] scale-[1.02] mix-blend-screen pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_85%,transparent_100%)]"
      />
    </motion.div>

    {/* 5. GLOWING CYAN NETWORK NODES & INTERCONTINENTAL DATA ARCS */}
    <svg
      viewBox="0 0 1440 700"
      className="absolute inset-0 w-full h-full pointer-events-none z-12 opacity-50"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="cyanArcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
        </linearGradient>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Network Hub Nodes across continents */}
      <g fill="#00E5FF" filter="url(#nodeGlow)">
        <circle cx="220" cy="460" r="3.5" className="animate-pulse" />
        <circle cx="290" cy="420" r="4" />
        <circle cx="360" cy="490" r="3" />
        <circle cx="480" cy="380" r="4.5" className="animate-pulse" />
        <circle cx="620" cy="340" r="5" />
        <circle cx="780" cy="360" r="4.5" className="animate-pulse" />
        <circle cx="940" cy="410" r="4" />
        <circle cx="1080" cy="450" r="4.5" />
        <circle cx="1220" cy="480" r="3.5" className="animate-pulse" />
      </g>

      {/* Interconnecting Cyan Network Lines */}
      <g stroke="url(#cyanArcGlow)" strokeWidth="1.4" fill="none">
        <path d="M 220 460 Q 350 350 480 380" strokeDasharray="5 5" className="animate-[pulse_3s_ease-in-out_infinite]" />
        <path d="M 480 380 Q 550 310 620 340" strokeDasharray="6 6" />
        <path d="M 620 340 Q 700 320 780 360" strokeDasharray="4 4" className="animate-[pulse_2.5s_ease-in-out_infinite]" />
        <path d="M 780 360 Q 860 350 940 410" strokeDasharray="5 5" />
        <path d="M 940 410 Q 1010 400 1080 450" strokeDasharray="6 6" className="animate-[pulse_3.5s_ease-in-out_infinite]" />
        <path d="M 1080 450 Q 1150 450 1220 480" strokeDasharray="4 4" />
      </g>
    </svg>

    {/* 6. CAD RADAR RETICLE ON LEFT MARGIN */}
    <div className="absolute top-[44%] left-[3%] sm:left-[5%] -translate-y-1/2 w-28 h-28 pointer-events-none opacity-45 hidden md:block z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#00E5FF]">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="50" r="3" fill="#00E5FF" className="animate-ping" />
      </svg>
    </div>

    {/* 7. VOLUMETRIC ATMOSPHERIC ILLUMINATION (Increased 15% for stronger atmospheric rim glow) */}
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
        opacity: [0.9, 1, 0.9],
        x: mousePos.x * 0.25,
        y: mousePos.y * 0.25
      }}
      transition={{
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        x: { type: "spring", stiffness: 40, damping: 30 },
        y: { type: "spring", stiffness: 40, damping: 30 }
      }}
      className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[600px] sm:w-[1000px] sm:h-[750px] rounded-full pointer-events-none z-15"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28)_0%,rgba(0,180,216,0.09)_45%,transparent_75%)] blur-[110px]" />
    </motion.div>

    {/* 8. ENGINEERING CAD GRID (Dissolving into Atmosphere) */}
    <motion.div
      animate={{
        x: mousePos.x * 0.18,
        y: mousePos.y * 0.18
      }}
      transition={{ type: "spring", stiffness: 40, damping: 30 }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.2)_40%,transparent_65%)]" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00E5FF]/[0.04]" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#00E5FF]/[0.04]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(56,189,248,0.02)_50%,transparent_100%)] h-[220px] animate-[scanline_14s_ease-in-out_infinite]" />
    </motion.div>

    {/* 9. VIGNETTE OVERLAY (Focuses eye on Name -> Portrait -> Cards) */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#010309_100%)] z-30 pointer-events-none" />
  </div>
);

export default function HeroReveal() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Mouse Parallax for Portrait, Earth & Camera Drift
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 8, // Max 4px drift in either direction
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative z-20 flex flex-col items-center justify-start w-full min-h-screen pt-24 pb-10 overflow-hidden"
    >
      <EarthCinematicBackground mousePos={mousePos} />
      <HeroHUD />
      
      <motion.div 
        animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 z-20 pointer-events-none"
      >
        {/* Top Header Tag matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#00E5FF] uppercase mb-2"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#00E5FF]" />
          <span>WELCOME TO MY UNIVERSE</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#00E5FF]" />
        </motion.div>

        {/* Title: Original Font Size Preserved */}
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 1, 0.5, 1] }} 
          className="text-[38px] sm:text-[60px] md:text-[74px] lg:text-[86px] font-heading font-[800] text-white tracking-tight mb-3 text-center leading-[1.05] drop-shadow-xl"
        >
          Prajval Mahadev Injar
        </motion.h1>
        
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

      {/* Portrait Container: Centered with Soft Environmental Backlight from Earth Horizon */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center -mt-12 sm:-mt-16 md:-mt-20 z-10 pointer-events-none">
        
        {/* Soft Cyan Volumetric Light emanating upward from Earth Horizon behind Portrait Cutout */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[360px] sm:w-[680px] sm:h-[500px] rounded-t-full bg-gradient-to-t from-[#00E5FF]/20 via-[#00E5FF]/08 to-transparent blur-[85px] pointer-events-none"
        />

        {/* The Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: mousePos.x,
          }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            y: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            x: { type: "spring", stiffness: 40, damping: 30 }
          }}
          // Breathing animation: 1px over 8 seconds
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] z-10 animate-[breath_8s_ease-in-out_infinite]"
        >
          {/* Subtle cyan rim light and soft shadow via drop-shadow */}
          <div className="absolute inset-0 w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profile_cutout_clean.png" 
              alt="Prajval Mahadev Injar"
              className="w-full h-full object-contain object-bottom pointer-events-auto mix-blend-normal"
            />
          </div>
        </motion.div>
      </div>

      {/* Experience Cards - Overlap UNDER portrait with high z-index interaction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl px-6 -mt-16 sm:-mt-24 md:-mt-28 z-20 relative pointer-events-auto"
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
        onClick={() => {
          const el = document.getElementById("journey");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#journey");
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const el = document.getElementById("journey");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", "#journey");
            }
          }
        }}
        className="mt-16 mb-8 flex flex-col items-center gap-4 z-20 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none p-2 rounded-xl"
      >
        <span className="text-[10px] font-mono tracking-widest text-secondary/60 group-hover:text-white transition-colors uppercase">
          Explore My Story <span className="opacity-50 group-hover:translate-y-1 inline-block transition-transform">↓</span>
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#00E5FF]/40 to-transparent animate-[pulse_2.5s_ease-in-out_infinite]" />
      </motion.div>

    </motion.div>
  );
}
