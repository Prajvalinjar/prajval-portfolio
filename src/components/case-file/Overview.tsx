"use client";

import { motion } from "framer-motion";

export default function Overview() {
  const cards = [
    { label: "Purpose", value: "AI Resume Insights & ATS Scoring", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: "Target Users", value: "Job Seekers & Software Engineers", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
    { label: "Core Features", value: "PDF Extraction, AI Suggestions, Scoring", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
    { label: "Key Technologies", value: "Next.js, Supabase, OpenAI API", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
    { label: "Deployment", value: "Vercel Global Edge Network", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">01</span>
        <h3 className="text-sm font-heading font-bold text-white tracking-widest uppercase">Overview</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-5 rounded-xl border border-white/5 bg-[#080808] hover:border-accent/30 transition-colors flex flex-col gap-4 group"
          >
            <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/50 group-hover:text-accent transition-colors">
                <path d={card.icon} />
              </svg>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">{card.label}</span>
              <span className="text-xs font-semibold text-white leading-relaxed">{card.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
