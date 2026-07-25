"use client";

import React from "react";
import { motion } from "framer-motion";

export interface HeroBackgroundProps {
  mousePos: { x: number; y: number };
  isMobile: boolean;
  enableBlur: boolean;
  enableMotion: boolean;
  earthOffsetPx?: number; // Optional mobile offset to push Earth down 80-120px
}

export const HeroBackground: React.FC<HeroBackgroundProps> = React.memo(
  ({ mousePos, isMobile, enableBlur, enableMotion, earthOffsetPx = 0 }) => (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030509]">
      {/* 1. SEAMLESS DEEP SPACE BASE LAYER */}
      <div className="absolute inset-0 bg-[#030509]" />

      {/* 2. COSMIC PURPLE / CYAN NEBULA DUST */}
      <div
        className={`absolute -top-[15%] -left-[15%] w-[65vw] h-[75vh] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.07)_0%,rgba(56,189,248,0.04)_45%,transparent_75%)] opacity-20 sm:opacity-28 pointer-events-none transform -rotate-12 ${
          enableBlur ? "blur-[40px] sm:blur-[110px]" : ""
        }`}
      />
      <div
        className={`absolute -top-[15%] -right-[15%] w-[65vw] h-[75vh] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.07)_0%,rgba(56,189,248,0.04)_45%,transparent_75%)] opacity-20 sm:opacity-28 pointer-events-none transform rotate-12 ${
          enableBlur ? "blur-[40px] sm:blur-[110px]" : ""
        }`}
      />

      {/* 3. DRIFTING STARFIELD */}
      <motion.div
        animate={
          isMobile || !enableMotion
            ? { x: 0, y: 0 }
            : {
                x: mousePos.x * 0.12,
                y: mousePos.y * 0.12,
              }
        }
        transition={isMobile || !enableMotion ? { duration: 0 } : { type: "spring", stiffness: 30, damping: 30 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {enableBlur && (
          <div
            className="hidden sm:block absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
          />
        )}

        <div className="absolute inset-0 sm:animate-[starDrift_28s_linear_infinite] opacity-35 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff">
              <circle cx="7%" cy="10%" r="0.8" opacity="0.5" />
              <circle cx="20%" cy="6%" r="1.1" opacity="0.6" />
              <circle cx="36%" cy="16%" r="0.6" opacity="0.3" />
              <circle cx="53%" cy="4%" r="1.0" opacity="0.55" />
              <circle cx="70%" cy="10%" r="1.2" opacity="0.6" />
              <circle cx="86%" cy="16%" r="0.9" opacity="0.5" />
              <circle cx="94%" cy="6%" r="1.1" opacity="0.4" />
              <circle cx="11%" cy="30%" r="0.7" opacity="0.3" />
              <circle cx="28%" cy="36%" r="0.9" opacity="0.4" />
              <circle cx="66%" cy="26%" r="1.1" opacity="0.45" />
              <circle cx="90%" cy="36%" r="0.8" opacity="0.4" />
              <circle cx="4%" cy="56%" r="1.0" opacity="0.25" />
              <circle cx="23%" cy="50%" r="0.6" opacity="0.2" />
              <circle cx="80%" cy="52%" r="0.9" opacity="0.25" />
            </g>
            <g fill="#38bdf8">
              <circle cx="16%" cy="18%" r="1.1" opacity="0.5" />
              <circle cx="46%" cy="8%" r="0.9" opacity="0.4" />
              <circle cx="77%" cy="22%" r="1.3" opacity="0.55" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* 4. REALISTIC EARTH COMMAND CENTER BACKGROUND ASSET */}
      <motion.div
        animate={
          isMobile || !enableMotion
            ? { x: 0, y: 0 }
            : {
                x: mousePos.x * 0.2,
                y: mousePos.y * 0.08,
              }
        }
        transition={isMobile || !enableMotion ? { duration: 0 } : { type: "spring", stiffness: 35, damping: 30 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] sm:w-[115vw] z-10 pointer-events-none overflow-hidden transform-gpu"
        style={{ top: isMobile ? `${earthOffsetPx}px` : "0px" }}
      >
        <div className="relative w-full h-full flex items-start justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/earth_command_center_bg.webp"
            alt="Earth Command Center Horizon"
            decoding="async"
            fetchPriority="high"
            className="w-full h-auto object-cover object-top opacity-80 brightness-[0.75] contrast-[0.92] pointer-events-none select-none drop-shadow-[0_0_30px_rgba(0,229,255,0.12)]"
          />

          {/* Quiet Atmospheric Rim Glow */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[90%] h-[160px] sm:h-[280px] bg-gradient-to-b from-[#00E5FF]/12 via-[#3B82F6]/04 to-transparent rounded-[100%] blur-[25px] sm:blur-[60px] opacity-45 pointer-events-none mix-blend-screen" />
        </div>
      </motion.div>
    </div>
  )
);

HeroBackground.displayName = "HeroBackground";
export default HeroBackground;
