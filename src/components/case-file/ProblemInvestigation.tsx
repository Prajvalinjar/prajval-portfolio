"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EVIDENCE = [
  {
    id: "rejections",
    label: "ATS Rejections",
    desc: "High rejection rates before human review",
    popup: "75% of resumes are rejected by ATS before a human ever sees them because of formatting or parsing failures.",
    type: "paper", // visual style on the board
  },
  {
    id: "structure",
    label: "Poor Structure",
    desc: "Inconsistent formatting confuses parsers",
    popup: "Many applicants use complex multi-column layouts that break basic NLP extraction logic.",
    type: "polaroid",
  },
  {
    id: "keywords",
    label: "Missing Keywords",
    desc: "Applicants miss JD alignment",
    popup: "Candidates don't know which specific industry keywords the parser is actively weighting against.",
    type: "sticky",
  },
  {
    id: "guidance",
    label: "No AI Guidance",
    desc: "Tools highlight without fixing",
    popup: "Existing tools only tell you what is wrong. They don't use generative AI to suggest exactly how to rewrite the bullet points.",
    type: "diagram",
  },
  {
    id: "conclusion",
    label: "Final Conclusion",
    desc: "Need an intelligent platform",
    popup: "ResumeIQ AI was built to solve this exact pipeline. An intelligent, NLP-powered pre-screening platform for candidates.",
    type: "conclusion",
  }
];

