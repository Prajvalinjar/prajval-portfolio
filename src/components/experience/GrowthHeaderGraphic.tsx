"use client";

import { motion } from "framer-motion";

export default function GrowthHeaderGraphic() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-6 p-4 px-6 rounded-2xl border border-cyan-500/20 bg-[#060912]/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.06)]"
    >
      {/* 3D Blueprint Wireframe SVG */}
      <div className="relative w-36 h-20 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full text-cyan-400 overflow-visible">
          {/* Isometric grid floor matrix */}
          <polygon points="20,80 100,40 180,80 100,120" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="1" />
          <line x1="60" y1="60" x2="140" y2="100" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
          <line x1="140" y1="60" x2="60" y2="100" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
          <line x1="100" y1="40" x2="100" y2="120" stroke="rgba(0,229,255,0.2)" strokeWidth="1" />
          
          {/* 3D Briefcase wireframe */}
          <rect x="105" y="50" width="55" height="38" rx="4" fill="#040710" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M122 50 V43 C122 40 124 38 128 38 H137 C141 38 143 40 143 43 V50" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
          <line x1="105" y1="64" x2="160" y2="64" stroke="rgba(0,229,255,0.4)" strokeWidth="1" />

          {/* 3D Graduation cap wireframe */}
          <polygon points="70,20 115,36 70,52 25,36" fill="#040710" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M42 43 V60 C42 66 98 66 98 60 V43" fill="none" stroke="#00E5FF" strokeWidth="1.2" />
          <path d="M115 36 V62 L112 74" fill="none" stroke="#FFD700" strokeWidth="1.5" />
          <circle cx="112" cy="76" r="2.5" fill="#FFD700" />
        </svg>
      </div>

      {/* Bullet Labels */}
      <div className="flex flex-col gap-2 text-xs font-mono tracking-widest text-cyan-300 font-bold uppercase">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
          LEARN
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
          APPLY
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
          GROW
        </span>
      </div>
    </motion.div>
  );
}
