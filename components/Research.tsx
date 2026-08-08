"use client";

import { useState } from "react";
import { publications } from "@/lib/data";
import TerminalCard from "./TerminalCard";
import { FileText, Award, ExternalLink, Download, Eye, X } from "lucide-react";

export default function Research() {
  const pub = publications[0];
  const [activeTab, setActiveTab] = useState<"paper" | "certificate">("paper");
  const [isEmbeddedOpen, setIsEmbeddedOpen] = useState(true);
  const [selectedModalPdf, setSelectedModalPdf] = useState<{ title: string; url: string } | null>(null);

  const bibtex = `@article{keshav2026fast,
  title={Fast Diffusion with Physics-Correction for ACOPF},
  author={Keshav, Kris and others},
  journal={IEEE SEFET},
  year={2026}
}`;

  return (
    <section className="h-full">
      <TerminalCard command="cat research.bib && ls docs/" label="Research">
        <div className="p-6 md:p-8 space-y-6">
          <div className="border border-border/60 bg-surface2/30 rounded-xl p-5 md:p-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-text hover:text-cyan transition-colors duration-200">
                <span className="text-cyan">#</span> {pub.title}
              </h3>
              <span className="text-[10px] text-faint bg-surface border border-border px-2 py-0.5 rounded sm:self-center self-start">
                {pub.venue}
              </span>
            </div>

            <p className="text-muted text-xs leading-relaxed mb-4 font-sans">
              {pub.description}
            </p>

            <ul className="list-none space-y-1.5 mb-5 pl-0">
              {pub.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2 text-text font-sans">
                  <span className="text-cyan select-none mt-1">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="my-4 p-4 rounded bg-[#0D1117] border border-border overflow-x-auto text-[10px] text-muted leading-relaxed">
              <pre>{bibtex}</pre>
            </div>

            {/* Document switchers & repo links */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/60 justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("paper");
                    setIsEmbeddedOpen(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-sans font-medium transition-all ${
                    activeTab === "paper" && isEmbeddedOpen
                      ? "bg-cyan/20 border-cyan/50 text-cyan shadow-sm"
                      : "bg-surface/60 border-border text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Paper PDF</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("certificate");
                    setIsEmbeddedOpen(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-sans font-medium transition-all ${
                    activeTab === "certificate" && isEmbeddedOpen
                      ? "bg-amber/20 border-amber/50 text-amber shadow-sm"
                      : "bg-surface/60 border-border text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Presentation Certificate</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {pub.github && (
                  <a
                    href={pub.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-amber hover:text-amber/80 transition-colors font-semibold no-underline"
                  >
                    git_repo <span className="text-faint">→</span>
                  </a>
                )}
                {pub.arxiv && (
                  <a
                    href={pub.arxiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-cyan hover:text-cyan/80 transition-colors font-semibold no-underline"
                  >
                    arxiv <span className="text-faint">→</span>
                  </a>
                )}
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            {isEmbeddedOpen && (
              <div className="mt-5 border-t border-border/60 pt-4 animate-fadeIn font-sans">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-text">
                    {activeTab === "paper" ? (
                      <>
                        <FileText className="w-4 h-4 text-cyan" />
                        <span>Embedded Research Paper</span>
                        <span className="text-[10px] text-muted font-normal font-mono">(Fast Diffusion ACOPF)</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 text-amber" />
                        <span>IEEE SeFeT 2026 Presentation Certificate</span>
                        <span className="text-[10px] text-muted font-normal font-mono">(Paper ID 500)</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedModalPdf({
                          title: activeTab === "paper" ? "Fast Diffusion with Physics-Correction for ACOPF (Paper)" : "IEEE SeFeT 2026 Presentation Certificate",
                          url: activeTab === "paper" ? pub.paperPdf! : pub.certificatePdf!,
                        })
                      }
                      className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-cyan bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-md transition-colors"
                      title="Fullscreen view"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Fullscreen</span>
                    </button>
                    <a
                      href={activeTab === "paper" ? pub.paperPdf : pub.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-muted hover:text-text bg-surface border border-border/80 rounded-md transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open PDF</span>
                    </a>
                  </div>
                </div>

                <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-border/80 bg-bg shadow-inner">
                  <iframe
                    src={`${activeTab === "paper" ? pub.paperPdf : pub.certificatePdf}#toolbar=0`}
                    className="w-full h-full border-0"
                    title={activeTab === "paper" ? "Research Paper" : "Presentation Certificate"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </TerminalCard>

      {/* Fullscreen PDF Modal */}
      {selectedModalPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-bg/80 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setSelectedModalPdf(null)} />
          <div className="relative w-full max-w-5xl h-[88vh] bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans z-10">
            <div className="p-4 px-6 bg-surface2/80 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedModalPdf.title.includes("Certificate") ? (
                  <Award className="w-5 h-5 text-amber" />
                ) : (
                  <FileText className="w-5 h-5 text-cyan" />
                )}
                <div>
                  <h3 className="font-bold text-sm text-text font-mono">{selectedModalPdf.title}</h3>
                  <p className="text-xs text-muted font-mono">Document Viewer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedModalPdf.url}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-bg bg-cyan hover:bg-cyan/90 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <a
                  href={selectedModalPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>New Tab</span>
                </a>
                <button
                  onClick={() => setSelectedModalPdf(null)}
                  className="p-1.5 text-muted hover:text-cyan hover:bg-surface border border-border/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black/40 relative">
              <iframe
                src={selectedModalPdf.url}
                className="w-full h-full border-0"
                title={selectedModalPdf.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
