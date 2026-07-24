"use client";

import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

interface RightSidebarProps {
  scrollProgress: MotionValue<number>;
}

const CHECKPOINTS = [
  { id: "curiosity", label: "Curiosity", threshold: 0.05, margin: "ml-0" },
  { id: "projects", label: "Projects", threshold: 0.2, margin: "ml-4" },
  { id: "failures", label: "Failures", threshold: 0.35, margin: "ml-1" },
  { id: "communities", label: "Communities", threshold: 0.5, margin: "ml-6" },
  { id: "hackathons", label: "Hackathons", threshold: 0.65, margin: "ml-3" },
  { id: "leadership", label: "Leadership", threshold: 0.8, margin: "ml-5" },
  { id: "engineering", label: "Engineering", threshold: 0.95, margin: "ml-2" },
];

export default function RightSidebar({ scrollProgress }: RightSidebarProps) {
  // Convert scroll progress (0-1) to percentage string (0%-100%)
  const percentage = useTransform(scrollProgress, [0, 1], [0, 100]);
  const displayPercentage = useTransform(percentage, (v) => `${Math.min(100, Math.max(0, Math.round(v)))}%`);

  // Track active index based on scroll
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    let newIndex = 0;
    for (let i = CHECKPOINTS.length - 1; i >= 0; i--) {
      if (latest >= CHECKPOINTS[i].threshold) {
        newIndex = i;
        break;
      }
    }
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <div className="sticky top-24 flex flex-col max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden hide-scrollbar gap-4 py-2">
      {/* Top System Tag */}
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-secondary/40 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          SYS.JOURNEY_PROGRESS_01
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-2">
        <h3 className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase mb-1">
          Journey Progress
        </h3>
        <motion.div className="text-4xl font-heading font-extrabold text-[#00E5FF] tracking-tight mb-1">
          {displayPercentage}
        </motion.div>
        <p className="text-xs text-secondary/50 leading-relaxed max-w-[200px]">
          And this is just the beginning.
        </p>
      </div>

      {/* Mini-map */}
      <div className="relative mb-2 flex-1">
        {/* Wavy dashed line connecting nodes */}
        <svg className="absolute left-1.5 top-2 w-[100px] h-[220px] opacity-20" preserveAspectRatio="none" viewBox="0 0 100 220">
          <path
            d="M 0 0 C 40 15, 50 40, 50 65 C 50 90, 0 115, 20 140 C 40 165, 70 190, 30 215"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </svg>

        <div className="flex flex-col gap-4 relative z-10">
          {CHECKPOINTS.map((checkpoint, i) => {
            const isActive = i <= activeIndex;
            return (
              <div key={checkpoint.id} className={`flex items-center gap-2.5 ${checkpoint.margin}`}>
                <div
                  className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive ? "border-[#00E5FF] bg-[#00E5FF]/20 shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "border-white/20 bg-transparent"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#00E5FF]" : "bg-white/30"
                    }`}
                  />
                </div>
                <span
                  className={`text-[11px] font-mono transition-colors duration-300 ${
                    isActive ? "text-white font-bold" : "text-secondary/40"
                  }`}
                >
                  {checkpoint.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Box */}
      <div className="p-3.5 border border-white/10 bg-white/[0.02] rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/10 opacity-50" />
        <div className="text-[8px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold mb-1">NOTE</div>
        <p className="text-[11px] text-secondary/70 leading-relaxed">
          Every step has shaped the engineer and problem solver I am today.
        </p>
      </div>
    </div>
  );
}
