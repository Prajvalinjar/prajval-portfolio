"use client";

import { motion } from "framer-motion";

export interface Certificate {
  id: string;
  logo: string;
  organization: string;
  title: string;
  issued: string;
  skills: string[];
  verified: boolean;
  color?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-white/10 bg-[#060810]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 group hover:bg-[#0a0e1a]/85 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(16,185,129,0.15)]"
    >
      {/* Glass Reflection Sweep Beam on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl z-20">
        <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
      </div>
      {/* Dark Logo Container */}
      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-[#020306] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-accent/30 overflow-hidden p-2">
        {certificate.logo.startsWith("<svg") ? (
          <div className="flex items-center justify-center w-full h-full" dangerouslySetInnerHTML={{ __html: certificate.logo }} />
        ) : (
          <img src={certificate.logo} alt={certificate.organization} className="w-10 h-10 object-contain" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-2.5 min-w-0">
        
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2 w-full">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white tracking-wide leading-snug">{certificate.title}</h4>
            <span className="text-xs font-semibold text-accent">{certificate.organization}</span>
          </div>

          <div className="flex flex-col items-end shrink-0 gap-1">
            {certificate.issued && (
              <span className="text-[10px] font-mono text-secondary/60">
                Issued {certificate.issued}
              </span>
            )}
            {certificate.verified && (
              <span className="text-[10px] font-mono tracking-wider text-[#22c55e] flex items-center gap-1 font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Skills Tag Pills & Action Button Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-1 pt-2 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
            {certificate.skills.map((skill, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase text-secondary/80 border border-white/10 rounded bg-white/[0.02]"
              >
                {skill}
              </span>
            ))}
          </div>

          <button className="text-[10px] font-mono tracking-wider text-secondary/90 hover:text-white border border-white/15 hover:border-accent/50 rounded-lg px-3 py-1.5 transition-all flex items-center gap-1.5 whitespace-nowrap bg-white/[0.04] backdrop-blur-md hover:bg-accent/15 cursor-pointer ml-auto active:scale-95">
            View Credential
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
