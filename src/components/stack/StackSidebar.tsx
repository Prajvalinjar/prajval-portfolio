"use client";

import { motion } from "framer-motion";

export default function StackSidebar() {
  const QUESTIONS = [
    "What technologies do you know?",
    "Which projects use OpenAI?",
    "Show backend stack.",
    "What is your strongest skill?",
    "Which technology are you currently learning?",
    "Compare Python and Java experience."
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      
      <div className="w-full border border-white/10 bg-[#070914]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">STACK ASSISTANT</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-accent/60 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
            <div className="w-1 h-4 bg-accent rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
            <div className="w-1 h-2 bg-accent/40 rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 relative">
          {/* subtle background scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
          
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-white tracking-wide">Ask me anything about my tech stack</h4>
            <p className="text-xs text-secondary/60">Portfolio AI is ready to analyze the engineering knowledge graph.</p>
          </div>

          <div className="flex flex-col gap-2">
            {QUESTIONS.map((q, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 4, backgroundColor: "rgba(147,51,234,0.12)" }}
                className="text-left w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono text-secondary hover:text-white hover:border-purple-500/40 transition-all group flex items-start gap-3 cursor-pointer active:scale-95"
              >
                <div className="mt-0.5 w-3 h-3 rounded-full border border-secondary/30 flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-accent transition-colors" />
                </div>
                <span className="leading-snug">{q}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
