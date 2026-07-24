"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Technology } from "@/data/stack";
import { PROJECTS, Project } from "@/data/projects";
import TechLogo from "./TechLogo";

interface TechnologyDetailPanelProps {
  technology: Technology;
  onClose: () => void;
}

export default function TechnologyDetailPanel({ technology, onClose }: TechnologyDetailPanelProps) {
  // Find linked project details
  const linkedProjects: Project[] = PROJECTS.filter(p => technology.usedInProjects.includes(p.id));

  return (
    <motion.div
      id="technology-detail-panel"
      initial={{ opacity: 0, height: 0, y: 10 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-2xl border border-purple-500/30 bg-[#080716]/75 backdrop-blur-2xl p-6 lg:p-8 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.15)] my-4 group"
    >
      {/* Glass Reflection Sweep Beam on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl z-20">
        <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
      </div>
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Top Right Close Button */}
      <button 
        onClick={onClose}
        aria-label="Close detail panel"
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg border border-white/10 bg-black/40 hover:bg-white/10 hover:border-accent/40 text-secondary hover:text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* COLUMN 1: Logo, Title & Experience Level (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            {/* Blueprint Corner Bracket Logo Frame */}
            <div className="relative w-24 h-24 shrink-0 rounded-xl bg-[#030407] border border-white/10 flex items-center justify-center shadow-inner">
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-accent" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-accent" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-accent" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-accent" />
              <TechLogo id={technology.id} className="w-12 h-12" />
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <h3 className="text-2xl font-heading font-bold text-white tracking-wide">{technology.name}</h3>
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase">{technology.category}</span>
            </div>
          </div>

          <p className="text-xs text-secondary/80 leading-relaxed max-w-sm">
            {technology.tagline}
          </p>

          {/* Experience Level */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">EXPERIENCE LEVEL</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white">{technology.proficiency}</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div 
                    key={step}
                    className={`h-1.5 w-5 rounded-full transition-all ${
                      step <= technology.proficiencyScore ? "bg-accent shadow-[0_0_8px_rgba(0,229,255,0.4)]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Used In Projects (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase">USED IN PROJECTS</span>

          <div className="flex flex-col gap-2.5">
            {linkedProjects.length > 0 ? (
              linkedProjects.map((project) => (
                <Link 
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group flex items-center justify-between p-3 rounded-xl border border-white/10 bg-[#090c12] hover:border-accent/40 hover:bg-[#0e121c] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg border border-white/10 bg-black/60 overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white tracking-wide group-hover:text-accent transition-colors truncate">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-secondary/60 truncate">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>

                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-secondary/40 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 ml-2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              ))
            ) : (
              <div className="text-xs text-secondary/50 italic p-3 border border-white/5 rounded-xl bg-white/[0.01]">
                Not directly linked to active core portfolio case studies.
              </div>
            )}
          </div>

          {linkedProjects.length > 0 && (
            <Link
              href={`/projects/${linkedProjects[0].id}`}
              className="mt-2 text-center text-[10px] font-mono tracking-widest text-accent uppercase border border-accent/20 hover:border-accent hover:bg-accent/10 px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              VIEW RELATED PROJECTS ↗
            </Link>
          )}
        </div>

        {/* COLUMN 3: Key Libraries & Uses (3/12) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Key Libraries */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase">KEY LIBRARIES</span>
            <div className="flex flex-wrap gap-1.5">
              {technology.libraries.map((lib, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 text-[9px] font-mono tracking-wider uppercase text-secondary/90 border border-white/10 rounded bg-white/[0.02]"
                >
                  {lib}
                </span>
              ))}
            </div>
          </div>

          {/* What I Use It For */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">WHAT I USE IT FOR</span>
            <ul className="flex flex-col gap-1.5">
              {technology.purpose.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-secondary/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
