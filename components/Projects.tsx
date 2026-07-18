import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="my-12 scroll-mt-20">
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
            <span className="ml-2">ls projects/</span>
          </div>
          <span>Total {projects.length}</span>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group relative border border-border hover:border-faint bg-surface2/40 hover:bg-surface2/80 rounded-lg p-5 md:p-6 transition-all duration-300 font-mono text-xs leading-relaxed"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-text group-hover:text-cyan transition-colors duration-200">
                  <span className="text-cyan">#</span> {project.name}
                </h3>
                {project.dates && (
                  <span className="text-[10px] text-faint bg-surface border border-border px-2 py-0.5 rounded sm:self-center self-start">
                    {project.dates}
                  </span>
                )}
              </div>
              <p className="text-muted text-xs leading-relaxed mb-4 font-sans">
                {project.description}
              </p>
              <ul className="list-none space-y-1.5 mb-5 pl-0">
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-text font-sans">
                    <span className="text-cyan select-none mt-1">›</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded border border-border bg-surface text-[10px] text-violet"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github || "https://github.com/KrisKeshav"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-amber hover:text-amber/80 hover:underline transition-colors font-semibold no-underline"
                >
                  git_repo <span className="text-faint">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
