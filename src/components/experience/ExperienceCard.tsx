"use client";

import { motion } from "framer-motion";

export interface Experience {
  id: string;
  logo: string;
  organization: string;
  role: string;
  timeline: string;
  contribution: string;
  impact: string;
  tags: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-[#060810]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 group hover:bg-[#0a0e1a]/85 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(16,185,129,0.15)]"
    >
      {/* Glass Reflection Sweep Beam on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl z-20">
        <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
      </div>
      {/* Dark Logo Container */}
      <div className="relative z-10 w-16 h-16 shrink-0 rounded-xl bg-[#020306] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-accent/30 overflow-hidden p-2">
        {experience.logo.startsWith("<svg") ? (
          <div className="flex items-center justify-center w-full h-full" dangerouslySetInnerHTML={{ __html: experience.logo }} />
        ) : (
          <img src={experience.logo} alt={experience.organization} className="w-10 h-10 object-contain" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-1 w-full min-w-0 pr-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 w-full">
          <h4 className="text-sm font-bold text-white tracking-wide leading-snug">{experience.organization}</h4>
          <span className="text-[10px] font-mono tracking-wider text-accent shrink-0 sm:ml-2">
            {experience.timeline}
          </span>
        </div>

        <span className="text-xs font-semibold text-accent/90 tracking-wide">{experience.role}</span>
        
        <p className="text-xs text-secondary/70 leading-relaxed mt-0.5 line-clamp-2">
          {experience.contribution}
        </p>
      </div>

      {/* Connected Right-Side Timeline Node Dot */}
      <div className="absolute right-[-17px] top-1/2 -translate-y-1/2 z-20 w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] border-2 border-[#04060c]" />
    </motion.div>
  );
}
