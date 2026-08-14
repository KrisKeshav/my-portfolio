"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Search, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  "about",
  "skills",
  "experience",
  "research",
  "projects",
  "education",
  "positions",
  "links",
  "contact",
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-3 md:top-4 z-40 mb-6">
      <nav className="rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-3.5 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <a
            href="#"
            className="font-mono font-bold text-base md:text-lg text-amber flex items-center gap-2 no-underline select-none"
          >
            root@portfolio
            <span className="w-2 h-4 bg-amber animate-blink" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <div className="flex items-center gap-1 lg:gap-1.5 font-mono text-xs">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-muted hover:text-cyan no-underline transition-colors font-medium hover:bg-surface2/60 px-2.5 py-1.5 rounded-lg capitalize"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-faint border-l border-border/60 pl-3 ml-2">
              <button
                onClick={openSearch}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border/80 bg-surface2/50 hover:bg-surface2 text-muted hover:text-text transition-colors"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan" />
                <kbd className="px-1 py-0.2 rounded bg-surface2 text-[10px] font-bold border border-border/60">
                  ⌘K
                </kbd>
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Action Bar */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openSearch}
              className="p-1.5 rounded-lg border border-border/60 bg-surface2/50 hover:bg-surface2 text-muted hover:text-cyan transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-lg border border-border/60 bg-surface2/50 hover:bg-surface2 text-text transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-amber" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border/60 animate-fadeIn">
            <div className="grid grid-cols-3 gap-2 font-mono text-xs pb-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-muted hover:text-cyan transition-colors font-medium bg-surface2/40 hover:bg-surface2/80 px-2.5 py-2 rounded-lg capitalize truncate"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
