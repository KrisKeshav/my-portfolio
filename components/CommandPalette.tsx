"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { site, projects, skills, links } from "@/lib/data";
import { 
  User, Terminal, Code2, Briefcase, GraduationCap, 
  PenTool, FlaskConical, Link as LinkIcon, Mail, 
  FileText, Download, Search, Sparkles, Monitor
} from "lucide-react";

type OutputEntry = {
  type: "command" | "output" | "error" | "banner";
  content: React.ReactNode;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"cli" | "search">("cli");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [theme, setTheme] = useState<string>("amber");
  const [outputLog, setOutputLog] = useState<OutputEntry[]>([
    {
      type: "banner",
      content: (
        <div className="space-y-1 text-xs font-mono text-cyan">
          <div>Portfolio Interactive CLI Terminal [v2.4.0]</div>
          <div className="text-muted">Type <span className="text-amber font-bold">help</span> to list commands or click options below.</div>
        </div>
      ),
    },
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, outputLog]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }, [router]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ").toLowerCase();

    const newEntries: OutputEntry[] = [
      {
        type: "command",
        content: (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-cyan font-bold">visitor@kris:~$</span>
            <span className="text-text">{trimmed}</span>
          </div>
        ),
      },
    ];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          content: (
            <div className="space-y-2 text-xs font-mono text-text p-2 bg-surface2/40 rounded-lg border border-border/50">
              <div className="text-cyan font-bold mb-1">AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <div><span className="text-amber">neofetch</span> — Display system & bio specs</div>
                <div><span className="text-amber">ls [projects|skills]</span> — Directory list</div>
                <div><span className="text-amber">cat resume</span> — View & download CV</div>
                <div><span className="text-amber">cat about</span> — View developer bio</div>
                <div><span className="text-amber">theme [amber|cyan|matrix]</span> — Set color theme</div>
                <div><span className="text-amber">goto [section]</span> — Jump to section</div>
                <div><span className="text-amber">whoami</span> — Current session info</div>
                <div><span className="text-amber">contact</span> — Get contact info</div>
                <div><span className="text-amber">clear</span> — Clear terminal output</div>
                <div><span className="text-amber">sudo</span> — Restricted command</div>
              </div>
            </div>
          ),
        });
        break;

      case "neofetch":
        newEntries.push({
          type: "output",
          content: (
            <div className="flex flex-col sm:flex-row gap-4 p-3 bg-surface2/30 rounded-xl border border-border/50 font-mono text-xs">
              <pre className="text-cyan text-[10px] leading-tight select-none">
{`   _  ___ _    
  / |/ (_) |_  
 /    / /  _| 
/_/|_/_/\\__|  
  KRIS KESHAV `}
              </pre>
              <div className="space-y-1 text-text">
                <div><span className="text-cyan font-bold">OS:</span> Next.js 14 + TailwindCSS</div>
                <div><span className="text-cyan font-bold">Host:</span> Indian Institute of Technology Roorkee</div>
                <div><span className="text-cyan font-bold">Degree:</span> B.Tech in Electrical Engineering</div>
                <div><span className="text-cyan font-bold">Focus:</span> DSA, Distributed Systems, ML</div>
                <div><span className="text-cyan font-bold">CP Handle:</span> Codeforces Specialist (1532)</div>
                <div><span className="text-cyan font-bold">Uptime:</span> 100% active</div>
              </div>
            </div>
          ),
        });
        break;

      case "ls":
        if (args === "projects") {
          newEntries.push({
            type: "output",
            content: (
              <div className="space-y-1 font-mono text-xs">
                <div className="text-muted">total {projects.length}</div>
                {projects.map((p) => (
                  <div key={p.id} className="text-cyan hover:underline cursor-pointer" onClick={() => scrollTo("projects")}>
                    -rw-r--r-- 1 kris dev {p.id}.ts ({p.category})
                  </div>
                ))}
              </div>
            ),
          });
        } else if (args === "skills") {
          newEntries.push({
            type: "output",
            content: (
              <div className="space-y-1 font-mono text-xs">
                <div><span className="text-amber">Languages:</span> {skills.currentStack.join(", ")}</div>
                <div><span className="text-cyan">High Priority:</span> {skills.highPriority.join(", ")}</div>
                <div><span className="text-violet">Tools:</span> {skills.tools.join(", ")}</div>
              </div>
            ),
          });
        } else {
          newEntries.push({
            type: "output",
            content: (
              <div className="flex flex-wrap gap-4 font-mono text-xs text-cyan">
                <span>drwxr-xr-x about/</span>
                <span>drwxr-xr-x projects/</span>
                <span>drwxr-xr-x skills/</span>
                <span>drwxr-xr-x experience/</span>
                <span>-rw-r--r-- resume.pdf</span>
              </div>
            ),
          });
        }
        break;

      case "cat":
        if (args.includes("resume") || args.includes("cv")) {
          newEntries.push({
            type: "output",
            content: (
              <div className="p-3 bg-surface2/40 border border-border/60 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-amber font-bold">RESUME OVERVIEW — KRIS KESHAV</div>
                <div className="text-muted">{site.bio}</div>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => window.open("/resnew.pdf", "_blank")}
                    className="px-3 py-1 bg-amber text-bg rounded font-bold hover:opacity-90"
                  >
                    View Full PDF
                  </button>
                </div>
              </div>
            ),
          });
        } else if (args.includes("about")) {
          newEntries.push({
            type: "output",
            content: (
              <div className="p-3 bg-surface2/30 rounded-xl border border-border/50 font-sans text-xs text-text leading-relaxed">
                {site.bio}
              </div>
            ),
          });
        } else {
          newEntries.push({
            type: "error",
            content: <div className="text-amber text-xs font-mono">cat: {args || "file"}: No such file or directory. Try &apos;cat resume&apos; or &apos;cat about&apos;.</div>,
          });
        }
        break;

      case "theme":
        if (["amber", "cyan", "matrix", "dark"].includes(args)) {
          handleThemeChange(args);
          newEntries.push({
            type: "output",
            content: <div className="text-cyan text-xs font-mono">Theme switched to: <span className="font-bold">{args}</span></div>,
          });
        } else {
          newEntries.push({
            type: "error",
            content: <div className="text-amber text-xs font-mono">Usage: theme [amber|cyan|matrix]</div>,
          });
        }
        break;

      case "goto":
        if (args) {
          scrollTo(args);
          setOpen(false);
        } else {
          newEntries.push({
            type: "error",
            content: <div className="text-amber text-xs font-mono">Usage: goto [about|projects|skills|experience|education|contact]</div>,
          });
        }
        break;

      case "whoami":
        newEntries.push({
          type: "output",
          content: <div className="text-xs font-mono text-text">visitor@kris-portfolio (Role: Guest Recruiter/Developer, Session: Active)</div>,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs font-mono text-text p-2 bg-surface2/40 rounded-lg">
              <div>Email: <a href={`mailto:${site.email}`} className="text-cyan underline">{site.email}</a></div>
              <div>Phone: <span className="text-amber">{site.phone}</span></div>
              <div>GitHub: <a href={links.github} target="_blank" className="text-cyan underline">KrisKeshav</a></div>
            </div>
          ),
        });
        break;

      case "clear":
        setOutputLog([]);
        setInput("");
        return;

      case "sudo":
        newEntries.push({
          type: "error",
          content: <div className="text-amber text-xs font-mono">sudo: permission denied for visitor. Incident reported to @KrisKeshav!</div>,
        });
        break;

      default:
        newEntries.push({
          type: "error",
          content: <div className="text-amber text-xs font-mono">command not found: {cmd}. Type &apos;help&apos; for options.</div>,
        });
        break;
    }

    setOutputLog((prev) => [...prev, ...newEntries]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 backdrop-blur-md bg-bg/80 animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={() => setOpen(false)} />

      <div className="relative w-full max-w-3xl bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[75vh] z-10">
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-surface2/80 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setOpen(false)} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-muted ml-2 font-medium">kris@portfolio-cli: ~</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === "cli" ? "search" : "cli")}
              className="text-[11px] text-muted hover:text-cyan bg-surface border border-border px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
            >
              <Monitor className="w-3 h-3" />
              <span>{mode === "cli" ? "Switch to Search" : "Switch to Terminal"}</span>
            </button>
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] bg-surface border border-border rounded text-muted font-bold">
              ESC
            </kbd>
          </div>
        </div>

        {mode === "cli" ? (
          <div className="flex flex-col flex-1 overflow-hidden p-4">
            {/* Output Log Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border">
              {outputLog.map((log, idx) => (
                <div key={idx}>{log.content}</div>
              ))}
              <div ref={logEndRef} />
            </div>

            {/* CLI Command Quick Pill Recommendations */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-border/60 mt-3 text-[11px]">
              <span className="text-faint self-center">Try:</span>
              <button
                onClick={() => executeCommand("neofetch")}
                className="px-2 py-0.5 bg-surface border border-border/60 hover:border-cyan/50 text-cyan rounded"
              >
                neofetch
              </button>
              <button
                onClick={() => executeCommand("cat resume")}
                className="px-2 py-0.5 bg-surface border border-border/60 hover:border-amber/50 text-amber rounded"
              >
                cat resume
              </button>
              <button
                onClick={() => executeCommand("ls projects")}
                className="px-2 py-0.5 bg-surface border border-border/60 hover:border-cyan/50 text-cyan rounded"
              >
                ls projects
              </button>
              <button
                onClick={() => executeCommand("theme matrix")}
                className="px-2 py-0.5 bg-surface border border-border/60 hover:border-violet/50 text-violet rounded"
              >
                theme matrix
              </button>
            </div>

            {/* Command Line Input */}
            <div className="flex items-center gap-2 pt-3">
              <span className="text-cyan font-bold text-xs select-none">visitor@kris:~$</span>
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command ('help', 'neofetch', 'cat resume')..."
                className="w-full bg-transparent text-xs text-text placeholder:text-faint focus:outline-none"
              />
            </div>
          </div>
        ) : (
          /* Cmdk Visual Search Mode */
          <Command loop className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center px-4 border-b border-border/60 bg-surface2/40">
              <Search className="w-4 h-4 text-faint mr-2" />
              <Command.Input
                autoFocus
                placeholder="Type to search sections, projects, or actions..."
                className="w-full bg-transparent text-xs text-text placeholder:text-faint focus:outline-none h-11"
              />
            </div>

            <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
              <Command.Empty className="py-6 text-center text-xs text-muted">
                No matching section or action found.
              </Command.Empty>

              <Command.Group heading={<div className="px-2 text-[10px] font-bold text-cyan mb-1 tracking-wider uppercase">Navigation</div>}>
                <Command.Item onSelect={() => { scrollTo('about'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <User className="w-3.5 h-3.5" />
                  <span>About Me</span>
                </Command.Item>
                <Command.Item onSelect={() => { scrollTo('projects'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Projects Showcase</span>
                </Command.Item>
                <Command.Item onSelect={() => { scrollTo('skills'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Skills & Stack</span>
                </Command.Item>
                <Command.Item onSelect={() => { scrollTo('experience'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Experience</span>
                </Command.Item>
                <Command.Item onSelect={() => { scrollTo('education'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                </Command.Item>
                <Command.Item onSelect={() => { scrollTo('contact'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-cyan">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Info</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading={<div className="px-2 text-[10px] font-bold text-amber mb-1 tracking-wider uppercase mt-3">Actions & PDF</div>}>
                <Command.Item onSelect={() => { window.open('/resnew.pdf', '_blank'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-amber">
                  <FileText className="w-3.5 h-3.5 text-amber" />
                  <span>View Resume PDF</span>
                </Command.Item>
                <Command.Item onSelect={() => {
                  const link = document.createElement('a');
                  link.href = '/resnew.pdf';
                  link.download = 'Kris_Keshav_Resume.pdf';
                  link.click();
                  setOpen(false);
                }} className="flex items-center gap-2 px-3 py-2 text-xs text-text rounded-md cursor-pointer aria-selected:bg-surface2 aria-selected:text-amber">
                  <Download className="w-3.5 h-3.5 text-amber" />
                  <span>Download Resume PDF</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        )}
      </div>
    </div>
  );
}
