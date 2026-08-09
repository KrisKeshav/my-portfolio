"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "positions", label: "Positions" },
  { id: "education", label: "Education" },
  { id: "links", label: "Links" },
  { id: "contact", label: "Contact" },
];

export default function ScrollNav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate overall page scroll percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      // 2. Identify active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(SECTIONS[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-surface2/40">
        <div
          className="h-full bg-gradient-to-r from-amber via-cyan to-violet transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Side Dot Navigation (Floating Rail) */}
      <nav
        aria-label="Side section navigation"
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 bg-surface/80 backdrop-blur-md p-2.5 px-2 rounded-full border border-border/80 shadow-xl"
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="relative group p-1 flex items-center justify-center focus:outline-none"
              title={`Jump to ${sec.label}`}
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-cyan shadow-[0_0_10px_rgba(77,216,211,0.6)] scale-110"
                    : "w-2 h-2 bg-muted/40 hover:bg-amber hover:scale-125"
                }`}
              />

              {/* Hover Tooltip Label */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-surface2 text-text font-mono text-[11px] font-semibold border border-border/80 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                {sec.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
