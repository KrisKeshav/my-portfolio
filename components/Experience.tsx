"use client";

import { useState } from "react";
import { experience } from "@/lib/data";
import TerminalCard from "./TerminalCard";
import { Award, FileText, ExternalLink, Download, X, Eye, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const [selectedCert, setSelectedCert] = useState<{ title: string; url: string } | null>(null);
  const [inlineCertOpen, setInlineCertOpen] = useState<Record<string, boolean>>({});

  const toggleInlineCert = (hash: string) => {
    setInlineCertOpen((prev) => ({ ...prev, [hash]: !prev[hash] }));
  };

  return (
    <section className="h-full">
      <TerminalCard title="Corporate Experience" command={'git log --grep="corporate-experience"'} label={`${experience.length} commit`} accent="cyan">
        <div className="p-6 md:p-8 space-y-6 font-mono text-xs">
          {experience.map((item, idx) => {
            const isLast = idx === experience.length - 1;
            const isInlineOpen = !!inlineCertOpen[item.hash];

            return (
              <div key={item.hash} className="flex items-stretch gap-5 relative group">
                <div className="w-10 flex-shrink-0 flex justify-center relative select-none">
                  {!isLast && (
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-cyan/40 to-cyan/10 group-hover:from-cyan group-hover:to-cyan/40 transition-colors duration-500" />
                  )}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle
                        cx="20"
                        cy="20"
                        r="5"
                        className="fill-cyan transition-all duration-300 group-hover:r-[7]"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 rounded-xl p-5 transition-all duration-300 border border-border/60 bg-surface2/30 group-hover:border-cyan/40 group-hover:bg-cyan/5 group-hover:shadow-lg group-hover:shadow-cyan/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-violet font-bold tracking-wider">{item.hash}</span>
                      <span className="px-2 py-1 rounded-md border text-[10px] font-bold text-cyan border-cyan/30 bg-cyan/10 shadow-sm">
                        corporate
                      </span>
                    </div>
                    <span className="text-[11px] text-muted bg-surface/50 px-2 py-1 rounded-md border border-border/50">
                      {item.dates}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[15px] font-bold text-text group-hover:text-cyan transition-colors duration-300">
                        {item.role}
                      </h3>
                      {item.certificateUrl && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleInlineCert(item.hash)}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-cyan bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg transition-all"
                            title="Toggle embedded certificate viewer"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>{isInlineOpen ? "Hide Proof" : "Embedded Proof"}</span>
                            {isInlineOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          <button
                            onClick={() => setSelectedCert({ title: `${item.org} - ${item.role}`, url: item.certificateUrl! })}
                            className="flex items-center gap-1 px-2 py-1 text-[11px] font-sans font-medium text-amber bg-amber/10 hover:bg-amber/20 border border-amber/30 rounded-lg transition-all"
                            title="Open certificate in full modal viewer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Fullscreen</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-muted flex items-center gap-2 mt-1 font-sans text-[13px]">
                      <span className="font-semibold text-text/90">{item.org}</span>
                      {item.location && (
                        <>
                          <span className="text-faint/60">•</span>
                          <span className="text-faint italic">{item.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="list-none space-y-2 pl-0 mt-4 border-t border-border/40 pt-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-muted leading-relaxed font-sans">
                        <span className="text-cyan select-none mt-0.5 text-lg leading-none">›</span>
                        <span className="text-[13px] text-text/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline Certificate Viewer */}
                  {item.certificateUrl && isInlineOpen && (
                    <div className="mt-5 border-t border-cyan/20 pt-4 animate-fadeIn">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <div className="flex items-center gap-2 text-[11px] font-sans text-cyan font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-cyan" />
                          <span>Verified Internship Certificate</span>
                        </div>
                        <a
                          href={item.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-sans text-muted hover:text-cyan transition-colors"
                        >
                          <span>Open PDF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="relative w-full h-[420px] rounded-xl overflow-hidden border border-border/80 bg-bg shadow-inner">
                        <iframe
                          src={`${item.certificateUrl}#toolbar=0`}
                          className="w-full h-full border-0"
                          title={`${item.org} Internship Certificate`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </TerminalCard>

      {/* Certificate Modal Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-bg/80 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setSelectedCert(null)} />
          <div className="relative w-full max-w-4xl h-[85vh] bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans z-10">
            {/* Modal Header */}
            <div className="p-4 px-6 bg-surface2/80 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber" />
                <div>
                  <h3 className="font-bold text-sm text-text font-mono">{selectedCert.title}</h3>
                  <p className="text-xs text-muted">Official Completion Certificate</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.url}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-bg bg-amber hover:bg-amber/90 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <a
                  href={selectedCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>New Tab</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 text-muted hover:text-cyan hover:bg-surface border border-border/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF Viewer */}
            <div className="flex-1 bg-black/40 relative">
              <iframe
                src={selectedCert.url}
                className="w-full h-full border-0"
                title={selectedCert.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
