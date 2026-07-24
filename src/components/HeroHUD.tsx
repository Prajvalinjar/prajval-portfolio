"use client";

import { motion } from "framer-motion";
import { useToast } from "./ToastContext";
import { FileText } from "lucide-react";

export default function HeroHUD() {
  const { showCopy } = useToast();

  const handleMailClick = (e: React.MouseEvent) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("injarprajval@gmail.com");
      showCopy("injarprajval@gmail.com");
    }
  };

  const socials = [
    {
      id: "github",
      label: "GitHub Profile",
      href: "https://github.com/PrajvalInjar",
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: undefined,
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      href: "https://linkedin.com/in/prajval-injar-8529aa2b2",
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: undefined,
    },
    {
      id: "mail",
      label: "Email Injarprajval@gmail.com",
      href: "mailto:injarprajval@gmail.com",
      target: undefined,
      rel: undefined,
      onClick: handleMailClick,
    },
    {
      id: "resume",
      label: "View Resume PDF",
      href: "/resume.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: undefined,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
    >
      {/* Top Left: Corner Brackets & Coordinates */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex flex-col gap-1 text-[10px] font-mono text-secondary/50 tracking-widest uppercase">
        <div className="w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]/60 -ml-1 -mt-1 mb-1" />
        <span className="flex items-center gap-2">SYS.FMW <span className="text-white font-semibold">PRD-X9</span></span>
        <span className="flex items-center gap-2">LAT: <span className="text-white font-semibold">40.7128° N</span></span>
      </div>

      {/* Top Right: ENGINEER MODE Button & SYSTEM STATUS Card */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Corner Bracket */}
        <div className="w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]/60 -mr-1 -mt-1 self-end mb-1" />

        {/* Engineer Mode Indicator Pill */}
        <div className="px-3 py-1 rounded-lg border border-white/10 bg-[#060810]/80 backdrop-blur-md flex items-center gap-2 text-[10px] font-mono tracking-widest text-secondary/70 uppercase">
          <span>ENGINEER MODE</span>
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-[2px] h-2.5 bg-[#00E5FF]/60" />
            ))}
          </div>
        </div>

        {/* System Status Card (Matching Reference Image) */}
        <div className="hidden md:flex flex-col gap-1 px-4 py-3 rounded-2xl border border-white/10 bg-[#060810]/85 backdrop-blur-md w-52 shadow-xl">
          <div className="flex items-center gap-2 text-[9px] font-mono text-secondary/50 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>SYSTEM STATUS</span>
          </div>
          <div className="text-xl font-heading font-extrabold text-[#00E5FF] tracking-tight">100%</div>
          <div className="text-[9px] font-mono text-secondary/40 uppercase tracking-wider">ALL SYSTEMS OPERATIONAL</div>
        </div>
      </div>

      {/* Bottom Left: Status Indicator */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex flex-col gap-1 text-[10px] font-mono tracking-widest uppercase">
        <span className="text-secondary/40">STATUS</span>
        <span className="text-[#00E5FF] flex items-center gap-2 font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          READY
        </span>
      </div>

      {/* Right Center: Floating Vertical Social Icons */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto hidden sm:flex"
      >
        {socials.map((social) => (
          <a 
            key={social.id}
            href={social.href}
            target={social.target}
            rel={social.rel}
            onClick={social.onClick}
            aria-label={social.label}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary/70 hover:text-white hover:border-[#00E5FF]/60 bg-[#060810]/80 backdrop-blur-md hover:bg-[#00E5FF]/10 transition-all duration-300 relative group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none shadow-lg"
          >
            {social.id === 'github' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            )}
            {social.id === 'linkedin' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            )}
            {social.id === 'mail' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            )}
            {social.id === 'resume' && (
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
            {/* Cyan glow ring on hover */}
            <div className="absolute inset-[-2px] rounded-full border border-[#00E5FF]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
