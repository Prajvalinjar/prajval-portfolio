"use client";

import { motion } from "framer-motion";

const ORGANIZATIONS = [
  {
    name: "AWS",
    logo: "/logos/organizations/aws.svg",
    role: "Event Management Lead",
    contribution: "Community events, planning, leadership.",
    year: "2025"
  },
  {
    name: "WordCamp",
    logo: "/logos/organizations/wordpress.svg",
    role: "Volunteer",
    contribution: "Event operations, open source community.",
    year: "2026"
  },
  {
    name: "Google",
    logo: "/logos/organizations/google.svg",
    role: "AI / ML Intern",
    contribution: "Virtual internship in Machine Learning and AI.",
    year: "2025"
  },
  {
    name: "Deloitte",
    logo: "/logos/organizations/deloitte.svg",
    role: "Data Analyst",
    contribution: "Data Analyst Virtual Experience, BI.",
    year: "2025"
  },
  {
    name: "AICTE",
    logo: "/logos/organizations/aicte.svg",
    role: "Android Developer",
    contribution: "Virtual internship, Mobile Development.",
    year: "2025"
  },
  {
    name: "GitHub",
    logo: "/logos/tools/github.svg",
    role: "Developer",
    contribution: "Continuous code contribution, projects.",
    year: "Ongoing"
  },
  {
    name: "Open Source",
    logo: "/logos/tools/github.svg", // Fallback to github or we can just leave it since it's just open source
    role: "Contributor",
    contribution: "FOSS, learning, community building.",
    year: "Ongoing"
  }
];

export default function OrganizationsStrip() {
  return (
    <div className="w-full flex flex-col gap-8 mt-16 pt-12 border-t border-white/5">
      
      <div className="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <h3 className="text-sm font-mono font-semibold tracking-widest uppercase text-white">Organizations & Communities</h3>
      </div>

      <div className="w-full flex flex-wrap justify-between gap-6 py-6 border-b border-white/5">
        {ORGANIZATIONS.map((org, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex flex-col items-center justify-center p-4"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src={org.logo} alt={org.name} className="w-8 h-8 object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Hover Tooltip Dropdown */}
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 bg-[#080808] border border-white/10 rounded-xl p-4 shadow-xl z-50 transform translate-y-[-10px] group-hover:translate-y-0">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#080808] border-t border-l border-white/10 rotate-45" />
              <div className="flex flex-col gap-2 relative z-10 text-center">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase">{org.year}</span>
                <span className="text-xs font-bold text-white tracking-wide">{org.role}</span>
                <span className="text-[10px] text-secondary/80 leading-relaxed">{org.contribution}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
