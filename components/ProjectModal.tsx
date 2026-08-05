"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/data";
import { X, Code2, Layers, Activity, GitBranch, ExternalLink, Check, Copy } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "code">("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-bg/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[85vh] bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans z-10">
        {/* Modal Header */}
        <div className="p-5 md:p-6 bg-surface2/60 border-b border-border/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-cyan">
              <span>{project.category}</span>
              {project.dates && (
                <>
                  <span className="text-faint">•</span>
                  <span className="text-muted">{project.dates}</span>
                </>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-text">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-cyan hover:bg-surface border border-border/50 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-border/60 bg-surface/40 px-4 pt-2 gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-t border-x font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-surface border-border/80 text-cyan border-b-surface"
                : "border-transparent text-muted hover:text-text"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-t border-x font-medium transition-colors ${
              activeTab === "architecture"
                ? "bg-surface border-border/80 text-cyan border-b-surface"
                : "border-transparent text-muted hover:text-text"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Specs</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-t border-x font-medium transition-colors ${
              activeTab === "code"
                ? "bg-surface border-border/80 text-cyan border-b-surface"
                : "border-transparent text-muted hover:text-text"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Snippet</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono text-faint uppercase tracking-wider mb-2">About Project</h3>
                <p className="text-sm text-text leading-relaxed font-sans">{project.longDescription}</p>
              </div>

              {/* Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-faint uppercase tracking-wider mb-3">Key Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-surface2/40 border border-border/60 rounded-xl font-mono text-center">
                        <div className="text-xl font-bold text-amber">{m.value}</div>
                        <div className="text-[11px] text-muted mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Bullet Points */}
              <div>
                <h3 className="text-xs font-mono text-faint uppercase tracking-wider mb-3">Highlights</h3>
                <ul className="space-y-2 font-sans text-sm">
                  {project.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-text">
                      <span className="text-cyan font-mono select-none mt-1">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono text-faint uppercase tracking-wider mb-3">Workflow & System Steps</h3>
                <div className="space-y-3 font-mono text-xs">
                  {project.architecture.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-surface2/30 border border-border/50 rounded-xl">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan/10 text-cyan font-bold text-[11px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-text leading-relaxed pt-0.5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between bg-surface2/70 p-3 rounded-t-xl border border-border/60 text-xs">
                <span className="text-cyan font-medium">{project.codeSnippet.title}</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-muted hover:text-text bg-surface border border-border/60 rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan" />
                      <span className="text-cyan">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-bg border border-t-0 border-border/60 rounded-b-xl overflow-x-auto text-xs text-text leading-relaxed scrollbar-thin">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:p-5 bg-surface2/60 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded border border-border bg-surface text-[10px] font-mono text-violet">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-border bg-surface text-xs font-mono text-text hover:border-cyan/50 hover:text-cyan transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan text-bg text-xs font-mono font-bold hover:bg-cyan/90 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
