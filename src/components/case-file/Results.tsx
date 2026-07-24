"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// A simple animated counter component
function Counter({ value, suffix = "", delay = 0 }: { value: number, suffix?: string, delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Wait for delay
      if (progress < delay * 1000) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      const activeProgress = progress - (delay * 1000);
      const duration = 1500; // 1.5s
      
      if (activeProgress < duration) {
        const easeProgress = 1 - Math.pow(1 - activeProgress / duration, 4);
        setCount(Math.floor(easeProgress * value));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, delay]);

  return <span>{count}{suffix}</span>;
}

export default function Results() {
  const metrics = [
    { value: 94, isNumber: true, suffix: "%", label: "ATS Accuracy", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" },
    { value: 500, isNumber: true, suffix: "+", label: "Resume Tests", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
    { value: 95, isNumber: true, suffix: "", label: "Performance", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { value: 100, isNumber: true, suffix: "", label: "Accessibility", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
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
        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">04</span>
        <h3 className="text-sm font-heading font-bold text-white tracking-widest uppercase">Results</h3>
      </div>
      
      <div className="w-full p-8 lg:p-12 rounded-2xl bg-[#080808] border border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {metrics.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-4 text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/50 group-hover:text-accent transition-colors">
                <path d={m.icon} />
              </svg>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-3xl font-bold text-white group-hover:text-accent transition-colors">
                  <Counter value={m.value as number} suffix={m.suffix} delay={0.2} />
                </span>
                <span className="text-[10px] font-mono text-secondary/60 uppercase tracking-widest mt-2">{m.label}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Status Metric */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="col-span-2 md:col-span-4 flex items-center justify-center gap-4 text-center p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 mt-4"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Deployment: Production</span>
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
