"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface HeroBackgroundProps {
  mousePos: { x: number; y: number };
  isMobile: boolean;
  enableBlur: boolean;
  enableMotion: boolean;
  earthOffsetPx?: number; // Optional mobile offset to push Earth down 80-120px
}

export const HeroBackground: React.FC<HeroBackgroundProps> = React.memo(
  ({ mousePos, isMobile, enableBlur, enableMotion, earthOffsetPx = 0 }) => {

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       MOBILE: Lightweight static background — no blur, no 
       animation, no expensive compositing. Cinematic but static.
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    if (isMobile) {
      return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
          {/* 1. Deep space navy base */}
          <div className="absolute inset-0 bg-[#030712]" />

          {/* 2. Subtle static space cyan/purple radial gradient tint */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_15%,rgba(0,229,255,0.07),transparent_60%),radial-gradient(ellipse_70%_50%_at_80%_65%,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none" />

          {/* 3. Static starfield (no animation, reduced opacity) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
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
                </g>
                <g fill="#38bdf8">
                  <circle cx="16%" cy="18%" r="1.1" opacity="0.4" />
                  <circle cx="46%" cy="8%" r="0.9" opacity="0.3" />
                </g>
              </svg>
            </div>
          </div>

          {/* 4. Static Earth (no parallax, no drop-shadow filter) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] z-10 pointer-events-none overflow-hidden"
            style={{ top: `${earthOffsetPx}px` }}
          >
            <div className="relative w-full h-full flex items-start justify-center">
              <Image
                src="/images/earth_command_center_bg.webp"
                alt="Earth Command Center Horizon"
                width={1200}
                height={675}
                sizes="140vw"
                priority
                className="w-full h-auto object-cover object-top opacity-80 brightness-[0.70] contrast-[0.89] pointer-events-none select-none"
              />

              {/* Simple atmospheric gradient (no blur) */}
              <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[90%] h-[120px] bg-gradient-to-b from-[#00E5FF]/08 via-transparent to-transparent rounded-[100%] opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>
      );
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       DESKTOP: Full cinematic background — unchanged
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030509]">
        {/* 1. SEAMLESS DEEP SPACE BASE LAYER */}
        <div className="absolute inset-0 bg-[#030509]" />

        {/* 2. COSMIC PURPLE / CYAN NEBULA DUST */}
        <div
          className={`absolute -top-[15%] -left-[15%] w-[65vw] h-[75vh] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.065)_0%,rgba(56,189,248,0.038)_45%,transparent_75%)] opacity-25 pointer-events-none transform -rotate-12 ${
            enableBlur ? "blur-[110px]" : ""
          }`}
        />
        <div
          className={`absolute -top-[15%] -right-[15%] w-[65vw] h-[75vh] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.065)_0%,rgba(56,189,248,0.038)_45%,transparent_75%)] opacity-25 pointer-events-none transform rotate-12 ${
            enableBlur ? "blur-[110px]" : ""
          }`}
        />

        {/* 3. DRIFTING STARFIELD */}
        <motion.div
          animate={
            !enableMotion
              ? { x: 0, y: 0 }
              : {
                  x: mousePos.x * 0.12,
                  y: mousePos.y * 0.12,
                }
          }
          transition={!enableMotion ? { duration: 0 } : { type: "spring", stiffness: 30, damping: 30 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {enableBlur && (
            <div
              className="hidden sm:block absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
            />
          )}

          <div className="absolute inset-0 sm:animate-[starDrift_28s_linear_infinite] opacity-30 pointer-events-none">
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
            !enableMotion
              ? { x: 0, y: 0 }
              : {
                  x: mousePos.x * 0.2,
                  y: mousePos.y * 0.08,
                }
          }
          transition={!enableMotion ? { duration: 0 } : { type: "spring", stiffness: 35, damping: 30 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115vw] z-10 pointer-events-none overflow-hidden transform-gpu"
          style={{ top: "0px" }}
        >
          <div className="relative w-full h-full flex items-start justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/earth_command_center_bg.webp"
              alt="Earth Command Center Horizon"
              decoding="async"
              fetchPriority="high"
              className="w-full h-auto object-cover object-top opacity-80 brightness-[0.70] contrast-[0.89] pointer-events-none select-none drop-shadow-[0_0_25px_rgba(0,229,255,0.10)]"
            />

            {/* Quiet Atmospheric Rim Glow */}
            <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[90%] h-[280px] bg-gradient-to-b from-[#00E5FF]/11 via-[#3B82F6]/03 to-transparent rounded-[100%] blur-[60px] opacity-40 pointer-events-none mix-blend-screen" />
          </div>
        </motion.div>
      </div>
    );
  }
);

HeroBackground.displayName = "HeroBackground";
export default HeroBackground;

