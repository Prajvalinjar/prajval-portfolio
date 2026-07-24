"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { JOURNEY_METRICS } from "@/data/journeyData";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 600;
    const steps = 20;
    const stepValue = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function JourneyStats() {
  const stats = [
    { label: "Years Learning", value: JOURNEY_METRICS.yearsLearning, suffix: "+" },
    { label: "Projects Built", value: JOURNEY_METRICS.projectsBuilt, suffix: "+" },
    { label: "Hackathons", value: JOURNEY_METRICS.hackathons, suffix: "+" },
    { label: "Certificates", value: JOURNEY_METRICS.certificates },
    { label: "Technologies", value: JOURNEY_METRICS.techCount, suffix: "+" },
    { label: "Leadership Roles", value: JOURNEY_METRICS.leadershipRoles },
    { label: "Open Source Contribs", value: JOURNEY_METRICS.openSourceContribs, suffix: "+" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 divide-x divide-y sm:divide-y-0 divide-white/5 border border-white/10 rounded-2xl bg-[#060810]/75 backdrop-blur-xl mb-14 overflow-hidden shadow-2xl"
    >
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-4 text-center group hover:bg-white/[0.02] transition-colors">
          <span className="text-[9px] font-mono tracking-widest text-secondary/50 uppercase mb-1">
            {s.label}
          </span>
          <div className="text-xl font-heading font-extrabold text-white tracking-tight flex items-baseline justify-center">
            <AnimatedCounter value={s.value} suffix={s.suffix} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
