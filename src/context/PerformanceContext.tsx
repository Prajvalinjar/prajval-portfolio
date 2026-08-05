"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type PerformanceTier = "HIGH" | "MEDIUM" | "LOW";

export interface PerformanceFlags {
  tier: PerformanceTier;
  enableParticles: boolean;
  particleCount: number;
  enableMouseSpotlight: boolean;
  enableHeavyBlur: boolean;
  enableContinuousEarthRotation: boolean;
  enableVolumetricGlow: boolean;
  enableGrainOverlay: boolean;
  springStiffnessMultiplier: number;
}

const TIER_FLAGS: Record<PerformanceTier, PerformanceFlags> = {
  HIGH: {
    tier: "HIGH",
    enableParticles: true,
    particleCount: 65,
    enableMouseSpotlight: true,
    enableHeavyBlur: true,
    enableContinuousEarthRotation: true,
    enableVolumetricGlow: true,
    enableGrainOverlay: true,
    springStiffnessMultiplier: 1.0,
  },
  MEDIUM: {
    tier: "MEDIUM",
    enableParticles: true,
    particleCount: 30,
    enableMouseSpotlight: true,
    enableHeavyBlur: true,
    enableContinuousEarthRotation: true,
    enableVolumetricGlow: false,
    enableGrainOverlay: false,
    springStiffnessMultiplier: 0.8,
  },
  LOW: {
    tier: "LOW",
    enableParticles: false,
    particleCount: 0,
    enableMouseSpotlight: false,
    enableHeavyBlur: false,
    enableContinuousEarthRotation: false,
    enableVolumetricGlow: false,
    enableGrainOverlay: false,
    springStiffnessMultiplier: 0.5,
  },
};

const PerformanceContext = createContext<PerformanceFlags>(TIER_FLAGS.HIGH);

export const AdaptivePerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<PerformanceFlags>(TIER_FLAGS.HIGH);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSmallScreen = window.innerWidth < 768;

    const detectHardwareTier = (): PerformanceTier => {
      // 1. Mobile viewport -> always LOW for maximum performance
      if (isSmallScreen) {
        return "LOW";
      }

      // 2. Reduced motion preference -> LOW
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "LOW";
      }

      const concurrency = navigator.hardwareConcurrency || 4;
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

      // Low-end mobile or budget device (<4 cores or <3GB RAM) -> LOW
      if (concurrency < 4 || memory < 3) {
        return "LOW";
      }

      // Mid-range mobile/tablet or 4-core desktop -> MEDIUM
      if (isTouch || concurrency <= 4 || memory <= 4) {
        return "MEDIUM";
      }

      // High-performance desktop / gaming PC / MacBook / Flagship -> HIGH
      return "HIGH";
    };

    const initialTier = detectHardwareTier();
    setFlags(TIER_FLAGS[initialTier]);

    // Skip FPS monitor on mobile — already at LOW tier, no downgrade possible
    if (isSmallScreen) return;

    // Real-time Frame Drop Monitor (Downgrade tier if under sustained frame pressure)
    let frameCount = 0;
    let lastTime = performance.now();
    let lowFpsFrames = 0;
    let animId: number;

    const checkFps = () => {
      const now = performance.now();
      const delta = now - lastTime;
      frameCount++;

      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        frameCount = 0;
        lastTime = now;

        if (fps < 32) {
          lowFpsFrames++;
          if (lowFpsFrames >= 3) {
            // Sustainably dropping FPS -> Downgrade tier
            setFlags((prev) => {
              if (prev.tier === "HIGH") return TIER_FLAGS.MEDIUM;
              if (prev.tier === "MEDIUM") return TIER_FLAGS.LOW;
              return prev;
            });
            lowFpsFrames = 0;
          }
        } else {
          lowFpsFrames = Math.max(0, lowFpsFrames - 1);
        }
      }

      animId = requestAnimationFrame(checkFps);
    };

    animId = requestAnimationFrame(checkFps);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const value = useMemo(() => flags, [flags]);

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

export const usePerformanceTier = (): PerformanceFlags => useContext(PerformanceContext);
