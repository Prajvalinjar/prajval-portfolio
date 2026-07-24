"use client";

import React from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

interface AssetUploadPlaceholderProps {
  missingAssets: string[];
}

export default function AssetUploadPlaceholder({
  missingAssets
}: AssetUploadPlaceholderProps) {
  if (!missingAssets || missingAssets.length === 0) return null;

  return (
    <div className="w-full p-4 rounded-2xl border border-white/10 border-dashed bg-white/[0.01] flex flex-col gap-3 my-4">
      <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
        <UploadCloud className="w-4 h-4 text-[#00E5FF]" />
        <span className="font-bold uppercase tracking-wider">Asset Request Pipeline</span>
      </div>

      <p className="text-xs text-secondary/70">
        This milestone story is published and ready. Additional assets can be attached:
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {missingAssets.map((asset, i) => (
          <li
            key={i}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-secondary/60"
          >
            <ImageIcon className="w-3.5 h-3.5 text-secondary/40 shrink-0" />
            <span>{asset}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
