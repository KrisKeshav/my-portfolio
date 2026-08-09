"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const TERMINAL_LINES = [
  { kind: "k", text: "$ whoami" },
  { kind: "v", text: site.name + " — Student @ IIT Roorkee | Eager to learn & build" },
  { kind: "c", text: "# building toward: DSA · System Design · Distributed Infra" },
  { kind: "k", text: "$ cat focus.txt" },
  { kind: "v", text: site.tagline },
  { kind: "tag", text: "[ status: active — portfolio loaded successfully ]" },
] as const;

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [rendered, setRendered] = useState<{ kind: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandLogs, setCommandLogs] = useState<{ kind: string; text: string }[]>([]);

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIndex];

    if (charIndex <= line.text.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 10 + Math.random() * 12);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setRendered((r) => [...r, line]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const current = TERMINAL_LINES[lineIndex];
  const currentSlice = current ? current.text.slice(0, charIndex) : "";

  const colorFor = (kind: string) =>
    kind === "k" ? "text-cyan" : kind === "c" ? "text-faint" : kind === "tag" ? "text-violet" : "text-text";

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...commandLogs, { kind: "k", text: `visitor@keshav-portfolio:~$ ${inputValue}` }];

    if (cmd === "help") {
      newLogs.push({ kind: "c", text: "Available commands: about | skills | projects | experience | education | research | links | contact | clear | help" });
    } else if (["about", "skills", "projects", "experience", "education", "research", "links", "contact"].includes(cmd)) {
      newLogs.push({ kind: "v", text: `Scrolling to #${cmd}...` });
      const element = document.getElementById(cmd);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (cmd === "clear") {
      setCommandLogs([]);
      setInputValue("");
      return;
    } else {
      newLogs.push({ kind: "tag", text: `bash: command not found: ${cmd}. Type 'help' to see list of commands.` });
    }

    setCommandLogs(newLogs);
    setInputValue("");
  };

  const isTypingDone = lineIndex >= TERMINAL_LINES.length;

  return (
    <div className="rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface2/80 border-b border-border/80">
        <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm" />
        <span className="ml-2 font-mono text-[11px] text-faint">visitor@iitr:~$</span>
      </div>
      <div className="px-6 py-8 font-mono text-sm leading-8 select-none flex-1 overflow-y-auto">
        {rendered.map((l, i) => (
          <div key={i} className={colorFor(l.kind)}>
            {l.text}
          </div>
        ))}
        {current && (
          <div className={colorFor(current.kind)}>
            {currentSlice}
            <span className="inline-block w-2.5 h-5 bg-amber align-middle animate-blink" />
          </div>
        )}

        {isTypingDone && (
          <>
            {commandLogs.map((log, i) => (
              <div key={i} className={colorFor(log.kind)}>
                {log.text}
              </div>
            ))}

            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 text-text mt-2">
              <span className="text-cyan">visitor@keshav-portfolio:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-text text-sm focus:ring-0 p-0 m-0 font-mono"
                autoFocus
                placeholder="type 'help'..."
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
