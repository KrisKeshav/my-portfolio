"use client";

import { useEffect, useState } from "react";
import { site, links } from "@/lib/data";
import GithubHeatmap from "@/components/GithubHeatmap";

// ── Roadmap ──────────────────────────────────────────────────────────────
// This file currently renders only the nav + hero terminal (Day 1 goal:
// a real, running site with your name on it). Each section below is a
// stub — we build them one at a time on the days noted, and you write
// the component code yourself with guidance rather than having it handed
// to you.
//
//   Day 2–3   About       -> components/About.tsx        (reads `site`)
//   Day 4–5   Skills      -> components/Skills.tsx        (reads `skills`)
//   Day 6–8   Projects    -> components/Projects.tsx      (reads `projects`)
//   Day 9–10  Experience  -> components/Experience.tsx    (git-log UI, reads `experience`)
//   Day 11–13 Blog (MDX)  -> app/blog/[slug]/page.tsx     (reads `blogPosts`, adds MDX)
//   Day 14    Research    -> components/Research.tsx      (reads `publications`)
//   Day 15    Links       -> components/Links.tsx         (reads `links`)
//   Day 16–18 Contact     -> app/api/contact/route.ts     (first backend route)
//   Day 19+   Polish, DB-backed feature, CI/CD, deploy
// ───────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { kind: "k", text: "$ whoami" },
  { kind: "v", text: site.name + " — Software Engineer" },
  { kind: "c", text: "# building toward: DSA · System Design · Distributed Infra" },
  { kind: "k", text: "$ cat focus.txt" },
  { kind: "v", text: site.tagline },
  { kind: "tag", text: "[ status: in_progress — day 1 of 30 ]" },
] as const;

function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [rendered, setRendered] = useState<{ kind: string; text: string }[]>([]);

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIndex];

    if (charIndex <= line.text.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 18 + Math.random() * 22);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setRendered((r) => [...r, line]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const current = TERMINAL_LINES[lineIndex];
  const currentSlice = current ? current.text.slice(0, charIndex) : "";

  const colorFor = (kind: string) =>
    kind === "k" ? "text-cyan" : kind === "c" ? "text-faint" : kind === "tag" ? "text-violet" : "text-text";

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface2 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
        <span className="ml-2 font-mono text-[11px] text-faint">bash — 80x24</span>
      </div>
      <div className="px-6 py-6 font-mono text-sm leading-8">
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
      </div>
    </div>
  );
}

const NAV_ITEMS = ["about", "skills", "projects", "experience", "blog", "research", "contact"];

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
          {/*
            No live LinkedIn stats here on purpose — LinkedIn doesn't expose
            a public API for personal profile stats, and scraping would
            violate their ToS. A badge/link is the honest option.
          */}
        </section>

        {/*
          Sections below are intentionally not built yet — see the roadmap
          comment at the top of this file. Build each one as its own
          component in /components, import it here, and remove the
          matching placeholder <div>.
        */}
        <PlaceholderSection id="about" command="cat about.md" day="2–3" />
        <PlaceholderSection id="skills" command="ls -la skills/" day="4–5" />
        <PlaceholderSection id="projects" command="ls projects/" day="6–8" />
        <PlaceholderSection id="experience" command="git log --graph --oneline" day="9–10" />
        <PlaceholderSection id="blog" command="ls blog/*.md" day="11–13" />
        <PlaceholderSection id="research" command="cat research.bib" day="14" />
        <PlaceholderSection id="contact" command="./send-message.sh" day="16–18" />
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

function PlaceholderSection({ id, command, day }: { id: string; command: string; day: string }) {
  return (
    <section id={id} className="my-8 rounded-lg border border-dashed border-border p-6">
      <div className="font-mono text-xs text-faint mb-2">
        <span className="text-amber">$</span> {command}
      </div>
      <div className="font-mono text-xs text-muted">
        not built yet — scheduled for day {day} of the plan
      </div>
    </section>
  );
}
