"use client";

import { motion } from "framer-motion";

export default function Challenges() {
  const challenges = [
    {
      challenge: "PDF Parsing Inconsistencies",
      solution: "Implemented robust parsing with pdf.js and fallback logic",
    },
    {
      challenge: "AI Response Consistency",
      solution: "Engineered prompt templates and fine-tuned instructions",
    },
    {
      challenge: "ATS Logic Complexity",
      solution: "Built hybrid scoring engine (Rule-based + AI)",
    },
    {
      challenge: "Large File Handling",
      solution: "Optimized file processing and storage",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col justify-center pt-8"
    >
        
        {/* Decorative background element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-64 h-64 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-none stroke-current" strokeWidth="0.5">
            <path d="M0 100 Q 25 50 50 100 T 100 100" />
            <path d="M0 100 Q 25 70 50 100 T 100 100" />
            <path d="M0 100 Q 25 90 50 100 T 100 100" />
            <path d="M0 100 Q 25 40 50 100 T 100 100" />
          </svg>
        </div>
        
        <div className="flex flex-col gap-8 relative z-10">
          {challenges.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="mt-1 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-accent transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{item.challenge}</h4>
                <p className="text-[12px] text-secondary/70 leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>

    </motion.div>
  );
}
