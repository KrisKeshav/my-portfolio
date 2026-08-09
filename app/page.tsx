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

const GithubHeatmap = dynamic(() => import("@/components/GithubHeatmap"), { ssr: false });

const NAV_ITEMS = ["about", "skills", "projects", "experience", "positions", "education", "research", "links", "contact"];

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-[1400px] p-4 md:p-6 lg:p-8">
      {/* Top Navbar */}
      <nav className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-sm p-5 px-8 shadow-sm">
        <div className="font-mono font-bold text-xl text-amber flex items-center gap-2">
          root@portfolio
          <span className="w-2.5 h-5 bg-amber animate-blink" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item}`} className="text-muted hover:text-cyan no-underline transition-colors font-medium">
                ./{item}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-faint border-l border-border/60 pl-4 ml-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border/80 bg-surface2 text-muted font-sans font-bold text-[10px]">⌘K</kbd>
            <span>to navigate</span>
          </div>
        </div>
      </nav>

      {/* BENTO GRID */}
      <main className="flex flex-col gap-4 md:gap-6">

        {/* ROW: Hero + About */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <FadeIn className="h-full min-h-[400px] xl:min-h-0">
            <Hero />
          </FadeIn>
          <FadeIn delay={0.1} className="h-full scroll-mt-24">
            <div id="about" className="h-full">
              <About />
            </div>
          </FadeIn>
        </div>

        {/* ACTIVITY - full width */}
        <FadeIn delay={0.15} className="scroll-mt-24">
          <div id="activity">
            <GithubHeatmap />
          </div>
        </FadeIn>

        {/* SKILLS - full width */}
        <FadeIn className="scroll-mt-24">
          <div id="skills">
            <Skills />
          </div>
        </FadeIn>

        {/* PROJECTS - full width */}
        <FadeIn className="scroll-mt-24">
          <div id="projects">
            <Projects />
          </div>
        </FadeIn>

        {/* ROW: Experience + Positions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <FadeIn className="h-full scroll-mt-24">
            <div id="experience" className="h-full">
              <Experience />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full scroll-mt-24">
            <div id="positions" className="h-full">
              <Positions />
            </div>
          </FadeIn>
        </div>

        {/* ROW: Education + Research */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <FadeIn className="h-full scroll-mt-24">
            <div id="education" className="h-full">
              <Education />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="h-full scroll-mt-24">
            <div id="research" className="h-full">
              <Research />
            </div>
          </FadeIn>
        </div>

        {/* ROW: Links + Contact */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <FadeIn className="h-full scroll-mt-24">
            <div id="links" className="h-full">
              <Links />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="h-full scroll-mt-24">
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
