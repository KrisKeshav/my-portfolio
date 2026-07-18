"use client";

import { GitHubCalendar } from "react-github-calendar";
import { links } from "@/lib/data";

export default function GithubHeatmap() {
  return (
    <div className="rounded-xl border border-border/80 bg-surface/50 backdrop-blur-sm p-6 overflow-x-auto shadow-sm">
      <div className="font-mono text-xs text-faint mb-5 flex items-center gap-2 border-b border-border/40 pb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
        <span className="ml-2 text-text/80 tracking-wide">
          <span className="text-cyan">$</span> curl github.com/{links.githubUsername}/contributions
        </span>
      </div>
      <div className="flex justify-center">
        <GitHubCalendar 
          username={links.githubUsername} 
          colorScheme="dark"
          blockSize={14}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </div>
  );
}
