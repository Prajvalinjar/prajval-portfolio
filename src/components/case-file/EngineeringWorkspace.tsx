"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Architecture from "./Architecture";
import AIPipeline from "./AIPipeline";
import EngineeringDecisions from "./EngineeringDecisions";
import Challenges from "./Challenges";

type TabId = "architecture" | "ai-flow" | "decisions" | "challenges";

export default function EngineeringWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>("architecture");

  const tabs = [
    { id: "architecture", label: "Architecture" },
    { id: "ai-flow", label: "AI Flow" },
    { id: "decisions", label: "Key Decisions" },
    { id: "challenges", label: "Challenges" }
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase">03</span>
          <h3 className="text-sm font-heading font-bold text-white tracking-widest uppercase">Engineering Workspace</h3>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`relative px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase whitespace-nowrap transition-colors ${
                  isActive ? "text-white" : "text-secondary/50 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeWorkspaceTab"
                    className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Workspace Content Area */}
      <div className="w-full min-h-[500px] p-6 lg:p-8 rounded-2xl bg-[#080808] border border-white/5 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full flex flex-col"
          >
            {activeTab === "architecture" && (
              <div className="w-full h-full flex-1">
                <Architecture />
              </div>
            )}
            {activeTab === "ai-flow" && (
              <div className="w-full h-full flex-1">
                <AIPipeline />
              </div>
            )}
            {activeTab === "decisions" && (
              <div className="w-full h-full flex-1">
                <EngineeringDecisions />
              </div>
            )}
            {activeTab === "challenges" && (
              <div className="w-full h-full flex-1">
                <Challenges />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
