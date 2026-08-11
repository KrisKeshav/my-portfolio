"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored || "dark";
    setMode(initial);
    document.documentElement.setAttribute("data-mode", initial === "light" ? "light" : "");
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-mode", next === "light" ? "light" : "");
  };

  return (
    <button
      onClick={toggle}
      className="p-1.5 rounded-lg border border-border/60 bg-surface2/50 hover:bg-surface2 text-muted hover:text-amber transition-all duration-200"
      title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
