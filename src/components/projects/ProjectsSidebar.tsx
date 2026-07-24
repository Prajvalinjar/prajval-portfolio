"use client";

import { ProjectCategory } from "@/data/projects";

interface ProjectsSidebarProps {
  activeCategory: ProjectCategory | "All";
  setActiveCategory: (category: ProjectCategory | "All") => void;
  counts: Record<string, number>;
}

const CATEGORY_ICONS = {
  All: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  AI: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  ),
  "Data Analytics": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="M18 17V9"></path>
      <path d="M13 17V5"></path>
      <path d="M8 17v-3"></path>
    </svg>
  ),
  "Full Stack": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  ),
  IoT: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20"></path>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Hackathon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  )
};

export default function ProjectsSidebar({ activeCategory, setActiveCategory, counts }: ProjectsSidebarProps) {
  return (
    <div className="sticky top-24 flex flex-col max-h-[calc(100vh-7rem)] overflow-y-auto hide-scrollbar gap-4 py-2">
      
      {/* Top System Tag */}
      <div className="flex justify-end mb-1">
        <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-secondary/40 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          SYS.PROJECT_CENTER_02
        </div>
      </div>

      {/* Filter Box */}
      <div className="w-full rounded-2xl border border-white/10 bg-[#060810]/80 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">Filter By</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/40">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </div>
        
        <div className="flex flex-col p-2 gap-1">
          {Object.entries(counts).map(([category, count]) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category as ProjectCategory | "All")}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive ? "bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF]" : "border border-transparent hover:bg-white/[0.04] text-secondary/70 hover:text-white"
                }`}
              >
                <div className={`flex items-center gap-2.5 ${isActive ? "text-[#00E5FF]" : "text-secondary/60"}`}>
                  {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
                  <span className={`text-[12px] font-mono font-medium tracking-wide ${isActive ? "text-[#00E5FF] font-bold" : ""}`}>
                    {category === "IoT" ? "IoT / Hardware" : category === "All" ? "All Projects" : `${category} Projects`}
                  </span>
                </div>
                <div className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                  isActive ? "bg-[#00E5FF]/20 text-[#00E5FF] font-bold" : "bg-white/5 text-secondary/40"
                }`}>
                  {count.toString().padStart(2, '0')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded AI Guide */}
      <div className="w-full rounded-2xl bg-[#060810]/90 backdrop-blur-md border border-white/10 p-4 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono tracking-widest text-white uppercase font-bold">AI Guide</h4>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[9px] font-mono text-[#00E5FF] tracking-widest uppercase">Online</span>
          </div>
        </div>

        {/* AI Graphic */}
        <div className="w-full flex justify-center mb-3">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-[#00E5FF]/5 border border-[#00E5FF]/20">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse" />
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 32 32">
              <path d="M16 11 L11 20 L21 20 Z" fill="none" stroke="currentColor" className="text-[#00E5FF]" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        <p className="text-[11px] text-secondary/70 mb-3">
          Looking for something specific? Try asking me:
        </p>
        
        <div className="flex flex-col gap-1.5 mb-3">
          {["Show Best Project", "Show AI Projects", "Show Architecture", "Open ResumeIQ"].map((action) => (
            <button
              key={action}
              onClick={() => {
                const element = document.getElementById("ai-assistant");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/30 transition-all duration-300 group/btn"
            >
              <span className="text-[11px] font-mono text-secondary/70 group-hover/btn:text-[#00E5FF] transition-colors">
                {action}
              </span>
              <span className="text-xs text-secondary/40 group-hover/btn:text-[#00E5FF] group-hover/btn:translate-x-1 transition-all">→</span>
            </button>
          ))}
        </div>

        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Ask anything about projects..." 
            className="w-full bg-[#050505] border border-white/10 rounded-lg pl-3 pr-8 py-2 text-[11px] text-white placeholder:text-secondary/30 outline-none focus:border-[#00E5FF]/50 transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-[#00E5FF] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
