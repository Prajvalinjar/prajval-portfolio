"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Copy, Download, AlertCircle, X, Info } from "lucide-react";

export type ToastType = "success" | "copy" | "download" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  showSuccess: (message: string, title?: string) => void;
  showCopy: (text: string) => void;
  showDownload: (message?: string) => void;
  showError: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", title?: string, duration = 3500) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, type, title, message, duration };

      setToasts((prev) => [...prev.slice(-4), newToast]); // keep max 5 toasts

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (message: string, title?: string) => showToast(message, "success", title),
    [showToast]
  );

  const showCopy = useCallback(
    (text: string) => showToast(`Copied "${text}" to clipboard!`, "copy", "Clipboard"),
    [showToast]
  );

  const showDownload = useCallback(
    (message = "Resume download started...") => showToast(message, "download", "Download"),
    [showToast]
  );

  const showError = useCallback(
    (message: string, title?: string) => showToast(message, "error", title),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showCopy, showDownload, showError }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        role="status" 
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-[#060810]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.08)] text-white relative overflow-hidden group"
            >
              {/* Subtle Cyan Top Accent Line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  toast.type === "error"
                    ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                    : toast.type === "success"
                    ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                    : "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
                }`}
              />

              {/* Toast Icon */}
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                )}
                {toast.type === "copy" && (
                  <Copy className="w-5 h-5 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
                )}
                {toast.type === "download" && (
                  <Download className="w-5 h-5 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.5)] animate-bounce" />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
                )}
                {toast.type === "info" && (
                  <Info className="w-5 h-5 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
                )}
              </div>

              {/* Toast Content */}
              <div className="flex-1 min-w-0 pr-2">
                {toast.title && (
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00E5FF] mb-0.5">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs font-sans text-secondary/90 font-medium leading-snug break-words">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 text-secondary/50 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
