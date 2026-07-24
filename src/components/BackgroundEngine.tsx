"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SectionMood = "hero" | "journey" | "projects" | "engineering-stack" | "professional-growth" | "ai-assistant" | "contact";

interface MoodConfig {
  name: SectionMood;
  accent: string;
  glowRgb: string;
  secondaryGlowRgb: string;
  gradientBg: string;
  blueprintOpacity: number;
  radarVisible?: boolean;
  circuitVisible?: boolean;
  hologramVisible?: boolean;
  dataStreamVisible?: boolean;
}

const SECTION_MOODS: Record<SectionMood, MoodConfig> = {
  hero: {
    name: "hero",
    accent: "#00E5FF", // Electric Cyan
    glowRgb: "0, 229, 255",
    secondaryGlowRgb: "0, 112, 243",
    gradientBg: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 229, 255, 0.12), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.08,
  },
  journey: {
    name: "journey",
    accent: "#00F0CB", // Dark Teal
    glowRgb: "0, 240, 203",
    secondaryGlowRgb: "13, 148, 136",
    gradientBg: "radial-gradient(ellipse 70% 60% at 20% 40%, rgba(0, 240, 203, 0.1), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.12,
  },
  projects: {
    name: "projects",
    accent: "#3B82F6", // Electric Blue
    glowRgb: "59, 130, 246",
    secondaryGlowRgb: "0, 229, 255",
    gradientBg: "radial-gradient(circle 800px at 80% 30%, rgba(59, 130, 246, 0.12), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.1,
    radarVisible: true,
  },
  "engineering-stack": {
    name: "engineering-stack",
    accent: "#9333EA", // Dark Indigo / Purple
    glowRgb: "147, 51, 234",
    secondaryGlowRgb: "168, 85, 247",
    gradientBg: "radial-gradient(circle 900px at 50% 50%, rgba(147, 51, 234, 0.1), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.08,
    circuitVisible: true,
  },
  "professional-growth": {
    name: "professional-growth",
    accent: "#10B981", // Dark Emerald
    glowRgb: "16, 185, 129",
    secondaryGlowRgb: "52, 211, 153",
    gradientBg: "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(16, 185, 129, 0.1), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.09,
    hologramVisible: true,
  },
  "ai-assistant": {
    name: "ai-assistant",
    accent: "#8B5CF6", // Dark Violet
    glowRgb: "139, 92, 246",
    secondaryGlowRgb: "0, 229, 255",
    gradientBg: "radial-gradient(circle 700px at 50% 40%, rgba(139, 92, 246, 0.12), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.08,
    dataStreamVisible: true,
  },
  contact: {
    name: "contact",
    accent: "#38BDF8", // Blue White
    glowRgb: "56, 189, 248",
    secondaryGlowRgb: "0, 229, 255",
    gradientBg: "radial-gradient(circle 600px at 50% 60%, rgba(56, 189, 248, 0.08), rgba(5, 5, 5, 0) 70%)",
    blueprintOpacity: 0.06,
  },
};

export default function BackgroundEngine() {
  const [currentSection, setCurrentSection] = useState<SectionMood>("hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Section Observer to trigger dynamic background morphing
  useEffect(() => {
    const sectionIds: SectionMood[] = [
      "hero",
      "journey",
      "projects",
      "engineering-stack",
      "professional-growth",
      "ai-assistant",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionMood;
            if (sectionIds.includes(id)) {
              setCurrentSection(id);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeMood = SECTION_MOODS[currentSection] || SECTION_MOODS.hero;

  // Layer 3: Interactive Particle Engine Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Array
    const particleCount = 65;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let currentRgb = activeMood.glowRgb;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly parse current glow RGB
      currentRgb = activeMood.glowRgb;

      // Draw Particles & Connections
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentRgb}, ${p.alpha * 0.7})`;
        ctx.fill();

        // Connect nearby particles with subtle light lines
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${currentRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMood.glowRgb]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030509]">
      
      {/* LAYER 1: Deep Dynamic Gradient & Atmospheric Light Orbs */}
      <motion.div
        key={`gradient-${currentSection}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ background: activeMood.gradientBg }}
      />

      {/* Floating Light Orb 1 (Primary Accent) */}
      <motion.div
        animate={{
          x: ["-10%", "10%", "-5%"],
          y: ["-5%", "15%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(${activeMood.glowRgb}, 0.5) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* Floating Light Orb 2 (Secondary Accent) */}
      <motion.div
        animate={{
          x: ["10%", "-15%", "5%"],
          y: ["10%", "-10%", "5%"],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(${activeMood.secondaryGlowRgb}, 0.4) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {/* LAYER 2: Animated Blueprint Grid & Technical Lines */}
      <div 
        className="absolute inset-0 bg-grid-pattern transition-opacity duration-1000" 
        style={{ opacity: activeMood.blueprintOpacity }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* LAYER 3: Animated Canvas Floating Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* LAYER 4: Ambient Volumetric Lighting / Spotlight */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(${activeMood.glowRgb}, 0.04) 0%, transparent 100%)`
        }}
      />

      {/* LAYER 5: Chapter Specific HUD Features */}
      {/* 5A: Radar Sweep for Projects Chapter */}
      <AnimatePresence>
        {activeMood.radarVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-500/20 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-blue-500/40 to-transparent origin-left animate-[spin_8s_linear_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5B: Neural Circuit Mesh for Tech Ecosystem */}
      <AnimatePresence>
        {activeMood.circuitVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 5C: Hologram Rays for Professional Growth */}
      <AnimatePresence>
        {activeMood.hologramVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* LAYER 6: Film Grain & CRT Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: 'repeat' }} 
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-15 pointer-events-none mix-blend-overlay" />

      {/* LAYER 7: Soft Futuristic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030509_90%)] pointer-events-none opacity-90" />
    </div>
  );
}