export default function ProblemInvestigation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const handleSolve = () => {
    setIsSolved(true);
    // Smooth scroll to engineering workspace after transition
    setTimeout(() => {
      document.getElementById("engineering")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const selectedEvidence = EVIDENCE.find(e => e.id === selectedId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">02</span>
        <h3 className="text-sm font-heading font-bold text-white tracking-widest uppercase">Problem Investigation</h3>
      </div>
      
      {/* The Investigation Container */}
      <motion.div 
        animate={{ 
          backgroundColor: isSolved ? "#050505" : "#1a1412",
          borderColor: isSolved ? "rgba(255,255,255,0.05)" : "rgba(120,53,15,0.3)" // border-amber-900/30
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full rounded-2xl border relative overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
      >
        
        {/* Background Texture for Detective Theme */}
        <AnimatePresence>
          {!isSolved && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none z-0"
            >
              {/* Dark paper texture / noise */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: 'repeat' }} />
              {/* Warm vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,10,8,0.9)_100%)]" />
              {/* Subtle amber glows */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 blur-[100px] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blueprint Reveal Effect */}
        <AnimatePresence>
          {isSolved && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 pointer-events-none z-0"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.4]" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent/20" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-accent/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Column: Evidence Timeline */}
        <div className="w-full lg:w-[35%] xl:w-[30%] p-6 lg:p-8 lg:border-r border-amber-900/20 relative z-10 flex flex-col justify-between">
          <div className="flex flex-col gap-6 relative">
            
            {/* Timeline Line */}
            <div className={`absolute left-3 top-4 bottom-4 w-[1px] ${isSolved ? 'bg-white/10' : 'bg-amber-900/30'}`} />

            {EVIDENCE.map((item, index) => (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(item.id)}
                className="relative pl-10 cursor-pointer group"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[9px] top-2 w-2.5 h-2.5 rounded-full border-2 bg-[#1a1412] transition-colors duration-300 ${
                  hoveredId === item.id || selectedId === item.id
                    ? isSolved ? "border-accent bg-accent" : "border-red-500 bg-red-500" 
                    : isSolved ? "border-white/20" : "border-amber-700/50"
                }`} />
                
                <div className="flex flex-col">
                  <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                    hoveredId === item.id ? (isSolved ? "text-accent" : "text-red-400") : (isSolved ? "text-secondary/60" : "text-amber-600/70")
                  }`}>
                    Evidence 0{index + 1}
                  </span>
                  <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 mt-1 ${
                    hoveredId === item.id ? "text-white" : "text-white/80"
                  }`}>
                    {item.label}
                  </span>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    hoveredId === item.id ? "text-white/60" : "text-white/40"
                  }`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <motion.button
            onClick={handleSolve}
            disabled={isSolved}
            className={`mt-12 w-full py-4 px-6 rounded-lg border font-mono text-[11px] tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 ${
              isSolved 
                ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-400" 
                : "bg-red-900/10 border-red-900/30 text-red-500 hover:bg-red-900/20 hover:border-red-500/50"
            }`}
          >
            {isSolved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Case Solved
              </>
            ) : (
              "Solve Case"
            )}
          </motion.button>
        </div>

        {/* Right Column: Investigation Board */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-full overflow-hidden p-6 lg:p-8 flex items-center justify-center">
          
          <AnimatePresence>
            {!isSolved && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-10"
              >
                {/* SVG Red Strings Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <defs>
                    <filter id="string-shadow">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.5" />
                    </filter>
                  </defs>
                  
                  {/* Hardcoded coordinates for the strings connecting nodes */}
                  {/* Node 1 to Node 2 */}
                  <motion.line 
                    x1="20%" y1="20%" x2="50%" y2="35%" 
                    stroke={hoveredId === 'rejections' || hoveredId === 'structure' ? "#ef4444" : "#991b1b"} 
                    strokeWidth={hoveredId === 'rejections' || hoveredId === 'structure' ? 3 : 1.5} 
                    className="transition-all duration-300"
                    filter="url(#string-shadow)"
                  />
                  {/* Node 2 to Node 3 */}
                  <motion.line 
                    x1="50%" y1="35%" x2="80%" y2="25%" 
                    stroke={hoveredId === 'structure' || hoveredId === 'keywords' ? "#ef4444" : "#991b1b"} 
                    strokeWidth={hoveredId === 'structure' || hoveredId === 'keywords' ? 3 : 1.5} 
                    className="transition-all duration-300"
                    filter="url(#string-shadow)"
                  />
                  {/* Node 2 to Node 4 */}
                  <motion.line 
                    x1="50%" y1="35%" x2="40%" y2="70%" 
                    stroke={hoveredId === 'structure' || hoveredId === 'guidance' ? "#ef4444" : "#991b1b"} 
                    strokeWidth={hoveredId === 'structure' || hoveredId === 'guidance' ? 3 : 1.5} 
                    className="transition-all duration-300"
                    filter="url(#string-shadow)"
                  />
                  {/* Node 3 to Node 5 */}
                  <motion.line 
                    x1="80%" y1="25%" x2="70%" y2="80%" 
                    stroke={hoveredId === 'keywords' || hoveredId === 'conclusion' ? "#ef4444" : "#991b1b"} 
                    strokeWidth={hoveredId === 'keywords' || hoveredId === 'conclusion' ? 3 : 1.5} 
                    className="transition-all duration-300"
                    filter="url(#string-shadow)"
                  />
                  {/* Node 4 to Node 5 */}
                  <motion.line 
                    x1="40%" y1="70%" x2="70%" y2="80%" 
                    stroke={hoveredId === 'guidance' || hoveredId === 'conclusion' ? "#ef4444" : "#991b1b"} 
                    strokeWidth={hoveredId === 'guidance' || hoveredId === 'conclusion' ? 3 : 1.5} 
                    className="transition-all duration-300"
                    filter="url(#string-shadow)"
                  />
                </svg>

                {/* Node 1: ATS Rejections (Paper) */}
                <div 
                  className={`absolute top-[15%] left-[10%] w-40 p-4 bg-[#e8e4d9] shadow-xl border border-black/10 rotate-[-4deg] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 ${hoveredId === 'rejections' ? 'z-20 scale-105 shadow-red-900/20 shadow-2xl' : 'z-10'}`}
                  onMouseEnter={() => setHoveredId("rejections")}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId("rejections")}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
                  <h4 className="text-[10px] font-mono text-red-700 uppercase font-bold mt-2">Document 1A</h4>
                  <p className="text-black/80 font-serif text-sm mt-2 leading-tight">ATS parsed data returning 75% failure rate.</p>
                </div>

                {/* Node 2: Poor Structure (Diagram) */}
                <div 
                  className={`absolute top-[25%] left-[40%] w-48 p-4 bg-[#141414] border border-amber-900/30 rounded-lg shadow-xl rotate-[2deg] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 ${hoveredId === 'structure' ? 'z-20 scale-105 shadow-red-900/20 shadow-2xl border-red-500/50' : 'z-10'}`}
                  onMouseEnter={() => setHoveredId("structure")}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId("structure")}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-amber-600/20 border border-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-red-600 absolute top-2 right-2" />
                  <h4 className="text-[10px] font-mono text-amber-500 uppercase mb-2">Structure Analysis</h4>
                  <div className="w-full h-12 border border-dashed border-amber-900/50 flex flex-col gap-1 p-1">
                     <div className="w-full h-2 bg-amber-900/20" />
                     <div className="w-2/3 h-2 bg-amber-900/20" />
                  </div>
                </div>

                {/* Node 3: Missing Keywords (Sticky) */}
                <div 
                  className={`absolute top-[15%] right-[10%] w-32 p-3 bg-yellow-200/90 shadow-lg border border-yellow-400/50 rotate-[6deg] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 ${hoveredId === 'keywords' ? 'z-20 scale-105 shadow-red-900/20 shadow-2xl' : 'z-10'}`}
                  onMouseEnter={() => setHoveredId("keywords")}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId("keywords")}
                >
                  <div className="w-full h-2 bg-black/10 absolute top-0 left-0" />
                  <p className="text-black/80 font-handwriting text-sm mt-2 leading-tight">Where are the keywords?? JD alignment is missing.</p>
                </div>

                {/* Node 4: No AI Guidance (Polaroid) */}
                <div 
                  className={`absolute top-[60%] left-[25%] w-36 p-2 pb-6 bg-white shadow-xl rotate-[-3deg] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 ${hoveredId === 'guidance' ? 'z-20 scale-105 shadow-red-900/20 shadow-2xl' : 'z-10'}`}
                  onMouseEnter={() => setHoveredId("guidance")}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId("guidance")}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] z-10" />
                  <div className="w-full h-24 bg-black flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.2)_0%,transparent_70%)]" />
                    <span className="text-[10px] text-red-500 font-mono">ERROR: FIX NEEDED</span>
                  </div>
                  <p className="text-black/60 font-handwriting text-xs text-center mt-2">Tools just complain.</p>
                </div>

                {/* Node 5: Conclusion (Classified Folder) */}
                <div 
                  className={`absolute top-[70%] right-[15%] w-48 p-4 bg-[#211a16] border border-amber-900/40 shadow-2xl rotate-[1deg] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 ${hoveredId === 'conclusion' ? 'z-20 scale-105 shadow-red-900/20 shadow-2xl border-red-500/50' : 'z-10'}`}
                  onMouseEnter={() => setHoveredId("conclusion")}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId("conclusion")}
                >
                  <div className="absolute -top-3 right-4 px-2 py-1 bg-red-900/80 border border-red-500 text-[8px] font-mono text-red-200 rotate-[-5deg] uppercase font-bold tracking-widest">
                    Conclusion
                  </div>
                  <h4 className="text-sm font-heading text-white mb-2">ResumeIQ Solution</h4>
                  <p className="text-white/50 text-xs">We need a platform that not only parses intelligently, but actively guides the user to write better.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blueprint Engineering replacement (when solved) */}
          <AnimatePresence>
            {isSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ rotate: -10, scale: 1.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="border-2 border-accent text-accent px-8 py-3 text-2xl font-mono tracking-widest uppercase font-bold bg-accent/10"
                  >
                    Transitioning to Engineering...
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Information Popup */}
          <AnimatePresence>
            {selectedId && !isSolved && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedId(null)}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#14100e] border border-amber-900/50 p-6 md:p-8 rounded-xl max-w-md w-full relative shadow-2xl"
                >
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                  <div className="text-[10px] font-mono tracking-widest text-red-500 uppercase mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Evidence Detail
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{selectedEvidence?.label}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedEvidence?.popup}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </motion.div>
    </motion.div>
  );
}
