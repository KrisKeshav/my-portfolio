import { publications } from "@/lib/data";

export default function Research() {
  const pub = publications[0];
  const bibtex = `@article{keshav2026fast,
  title={Fast Diffusion with Physics-Correction for ACOPF},
  author={Keshav, Kris and others},
  journal={IEEE SEFET},
  year={2026}
}`;

  return (
    <section id="research" className="my-12 scroll-mt-20">
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
            <span className="ml-2">cat research.bib</span>
          </div>
          <span>BibTeX</span>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div className="border border-border bg-surface2/20 rounded-lg p-5 md:p-6 font-mono text-xs">
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

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border/60 justify-end">
              <a
                href={pub.arxiv || "https://arxiv.org"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-cyan hover:text-cyan/80 hover:underline transition-colors font-semibold no-underline"
              >
                pdf_preprint <span className="text-faint">→</span>
              </a>
              <a
                href={pub.github || "https://github.com/KrisKeshav"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-amber hover:text-amber/80 hover:underline transition-colors font-semibold no-underline"
              >
                git_repo <span className="text-faint">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
