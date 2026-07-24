"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES } from "@/data/stack";
import { PROJECTS, Project } from "@/data/projects";
import TechLogo from "./TechLogo";

interface TechInActionGraphProps {
  selectedTechId: string;
  setSelectedTechId: (id: string) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export default function TechInActionGraph({
  selectedTechId,
  setSelectedTechId,
  selectedProjectId,
  setSelectedProjectId
}: TechInActionGraphProps) {

  // Default to ResumeIQ AI if no project selected
  const activeProjectId = selectedProjectId || "resumeiq-ai";
  const activeProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];
  
  // Get all tech used in this project
  const projectTechs = TECHNOLOGIES.filter(t => t.usedInProjects.includes(activeProjectId));

  // Determine positions around the center in a semi-circle/circle
  const getTechPosition = (index: number, total: number) => {
    // Distribute evenly around an ellipse (wider than tall)
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // Start from top (-90deg)
    const radiusX = 260; // width radius
    const radiusY = 140; // height radius
    
    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY
    };
  };

  return (
    <div className="w-full flex flex-col gap-8 mt-16 pt-16 border-t border-white/5">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase">PROJECT TECHNOLOGY MAP</span>
          <p className="text-sm text-secondary mt-2 max-w-sm leading-relaxed">
            Select a project to visualize its underlying technology stack architecture.
          </p>
        </div>
        
        {/* Project Selector pills for desktop */}
        <div className="flex flex-wrap items-center gap-2">
          {PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-md border transition-all duration-300 ${
                activeProjectId === p.id 
                  ? 'bg-white/[0.04] border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                  : 'border-white/5 bg-white/[0.01] text-secondary/60 hover:text-white hover:border-white/10 hover:bg-white/[0.02]'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[600px] border border-white/5 bg-[#080808] rounded-xl relative overflow-hidden flex items-center justify-center">
        {/* Blueprint background lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeProjectId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                </linearGradient>
              </defs>
              <g className="origin-center translate-x-1/2 translate-y-1/2">
                {projectTechs.map((tech, i) => {
                  const pos = getTechPosition(i, projectTechs.length);
                  const isHighlighted = selectedTechId === tech.id;
                  
                  return (
                    <motion.line 
                      key={`line-${tech.id}`}
                      x1="0" 
                      y1="0" 
                      x2={pos.x} 
                      y2={pos.y}
                      stroke={isHighlighted ? "rgba(255,255,255,0.4)" : "url(#line-gradient)"}
                      strokeWidth={isHighlighted ? 1.5 : 1}
                      strokeDasharray={isHighlighted ? "none" : "2 4"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: isHighlighted ? 1 : 0.3 }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Central Project Node */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute z-20 flex flex-col items-center justify-center p-6 border border-white/20 bg-black/60 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md"
              style={{ minWidth: "180px" }}
            >
              <div className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase mb-2">CORE</div>
              <h4 className="text-base font-bold text-white uppercase tracking-wider text-center">{activeProject.title}</h4>
            </motion.div>

            {/* Orbiting Tech Nodes */}
            {projectTechs.map((tech, i) => {
              const pos = getTechPosition(i, projectTechs.length);
              const isHighlighted = selectedTechId === tech.id;
              
              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x: pos.x, y: pos.y }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 + i * 0.05 }}
                  onMouseEnter={() => setSelectedTechId(tech.id)}
                  onClick={() => {
                    setSelectedTechId(tech.id);
                    document.getElementById("technology-detail-panel")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 p-3 pr-5 rounded-xl border bg-black/40 backdrop-blur-md cursor-pointer transition-all duration-300 ${
                    isHighlighted ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105 z-30 bg-white/[0.05]' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
                  style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold transition-colors ${
                    isHighlighted ? 'text-white' : 'text-secondary'
                  }`}>
                    <TechLogo id={tech.id} className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-[80px]">
                    <span className={`text-sm font-semibold tracking-wide ${isHighlighted ? 'text-white' : 'text-white/80'}`}>{tech.name}</span>
                    <span className="text-[9px] font-mono tracking-wider text-secondary/50 uppercase truncate mt-0.5">{tech.category}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
