"use client";

import { useEffect, useState } from "react";
import { site, links } from "@/lib/data";
import GithubHeatmap from "@/components/GithubHeatmap";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Blog from "@/components/Blog";
import Research from "@/components/Research";
import Links from "@/components/Links";
import Contact from "@/components/Contact";

const TERMINAL_LINES = [
  { kind: "k", text: "$ whoami" },
  { kind: "v", text: site.name + " — Software Engineer" },
  { kind: "c", text: "# building toward: DSA · System Design · Distributed Infra" },
  { kind: "k", text: "$ cat focus.txt" },
  { kind: "v", text: site.tagline },
  { kind: "tag", text: "[ status: active — portfolio loaded successfully ]" },
] as const;

function Hero() {
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
      newLogs.push({ kind: "c", text: "Available commands: about | skills | projects | experience | education | blog | research | links | contact | clear | help" });
    } else if (["about", "skills", "projects", "experience", "education", "blog", "research", "links", "contact"].includes(cmd)) {
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
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface2 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
        <span className="ml-2 font-mono text-[11px] text-faint">visitor@iitr:~$</span>
      </div>
      <div className="px-6 py-6 font-mono text-xs leading-7 select-none">
        {rendered.map((l, i) => (
          <div key={i} className={colorFor(l.kind)}>
            {l.text}
          </div>
        ))}
        {current && (
          <div className={colorFor(current.kind)}>
            {currentSlice}
            <span className="inline-block w-2 h-4 bg-amber align-middle animate-blink" />
          </div>
        )}

        {isTypingDone && (
          <>
            {commandLogs.map((log, i) => (
              <div key={i} className={colorFor(log.kind)}>
                {log.text}
              </div>
            ))}
            
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 text-text mt-1">
              <span className="text-cyan">visitor@keshav-portfolio:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-text text-xs focus:ring-0 p-0 m-0 font-mono"
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

const NAV_ITEMS = ["about", "skills", "projects", "experience", "education", "blog", "research", "links", "contact"];

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur bg-bg/90 border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3.5">
          <div className="font-mono font-semibold text-sm text-amber flex items-center gap-2">
            root@portfolio
            <span className="w-2 h-4 bg-amber animate-blink" />
          </div>
          <div className="hidden sm:flex gap-5 font-mono text-xs">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item}`} className="text-muted hover:text-text no-underline">
                <span className="text-faint">./</span>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6">
        <section id="hero" className="my-4">
          <Hero />
        </section>

        <section id="activity" className="my-8">
          <GithubHeatmap />
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs text-muted hover:text-text hover:border-faint no-underline"
          >
            <span className="text-cyan">in</span> Connect on LinkedIn
          </a>
        </section>

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Blog />
        <Research />
        <Links />
        <Contact />
      </main>

      <footer className="text-center font-mono text-[11px] text-faint border-t border-border py-10 mt-16 space-y-2">
        <div>built with $CURIOSITY, one commit a day</div>
        <div>
          This site logs basic visit analytics (page, approximate location, time).
          No cookies, no personal profile stored.
        </div>
      </footer>
    </>
  );
}
