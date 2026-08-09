"use client";

import { GitHubCalendar } from "react-github-calendar";
import { links } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function GithubHeatmap() {
  return (
    <TerminalCard title="GitHub Contributions" command={`curl github.com/${links.githubUsername}/contributions`} accent="cyan">
      <div className="p-6 flex justify-center overflow-x-auto">
        <GitHubCalendar 
          username={links.githubUsername} 
          colorScheme="dark"
          blockSize={14}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </TerminalCard>
  );
}

