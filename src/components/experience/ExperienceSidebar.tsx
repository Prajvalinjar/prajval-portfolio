"use client";

import { motion } from "framer-motion";

const PROMPTS = [
  "Show Certifications",
  "Show Leadership Experience",
  "Show Hackathon Experience",
  "Show Community Work",
  "Show Volunteer Activities",
  "Show Professional Timeline",
  "What did Prajval learn from Deloitte?",
  "Show National Level Hackathon Organizer experience."
];

export default function ExperienceSidebar() {
  return (
    <div className="flex flex-col gap-6 pl-8 h-full">
      <div className="flex items-center gap-2 mb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        <span className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase">PORTFOLIO AI</span>
      </div>

      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        <p className="text-sm text-secondary/90 mb-4">
          Ask me anything<br/>about my experience
        </p>
        
        {PROMPTS.map((prompt, i) => (
          <button 
            key={i}
            className="text-left w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all text-xs text-secondary/70 hover:text-white flex items-start gap-3 group"
          >
            <div className="mt-0.5 text-secondary/40 group-hover:text-accent transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-12 flex flex-col items-center justify-center gap-6 relative">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute inset-2 rounded-full border border-white/10 border-dashed animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-6 rounded-full bg-accent/5 blur-xl" />
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(6,182,212,1)]" />
        </div>
        <p className="text-[10px] font-mono text-secondary/40 text-center tracking-widest uppercase px-4 leading-relaxed">
          I'm here to help you explore my growth and learning journey.
        </p>
      </div>
    </div>
  );
}
