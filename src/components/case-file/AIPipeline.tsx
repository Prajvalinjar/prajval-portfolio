"use client";

import { motion } from "framer-motion";

export default function AIPipeline() {
  const topRow = [
    { label: "Resume", sub: "(PDF)" },
    { label: "PDF Parser", sub: "(pdf.js)" },
    { label: "Text", sub: "Extraction" },
    { label: "Skill", sub: "Detection" },
    { label: "ATS Score", sub: "Prediction" },
  ];

  const bottomRow = [
    { label: "AI Suggestions", sub: "(OpenAI)" },
    { label: "Feedback", sub: "Generation" },
    { label: "Report", sub: "Generator" },
    { label: "PDF", sub: "Export" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col pt-8 relative overflow-hidden"
    >
        
        {/* Top Row */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative z-10 w-full mb-16">
          {topRow.map((block, i) => (
            <div key={i} className="flex items-center flex-1 relative">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="w-full h-16 rounded-lg border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center px-2"
              >
                <span className="text-xs font-semibold text-white">{block.label}</span>
                <span className="text-[9px] font-mono text-secondary/50">{block.sub}</span>
              </motion.div>
              
              {i < topRow.length - 1 && (
                <div className="hidden md:flex w-8 h-[1px] bg-white/10 mx-2 relative items-center justify-end shrink-0">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    className="absolute inset-0 bg-accent/50 origin-left"
                  />
                  <div className="w-1.5 h-1.5 border-t border-r border-accent/50 rotate-45 z-10" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Wrapping connector (from top right to bottom left) */}
        <div className="hidden md:block absolute top-[90px] right-12 w-[1px] h-12 bg-white/10 z-0">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="w-full h-full bg-accent/50 origin-top"
          />
        </div>
        <div className="hidden md:block absolute top-[138px] left-32 right-12 h-[1px] bg-white/10 z-0">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-full h-full bg-accent/50 origin-right"
          />
        </div>
        <div className="hidden md:block absolute top-[138px] left-32 w-[1px] h-12 bg-white/10 z-0">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.4 }}
            className="w-full h-full bg-accent/50 origin-top"
          />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b border-r border-accent/50 rotate-45" />
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-4 relative z-10 w-full pl-0 md:pl-[120px]">
          {bottomRow.map((block, i) => (
            <div key={i} className="flex items-center flex-1 max-w-[200px] relative">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
                className="w-full h-16 rounded-lg border border-accent/20 bg-accent/5 flex flex-col items-center justify-center text-center px-2"
              >
                <span className="text-xs font-semibold text-white">{block.label}</span>
                <span className="text-[9px] font-mono text-accent/50">{block.sub}</span>
              </motion.div>
              
              {i < bottomRow.length - 1 && (
                <div className="hidden md:flex w-8 h-[1px] bg-white/10 mx-2 relative items-center justify-end shrink-0">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.6 + i * 0.1 + 0.2 }}
                    className="absolute inset-0 bg-accent/50 origin-left"
                  />
                  <div className="w-1.5 h-1.5 border-t border-r border-accent/50 rotate-45 z-10" />
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-12 text-[10px] text-secondary/50 font-mono tracking-widest uppercase"
        >
          AI + Rule based engine working together to deliver accurate results.
        </motion.p>
    </motion.div>
  );
}
