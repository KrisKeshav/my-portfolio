"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { links } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function GithubHeatmap() {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateMode = () => setMode(document.documentElement.getAttribute("data-mode") === "light" ? "light" : "dark");
    const observer = new MutationObserver(updateMode);

    updateMode();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    return () => observer.disconnect();
  }, []);

  return (
    <TerminalCard title="GitHub Contributions" command={`curl github.com/${links.githubUsername}/contributions`} accent="cyan">
      <div className="p-6 flex justify-center overflow-x-auto bg-surface/30">
        <GitHubCalendar 
          username={links.githubUsername} 
          colorScheme={mode}
          theme={{
            light: ["#e7edf2", "#b4e9e4", "#72d6ce", "#2baea8", "#0e8a84"],
            dark: ["#202631", "#174a4a", "#207b79", "#35aaa5", "#6cf0e8"],
          }}
          blockSize={14}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </TerminalCard>
  );
}

