import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Positions from "@/components/Positions";
import Education from "@/components/Education";
import Research from "@/components/Research";
import Links from "@/components/Links";
import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";
import ScrollNav from "@/components/ScrollNav";
import ThemeToggle from "@/components/ThemeToggle";
import BootSequence from "@/components/BootSequence";

const GithubHeatmap = dynamic(() => import("@/components/GithubHeatmap"), { ssr: false });

const NAV_ITEMS = ["about", "skills", "experience", "research", "projects", "education", "positions", "links", "contact"];

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-[1400px] p-4 md:p-6 lg:p-8">
      <BootSequence />
      {/* Scroll Navigation Aid (Progress Bar & Side Dots) */}
      <ScrollNav />

      {/* Top Navbar */}
      <nav className="sticky top-4 z-40 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface/80 backdrop-blur-md p-4 px-6 md:px-8 shadow-lg">
        <div className="font-mono font-bold text-lg text-amber flex items-center gap-2">
          root@portfolio
          <span className="w-2 h-4 bg-amber animate-blink" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="text-muted hover:text-cyan no-underline transition-colors font-medium hover:bg-surface2/60 px-2 py-1 rounded-md capitalize"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-faint border-l border-border/60 pl-4 ml-1">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border/80 bg-surface2 text-muted font-sans font-bold text-[10px]">⌘K</kbd>
            <span>to search</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* BENTO GRID */}
      <main className="flex flex-col gap-4 md:gap-6">

        {/* HERO TERMINAL */}
        <FadeIn className="scroll-mt-24">
          <Hero />
        </FadeIn>

        {/* ROW 1: About + Skills (first row two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full scroll-mt-24">
            <div id="about" className="h-full">
              <About />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full scroll-mt-24">
            <div id="skills" className="h-full">
              <Skills />
            </div>
          </FadeIn>
        </div>

        {/* ROW 2: Experience + Research (second row two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full scroll-mt-24">
            <div id="experience" className="h-full">
              <Experience />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full scroll-mt-24">
            <div id="research" className="h-full">
              <Research />
            </div>
          </FadeIn>
        </div>

        {/* ROW 3: Projects (single column format with multiple projects in multiple columns) */}
        <FadeIn className="scroll-mt-24">
          <div id="projects" className="h-full">
            <Projects />
          </div>
        </FadeIn>

        {/* ROW 4: Education (+ Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full scroll-mt-24">
            <div id="education" className="h-full">
              <Education />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full scroll-mt-24">
            <div id="activity" className="h-full">
              <GithubHeatmap />
            </div>
          </FadeIn>
        </div>

        {/* ROW 5: Position of Responsibility (single column format with sub-fields column-wise) */}
        <FadeIn className="scroll-mt-24">
          <div id="positions" className="h-full">
            <Positions />
          </div>
        </FadeIn>

        {/* ROW 6: Profiles/Links + Contacts (last row for now) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full scroll-mt-24">
            <div id="links" className="h-full">
              <Links />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full scroll-mt-24">
            <div id="contact" className="h-full">
              <Contact />
            </div>
          </FadeIn>
        </div>

      </main>

      <footer className="text-center font-mono text-sm text-faint py-12 mt-12 space-y-3">
        <div className="text-muted">built with <span className="text-amber">$CURIOSITY</span>, one commit a day</div>
        <div>
          This site logs basic visit analytics (page, approximate location, time).
          No cookies, no personal profile stored.
        </div>
      </footer>
    </div>
  );
}
