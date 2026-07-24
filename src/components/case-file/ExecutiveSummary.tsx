"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";

export default function ExecutiveSummary() {
  const project = PROJECTS.find(p => p.id === "resumeiq-ai");
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full min-h-[calc(100vh-12rem)] flex flex-col xl:flex-row gap-12 lg:gap-16 items-start justify-center"
    >
      {/* Left Column: Metadata & Actions */}
      <div className="flex-1 flex flex-col justify-center max-w-xl xl:pt-12">
        
        {/* Archive Title Block */}
        <div className="flex flex-col mb-8">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase mb-4">CHAPTER 03 // CASE FILE</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-3">
            {project.title}
          </h2>
          <p className="text-lg font-medium text-secondary/80">{project.subtitle}</p>
        </div>

        {/* Project Information Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8 pb-8 border-b border-white/5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold text-white">Production</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Duration</span>
            <span className="text-xs font-semibold text-white">{project.duration}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Role</span>
            <span className="text-xs font-semibold text-white leading-relaxed">Full Stack Developer<br/>UI/UX Designer<br/>AI Integration</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Platform</span>
            <span className="text-xs font-semibold text-white">Web Application</span>
          </div>

          <div className="flex flex-col gap-1.5 col-span-2">
            <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Stack</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI", "Vercel"].map((tech, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono text-secondary/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Short Product Summary */}
        <p className="text-sm text-secondary/70 leading-relaxed mb-10">
          ResumeIQ AI is an AI-powered resume intelligence platform that analyzes resumes, predicts ATS compatibility, extracts skills, generates AI suggestions and provides downloadable reports to help candidates improve their chances of getting interviews.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-[#050505] hover:bg-accent/90 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Live Demo
          </motion.a>
          
          <motion.a 
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub Repository
          </motion.a>
        </div>
      </div>

      {/* Right Column: Large Premium Preview */}
      <div className="w-full xl:w-[55%] shrink-0 flex flex-col xl:pt-12">
        <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden relative group/img bg-[#030303] shadow-2xl">
          {/* Engineering Frame */}
          <div className="absolute inset-3 border border-white/5 rounded-xl z-20 pointer-events-none transition-colors group-hover/img:border-accent/30" />
          
          {/* Matte texture overlay */}
          <div className="absolute inset-0 bg-[#080808]/10 mix-blend-overlay z-10" />
          <div className="absolute inset-0 backdrop-saturate-[0.9] backdrop-contrast-[1.1] z-10 pointer-events-none" />
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover scale-[1.02] group-hover/img:scale-100 transition-transform duration-700 ease-out"
          />
        </div>
        
        <div className="flex items-center justify-between px-3 mt-4">
          <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">IMG.SRC // 2026</span>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 uppercase">Verified Deployment</span>
            <span className="text-[9px] font-mono tracking-widest text-accent/70 uppercase">Case File</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
