"use client";

import { useState } from "react";
import { projects, Project } from "@/lib/data";
import TerminalCard from "./TerminalCard";
import ProjectModal from "./ProjectModal";
import { Search, Layers, ExternalLink } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "AI / ML", "Cyber-Physical", "Computer Vision", "Full Stack"];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="h-full">
      <TerminalCard command="ls projects/" label={`Total ${projects.length}`}>
        <div className="p-6 md:p-8 space-y-6">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? "bg-cyan/15 text-cyan border border-cyan/40 font-bold"
                      : "bg-surface border border-border/60 text-muted hover:text-text hover:border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex items-center min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-faint absolute left-3" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface text-xs font-mono text-text placeholder:text-faint border border-border/80 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyan/50 transition-colors"
              />
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs text-muted">
                No projects found matching current filter or query.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative border border-border/60 hover:border-cyan/40 bg-surface2/30 hover:bg-surface2/60 rounded-xl p-5 md:p-6 transition-all duration-300 font-mono text-xs leading-relaxed cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-sm font-bold text-text group-hover:text-cyan transition-colors duration-200 flex items-center gap-2">
                      <span className="text-cyan">#</span>
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.dates && (
                        <span className="text-[10px] text-faint bg-surface border border-border px-2 py-0.5 rounded">
                          {project.dates}
                        </span>
                      )}
                      <span className="hidden group-hover:inline-flex items-center gap-1 text-[10px] text-cyan font-mono bg-cyan/10 px-2 py-0.5 rounded border border-cyan/30">
                        <Layers className="w-3 h-3" />
                        View Architecture
                      </span>
                    </div>
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
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-cyan group-hover:underline flex items-center gap-1 font-semibold">
                        Details & Code <span className="text-faint">→</span>
                      </span>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-[11px] text-amber hover:text-amber/80 hover:underline transition-colors font-semibold no-underline"
                        >
                          git_repo <ExternalLink className="w-3 h-3 text-faint" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </TerminalCard>

      {/* Project Modal Drawer */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
