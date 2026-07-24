"use client";

import { motion } from "framer-motion";

interface AiCoreGraphicProps {
  progress: number; // 0 to 100
  activePhase: number;
  isComplete: boolean;
}

const getStatusText = (phase: number, isComplete: boolean) => {
  if (isComplete) return "READY";
  switch (phase) {
    case 1:
      return "BOOTING OS";
    case 2:
      return "SCANNING";
    case 3:
      return "ANALYZING";
    case 4:
      return "CONNECTING";
    case 5:
      return "INITIALIZING";
    case 6:
      return "READY";
    default:
      return "INITIALIZING";
  }
};

export default function AiCoreGraphic({ progress, activePhase, isComplete }: AiCoreGraphicProps) {
  const statusText = getStatusText(activePhase, isComplete);

  return (
    <motion.div 
      key={activePhase}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
      className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center pointer-events-none"
    >
      
      {/* Outer Volumetric Core Glow (1.6s scale pulse) */}
      <motion.div
        animate={{
          scale: isComplete ? [1.1, 1.6, 1.35] : [1, 1.12, 1],
          opacity: isComplete ? [0.6, 0.95, 0] : [0.25, 0.5, 0.25],
        }}
        transition={{ duration: isComplete ? 1.2 : 1.6, repeat: isComplete ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00E5FF]/40 via-purple-600/40 to-[#00E5FF]/40 blur-3xl mix-blend-screen"
      />

      {/* Outer Ring 1: Continuous 18 Seconds Per Rotation */}
      <motion.div
        animate={{ 
          rotate: 360, 
          scale: activePhase >= 1 ? 1 : 0.85,
          opacity: activePhase >= 1 ? 0.85 : 0.15 
        }}
        transition={{ 
          rotate: { duration: 18, repeat: Infinity, ease: "linear" }, 
          scale: { duration: 1.6, ease: "easeInOut" },
          opacity: { duration: 1.4 } 
        }}
        className="absolute inset-1 rounded-full border border-dashed border-cyan-400/30"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-400/70 tracking-widest bg-[#030509] px-2">
          AI.CORE // V1.0
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[8px] font-mono text-purple-400/70 tracking-widest bg-[#030509] px-2">
          NEURAL MATRIX
        </div>
      </motion.div>

      {/* Outer Ring 2: Rotating Counter-Clockwise Segment (14s continuous) */}
      <motion.div
        animate={{ 
          rotate: -360, 
          scale: activePhase >= 2 ? 1 : 0.75,
          opacity: activePhase >= 2 ? 0.9 : 0
        }}
        transition={{ 
          rotate: { duration: 14, repeat: Infinity, ease: "linear" }, 
          scale: { duration: 1.6, ease: "easeInOut" },
          opacity: { duration: 1.4 } 
        }}
        className="absolute inset-7 rounded-full border-2 border-purple-500/40 border-t-transparent border-b-transparent"
      />

      {/* Middle Ring 3: Concentric Target Lines (1.6s scale transition) */}
      <motion.div
        animate={{ 
          scale: activePhase >= 3 ? (0.8 + (progress / 100) * 0.35) : 0.65,
          opacity: activePhase >= 3 ? 1 : 0.1
        }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className="absolute inset-12 rounded-full border border-cyan-400/40 flex items-center justify-center"
      >
        <div className="w-full h-[1px] bg-cyan-400/30 absolute" />
        <div className="w-[1px] h-full bg-cyan-400/30 absolute" />
      </motion.div>

      {/* Center Neural Node Mesh & Connecting Laser Rays */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
        <g stroke="currentColor" strokeWidth="0.8" className="text-cyan-400/50">
          {activePhase >= 1 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="50" y2="60" strokeDasharray="2 2" />}
          {activePhase >= 2 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="150" y2="60" strokeDasharray="2 2" />}
          {activePhase >= 3 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="160" y2="130" strokeDasharray="2 2" />}
          {activePhase >= 4 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="40" y2="130" strokeDasharray="2 2" />}
          {activePhase >= 5 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="100" y2="40" strokeDasharray="2 2" />}
          {activePhase >= 5 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} x1="100" y1="100" x2="100" y2="160" strokeDasharray="2 2" />}
        </g>

        {/* Pulsing Outer Nodes */}
        {activePhase >= 1 && (
          <motion.circle 
            animate={{ scale: [1, 1.4, 1], fill: ["#00E5FF", "#ffffff", "#00E5FF"] }}
            transition={{ duration: 1.4 }}
            cx="50" cy="60" r="3.5" fill="#00E5FF" 
          />
        )}
        {activePhase >= 2 && (
          <motion.circle 
            animate={{ scale: [1, 1.4, 1], fill: ["#9333EA", "#ffffff", "#9333EA"] }}
            transition={{ duration: 1.4 }}
            cx="150" cy="60" r="3.5" fill="#9333EA" 
          />
        )}
        {activePhase >= 3 && (
          <motion.circle 
            animate={{ scale: [1, 1.4, 1], fill: ["#00E5FF", "#ffffff", "#00E5FF"] }}
            transition={{ duration: 1.4 }}
            cx="160" cy="130" r="3.5" fill="#00E5FF" 
          />
        )}
        {activePhase >= 4 && (
          <motion.circle 
            animate={{ scale: [1, 1.4, 1], fill: ["#9333EA", "#ffffff", "#9333EA"] }}
            transition={{ duration: 1.4 }}
            cx="40" cy="130" r="3.5" fill="#9333EA" 
          />
        )}
        {activePhase >= 5 && <circle cx="100" cy="40" r="3" fill="#00E5FF" />}
        {activePhase >= 5 && <circle cx="100" cy="160" r="3" fill="#9333EA" />}
      </svg>

      {/* Central Holographic Processor Orb (1.6s scale transition) */}
      <motion.div
        animate={{
          scale: isComplete ? 1.55 : [0.95, 1.05, 0.95],
          boxShadow: isComplete
            ? "0 0 80px rgba(0, 229, 255, 1), inset 0 0 40px rgba(255, 255, 255, 0.95)"
            : "0 0 35px rgba(0, 229, 255, 0.6), inset 0 0 20px rgba(147, 51, 234, 0.6)",
        }}
        transition={{ duration: isComplete ? 1.2 : 1.6, repeat: isComplete ? 0 : Infinity, ease: "easeInOut" }}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#00E5FF] via-purple-600 to-cyan-300 relative flex items-center justify-center z-10 border-2 border-white/60 shadow-2xl p-2 text-center"
      >
        {/* Dynamic Status Text */}
        <motion.span 
          key={statusText}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[9px] sm:text-[10px] font-mono font-bold text-white tracking-widest uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
        >
          {statusText}
        </motion.span>
      </motion.div>

    </motion.div>
  );
}
