"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

interface ProjectStatsProps {
  filteredProjects: Project[];
  totalProjectsCount: number;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 400;
    const steps = 15;
    const stepValue = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};

export default function ProjectStats({
  filteredProjects,
  totalProjectsCount
}: ProjectStatsProps) {
  // Compute metrics dynamically from current filtered list
  const total = filteredProjects.length;
  const completed = filteredProjects.filter(
    (p) => p.status === "Production" || p.status === "Completed"
  ).length;
  const live = filteredProjects.filter((p) => Boolean(p.liveUrl)).length;
  const aiCount = filteredProjects.filter((p) => p.category === "AI").length;

  const allTech = new Set<string>();
  filteredProjects.forEach((p) => p.techStack.forEach((t) => allTech.add(t)));
  const uniqueTechCount = allTech.size;

  const metrics = [
    { label: "Visible Deployments", value: total, totalSuffix: ` / ${totalProjectsCount}` },
    { label: "Completed Products", value: completed },
    { label: "Live Demos", value: live },
    { label: "AI Models", value: aiCount },
    { label: "Tech Stack In Use", value: uniqueTechCount, suffix: "+" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full grid grid-cols-2 sm:grid-cols-5 divide-x divide-white/5 border border-white/10 rounded-2xl bg-[#060810]/75 backdrop-blur-xl mb-12 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      {metrics.map((m, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-4 text-center group hover:bg-white/[0.02] transition-colors">
          <span className="text-[9.5px] font-mono tracking-widest text-secondary/50 uppercase mb-1">
            {m.label}
          </span>
          <div className="text-2xl font-heading font-extrabold text-white tracking-tight flex items-baseline justify-center gap-0.5">
            <AnimatedNumber value={m.value} />
            {m.suffix && <span className="text-accent text-lg">{m.suffix}</span>}
            {m.totalSuffix && (
              <span className="text-xs font-mono text-secondary/40 font-normal">
                {m.totalSuffix}
              </span>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
