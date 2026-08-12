"use client";

import { useState } from "react";
import { Eye, EyeOff, Download, ExternalLink, X, Maximize2 } from "lucide-react";

export default function ResumePreview() {
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-center py-2 px-3 rounded border border-cyan/30 hover:border-cyan bg-cyan/5 hover:bg-cyan/10 text-cyan text-xs transition-colors duration-200 no-underline font-semibold flex items-center justify-center gap-1.5"
      >
        {expanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        {expanded ? "Hide Preview" : "Preview Resume"}
      </button>

      {expanded && (
        <div className="mt-3 animate-fadeIn space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-faint">Kris_Keshav_resume.pdf — inline viewer</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFullscreen(true)}
                className="p-1 text-muted hover:text-cyan transition-colors rounded"
                title="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <a
                href="/Kris_Keshav_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-muted hover:text-cyan transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-border/80 bg-bg shadow-inner">
            <iframe
              src="/Kris_Keshav_resume.pdf#toolbar=0"
              className="w-full h-full border-0"
              title="Resume Preview"
            />
          </div>
        </div>
      )}

      {/* Fullscreen modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-bg/80 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setFullscreen(false)} />
          <div className="relative w-full max-w-5xl h-[88vh] bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans z-10">
            <div className="p-4 px-6 bg-surface2/80 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-cyan" />
                <div>
                  <h3 className="font-bold text-sm text-text font-mono">Resume — Kris Keshav</h3>
                  <p className="text-xs text-muted font-mono">Document Viewer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/Kris_Keshav_resume.pdf"
                  download="Kris_Keshav_resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-bg bg-cyan hover:bg-cyan/90 rounded-lg transition-colors no-underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <a
                  href="/Kris_Keshav_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg transition-colors no-underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>New Tab</span>
                </a>
                <button
                  onClick={() => setFullscreen(false)}
                  className="p-1.5 text-muted hover:text-cyan hover:bg-surface border border-border/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black/40 relative">
              <iframe
                src="/Kris_Keshav_resume.pdf"
                className="w-full h-full border-0"
                title="Resume Full View"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
