"use client";

import { motion } from "framer-motion";

export default function EngineeringDecisions() {
  const decisions = [
    {
      decision: "Why Next.js?",
      reason: "Performance, SEO, Developer Experience",
      tradeoff: "Learning Curve",
      result: "Faster Development & Better Performance",
    },
    {
      decision: "Why Supabase?",
      reason: "Auth, DB, Storage, Realtime in one place",
      tradeoff: "Vendor Lock-in",
      result: "Rapid Backend Development",
    },
    {
      decision: "Why OpenAI?",
      reason: "Best NLP Understanding & Suggestions",
      tradeoff: "API Cost",
      result: "High Quality AI Suggestions",
    },
    {
      decision: "Why PDF.js?",
      reason: "Client-side PDF Parsing",
      tradeoff: "Complex Parsing",
      result: "Secure & Reliable Parsing",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full pt-4"
    >
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {decisions.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-5 rounded-xl border border-white/5 bg-[#080808] hover:border-accent/30 transition-colors flex flex-col gap-4 group"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-widest text-accent uppercase">Decision</span>
              <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{item.decision}</h4>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Reason</span>
                <span className="text-[11px] text-secondary/80">{item.reason}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Trade-off</span>
                <span className="text-[11px] text-secondary/80">{item.tradeoff}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Result</span>
                <span className="text-[11px] font-medium text-white">{item.result}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
