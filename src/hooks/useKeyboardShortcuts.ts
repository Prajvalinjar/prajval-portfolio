"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ToastContext";

export function useKeyboardShortcuts() {
  const { showToast, showDownload } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is typing in form inputs, textareas, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ignore modifier keys combination like Ctrl/Cmd/Alt so standard browser shortcuts work
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toUpperCase();

      switch (key) {
        case "G": {
          e.preventDefault();
          showToast("Opening GitHub...", "info", "Shortcut [G]");
          window.open("https://github.com/PrajvalInjar", "_blank", "noopener,noreferrer");
          break;
        }
        case "L": {
          e.preventDefault();
          showToast("Opening LinkedIn...", "info", "Shortcut [L]");
          window.open(
            "https://linkedin.com/in/prajval-injar-8529aa2b2",
            "_blank",
            "noopener,noreferrer"
          );
          break;
        }
        case "R": {
          e.preventDefault();
          showToast("Opening Resume [R]...", "info", "Shortcut");
          window.open("/resume", "_blank", "noopener,noreferrer");
          break;
        }
        case "A": {
          e.preventDefault();
          const aiElement = document.getElementById("ai-assistant");
          if (aiElement) {
            aiElement.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, "", "#ai-assistant");
            showToast("Navigated to AI Assistant [A]", "info", "Shortcut");
          }
          break;
        }
        case "ESCAPE":
        case "ESC": {
          // ESC key closes any open dropdown, modal, or blurs active element
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showToast, showDownload]);
}
