"use client";

import { motion } from "framer-motion";
import ExperienceCard, { Experience } from "./ExperienceCard";
import CertificateCard, { Certificate } from "./CertificateCard";
import ExperienceSidebar from "./ExperienceSidebar";
import GrowthHeaderGraphic from "./GrowthHeaderGraphic";

// Data for Professional Experience (Left Column)
const EXPERIENCES: Experience[] = [
  {
    id: "aws",
    logo: "/images/logo_aws.jpg",
    organization: "AWS Student Builder Group",
    role: "Event Management Lead",
    timeline: "Mar 2025 – Present",
    contribution: "Leading technical event planning, coordination and execution within the campus community.",
    impact: "Helped organize community events and improved student engagement.",
    tags: ["Leadership", "Community", "Events"]
  },
  {
    id: "wordcamp",
    logo: "/images/logo_wordcamp.jpg",
    organization: "WordCamp Kolhapur 2026",
    role: "Volunteer",
    timeline: "Jan 2026",
    contribution: "Supporting event operations, community engagement and technology sessions.",
    impact: "Contributed to one of the largest open-source community events.",
    tags: ["Volunteer", "Open Source", "Community"]
  },
  {
    id: "hackathons",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 drop-shadow-[0_0_10px_rgba(192,132,252,0.6)]" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 0 0-6 6v4a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6z"/>
      <path d="M12 6l1.2 2.4 2.7.4-1.9 1.9.5 2.7-2.5-1.3-2.5 1.3.5-2.7-1.9-1.9 2.7-.4L12 6z" fill="#C084FC"/>
    </svg>`,
    organization: "National Level Hackathons",
    role: "Participant",
    timeline: "2024 – 2026",
    contribution: "Worked on innovative engineering solutions under time constraints and real-world problems.",
    impact: "Improved problem solving, rapid prototyping and teamwork.",
    tags: ["Hackathon", "Innovation", "Engineering"]
  },
  {
    id: "communities",
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
    organization: "Technical Communities",
    role: "Active Member",
    timeline: "Ongoing",
    contribution: "Learning, sharing knowledge and contributing to open source & tech communities.",
    impact: "Consistent engineering growth through community participation.",
    tags: ["Community", "Learning", "Networking"]
  }
];

// Data for Continuous Learning (Right Column)
const CERTIFICATES: Certificate[] = [
  {
    id: "deloitte",
    logo: `<svg viewBox="0 0 100 28" fill="none" class="w-20 h-7 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="22" fill="white" font-family="sans-serif" font-weight="900" font-size="22" letter-spacing="-0.5">Deloitte</text>
      <circle cx="92" cy="18" r="3.2" fill="#86BC25" />
    </svg>`,
    organization: "Deloitte",
    title: "Data Analyst Virtual Experience",
    issued: "17 Aug 2025",
    skills: ["SQL", "Excel", "Data Analytics", "Business Intelligence"],
    verified: true
  },
  {
    id: "android",
    logo: `<svg viewBox="0 0 24 24" class="w-12 h-12 fill-current text-[#3DDC84] drop-shadow-[0_0_10px_rgba(61,220,132,0.4)]" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 11c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm-6 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm10.77.34l1.37-2.37a.38.38 0 0 0-.14-.52.38.38 0 0 0-.52.14l-1.39 2.4C18.66 9.87 16.94 9 15 9s-3.66.87-5.09 2.01L8.52 8.61a.38.38 0 0 0-.52-.14.38.38 0 0 0-.14.52l1.37 2.37C6.01 12.35 4 14.93 4 18h22c0-3.07-2.01-5.65-5.23-6.66z"/>
    </svg>`,
    organization: "AICTE & EduSkills Academy",
    title: "Android Developer Virtual Internship",
    issued: "Sep 2025",
    skills: ["Android", "Kotlin", "UI Development", "Mobile Apps"],
    verified: true
  },
  {
    id: "google",
    logo: `<svg viewBox="0 0 36 24" class="w-14 h-9" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L3 12l9 8" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M24 4l9 8-9 8" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M16 4l4 16" stroke="#FBBC05" stroke-width="4" stroke-linecap="round" fill="none"/>
    </svg>`,
    organization: "Google Developer Club",
    title: "AI/ML Virtual Internship",
    issued: "Jul 2025",
    skills: ["Machine Learning", "AI", "Python", "Data Science"],
    verified: true
  }
];

export default function ExperienceChapter() {
  return (
    <section className="relative w-full min-h-0 lg:min-h-screen bg-transparent text-white py-8 lg:py-16 overflow-hidden lg:border-t lg:border-white/5">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="w-full h-full bg-grid-pattern" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Center Content */}
        <div className="lg:col-span-8 flex flex-col gap-8 xl:gap-10">
          
          {/* Header Layout with Isometric Wireframe Graphic */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
            <div className="flex flex-col gap-2">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded border border-accent/40 bg-accent/10 text-accent">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">CHAPTER 05</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl lg:text-4xl font-heading font-bold text-white uppercase tracking-wider"
              >
                PROFESSIONAL <span className="text-accent">GROWTH</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-secondary/80 text-sm md:text-base max-w-xl"
              >
                Experience that shaped me. Learning that keeps shaping me.
              </motion.p>
            </div>

            {/* Top Right Blueprint Illustration */}
            <GrowthHeaderGraphic />
          </div>

          {/* 2-Column Outer Containers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
            
            {/* Left Box: PROFESSIONAL EXPERIENCE */}
            <div className="flex flex-col gap-6 p-6 rounded-2xl border border-white/10 bg-[#060912]/90 backdrop-blur-md relative">
              {/* Outer Container Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white">PROFESSIONAL EXPERIENCE</h3>
              </div>
              
              <div className="flex flex-col gap-4 relative">
                {/* Right-aligned Vertical Timeline Line */}
                <div className="absolute top-4 bottom-4 right-[-1px] w-[2px] bg-white/10" />
                
                {EXPERIENCES.map((exp, i) => (
                  <ExperienceCard key={exp.id} experience={exp} index={i} />
                ))}
              </div>
            </div>

            {/* Right Box: CONTINUOUS LEARNING */}
            <div className="flex flex-col gap-6 p-6 rounded-2xl border border-white/10 bg-[#060912]/90 backdrop-blur-md">
              {/* Outer Container Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white">CONTINUOUS LEARNING</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {CERTIFICATES.map((cert, i) => (
                  <CertificateCard key={cert.id} certificate={cert} index={i} />
                ))}
              </div>
            </div>
            
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32">
            <ExperienceSidebar />
          </div>
        </div>

      </div>
    </section>
  );
}
