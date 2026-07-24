"use client";

import { motion } from "framer-motion";

export default function Architecture() {
  const rightNodes = [
    { label: "AI Service", sub: "(OpenAI)", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: "Database", sub: "(Supabase DB)", icon: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5 M21 5c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z" },
    { label: "Auth", sub: "(Supabase Auth)", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label: "Storage", sub: "(Supabase Storage)", icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col items-center justify-center pt-8"
    >
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 w-full relative z-10">
          
          {/* Left: Client */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-32 h-24 rounded-2xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center gap-2 hover:border-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all cursor-default z-20"
          >
            <span className="text-sm font-semibold text-white">Client</span>
            <span className="text-[10px] font-mono text-secondary/50">(Next.js)</span>
          </motion.div>

          {/* Connection Client -> API */}
          <div className="hidden md:block absolute left-1/2 -translate-x-[110%] w-24 h-[1px] bg-white/10 z-10">
             <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full h-full bg-accent/50 origin-left"
              />
          </div>

          {/* Center: API Layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-32 h-24 rounded-2xl border border-accent/40 bg-accent/5 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:border-accent hover:bg-accent/10 transition-all cursor-default z-20"
          >
            <span className="text-sm font-semibold text-white">API Layer</span>
            <span className="text-[10px] font-mono text-accent/70">(Next.js API)</span>
          </motion.div>

          {/* Connection API -> Right Nodes */}
          <div className="hidden md:block absolute right-[25%] top-1/2 -translate-y-1/2 w-[1px] h-[75%] bg-white/10 z-10" />

          {/* Right: Services */}
          <div className="flex flex-col gap-6 relative z-20">
            {rightNodes.map((node, i) => (
              <div key={i} className="flex items-center gap-8 relative">
                {/* Horizontal line to central vertical line */}
                <div className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/10">
                   <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="w-full h-full bg-accent/50 origin-left"
                  />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="w-40 h-16 rounded-xl border border-white/10 bg-[#050505] flex items-center gap-3 px-4 hover:border-accent hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all cursor-default group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/50 group-hover:text-accent transition-colors">
                    <path d={node.icon} />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">{node.label}</span>
                    <span className="text-[9px] font-mono text-secondary/50">{node.sub}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-xs text-secondary/50 font-mono tracking-widest text-center uppercase"
        >
          Scalable, secure and modern architecture built for performance.
        </motion.p>
    </motion.div>
  );
}
