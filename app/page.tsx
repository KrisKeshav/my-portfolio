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
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-16">
        
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <div className="font-mono font-semibold text-2xl text-amber flex items-center gap-2 mb-10">
              root@portfolio
              <span className="w-2.5 h-6 bg-amber animate-blink" />
            </div>
            
            <Hero />
            
            <nav className="mt-12 hidden lg:block">
              <ul className="flex flex-col gap-5 font-mono text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} className="group flex items-center gap-4 text-muted hover:text-text no-underline">
                      <span className="w-8 h-[1px] bg-border group-hover:w-16 group-hover:bg-cyan transition-all duration-300" />
                      <span className="text-faint group-hover:text-cyan transition-colors">./</span>
                      <span className="group-hover:tracking-wider transition-all duration-300">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links on Desktop Sidebar */}
          <div className="mt-12 lg:mt-0 flex items-center gap-6 font-mono text-sm text-faint">
            <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan/50" /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan/50" /> LinkedIn
            </a>
          </div>
        </header>

        {/* Right Column (Scrollable Content) */}
        <main className="pt-24 lg:w-[55%] lg:py-24 flex flex-col gap-24">
          
          <section id="activity" className="scroll-mt-24">
            <GithubHeatmap />
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/50 backdrop-blur-sm px-4 py-2.5 font-mono text-xs text-muted hover:text-text hover:border-faint hover:bg-surface/80 no-underline transition-all shadow-sm"
            >
              <span className="text-cyan font-bold">in</span> Connect on LinkedIn
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

          <footer className="text-left font-mono text-xs text-faint py-10 space-y-3 border-t border-border/50">
            <div className="text-muted">built with <span className="text-amber">$CURIOSITY</span>, one commit a day</div>
            <div className="leading-relaxed">
              This site logs basic visit analytics (page, approximate location, time).
              No cookies, no personal profile stored.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
