"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SectionId =
  | "hero"
  | "journey"
  | "projects"
  | "engineering-stack"
  | "professional-growth"
  | "ai-assistant"
  | "contact";

interface SectionColorConfig {
  rgb: string;
  hex: string;
}

// Section-aware color mapping (Soft, premium glass-like hues)
const SECTION_COLORS: Record<SectionId, SectionColorConfig> = {
  hero: { rgb: "0, 229, 255", hex: "#00E5FF" }, // Soft Cyan
  journey: { rgb: "0, 240, 203", hex: "#00F0CB" }, // Teal
  projects: { rgb: "59, 130, 246", hex: "#3B82F6" }, // Electric Blue
  "engineering-stack": { rgb: "147, 51, 234", hex: "#9333EA" }, // Purple
  "professional-growth": { rgb: "16, 185, 129", hex: "#10B981" }, // Emerald
  "ai-assistant": { rgb: "139, 92, 246", hex: "#8B5CF6" }, // Violet
  contact: { rgb: "56, 189, 248", hex: "#38BDF8" }, // Soft White-Blue
};

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, .group, [data-interactive="true"]'
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Section Observer to automatically update cursor accent hue
    const sectionIds: SectionId[] = [
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
            const id = entry.target.id as SectionId;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  const colorConfig = SECTION_COLORS[activeSection] || SECTION_COLORS.hero;

  return (
    <>
      {/* THREE-LAYER CURSOR LIGHTING SYSTEM */}

      {/* Layer 3: Subtle Ambient Spotlight (75px radius / 150px box, max 0.08 opacity) */}
      <motion.div
        className="fixed top-0 left-0 w-[150px] h-[150px] rounded-full pointer-events-none z-[40] mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(${colorConfig.rgb}, ${
            isHovering ? 0.08 : 0.05
          }) 0%, rgba(${colorConfig.rgb}, 0.01) 70%, transparent 100%)`,
          filter: "blur(16px)",
        }}
        animate={{
          x: mousePos.x - 75,
          y: mousePos.y - 75,
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 24,
          mass: 0.5,
        }}
      />

      {/* Layer 2: Soft Inner Core Glow (35px radius / 70px box) */}
      <motion.div
        className="fixed top-0 left-0 w-[70px] h-[70px] rounded-full pointer-events-none z-[41] mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(${colorConfig.rgb}, ${
            isHovering ? 0.12 : 0.07
          }) 0%, rgba(${colorConfig.rgb}, 0) 75%)`,
          filter: "blur(8px)",
        }}
        animate={{
          x: mousePos.x - 35,
          y: mousePos.y - 35,
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.35,
        }}
      />

      {/* Layer 1: Small Bright Center Core (~10px dot & precision HUD ring) */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border pointer-events-none z-[100] mix-blend-screen flex items-center justify-center"
        style={{
          borderColor: `rgba(${colorConfig.rgb}, ${isHovering ? 0.6 : 0.3})`,
        }}
        animate={{
          x: mousePos.x - 14,
          y: mousePos.y - 14,
          scale: isHovering ? 1.25 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 20,
          mass: 0.25,
        }}
      >
        {/* Core 10px Center Light */}
        <div
          className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
          style={{
            backgroundColor: colorConfig.hex,
            boxShadow: `0 0 10px rgba(${colorConfig.rgb}, ${isHovering ? 0.9 : 0.5})`,
          }}
        />
      </motion.div>
    </>
  );
}
