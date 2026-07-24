"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2024",
    title: "Community Leadership",
    description: "Started leading and organizing technical events.",
    icon: '<path d="M12 22C12 22 20 18 20 12V6L12 2L4 6V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    year: "2025",
    title: "Deloitte Certification",
    description: "Completed Data Analyst Virtual Experience with Deloitte.",
    icon: '<path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    year: "2025",
    title: "Android Internship",
    description: "Completed Android Developer Virtual Internship.",
    icon: '<polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    year: "2026",
    title: "AWS Leadership",
    description: "Took leadership role in AWS Student Builder Group.",
    icon: '<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.13 5.06001C15.22 1.15001 8.88 1.15001 4.97 5.06001C1.06 8.97001 1.06 15.31 4.97 19.22C8.88 23.13 15.22 23.13 19.13 19.22C23.04 15.31 23.04 8.97001 19.13 5.06001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    year: "2026",
    title: "WordCamp Volunteer",
    description: "Contributing to tech community as an active volunteer.",
    icon: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  {
    year: "2026+",
    title: "Continuous Growth",
    description: "Keep learning, building and sharing impact.",
    icon: '<path d="M13.5 10.5L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3H21V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 16V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  }
];

export default function ProfessionalTimeline() {
  return (
    <div className="w-full flex flex-col gap-6 mt-8">
      
      <div className="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <h3 className="text-sm font-mono font-semibold tracking-widest uppercase text-white">Professional Journey</h3>
      </div>

      <div className="relative w-full pb-8 overflow-x-auto overflow-y-hidden custom-scrollbar">
        {/* The connecting horizontal line */}
        <div className="absolute top-[39px] left-8 right-8 h-[1px] bg-white/10" />

        <div className="flex min-w-[1000px] justify-between">
          {MILESTONES.map((milestone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center flex-1 relative px-4"
            >
              {/* Node Icon */}
              <div className="relative z-10 w-20 h-20 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.02)] group hover:border-accent/50 hover:bg-white/[0.02] transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-accent transition-colors" dangerouslySetInnerHTML={{ __html: milestone.icon }} />
              </div>

              {/* Content */}
              <div className="flex flex-col text-center items-center gap-1.5 w-full max-w-[140px]">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase">{milestone.year}</span>
                <h4 className="text-sm font-bold text-white tracking-wide">{milestone.title}</h4>
                <p className="text-[11px] text-secondary/70 leading-relaxed mt-1">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
