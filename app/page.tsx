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
import Navbar from "@/components/Navbar";
import BootSequence from "@/components/BootSequence";

const GithubHeatmap = dynamic(() => import("@/components/GithubHeatmap"), { ssr: false });

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-[1400px] p-3 sm:p-4 md:p-6 lg:p-8">
      <BootSequence />
      {/* Scroll Navigation Aid (Progress Bar & Side Dots) */}
      <ScrollNav />

      {/* Top Responsive Navbar */}
      <Navbar />

      {/* BENTO GRID */}
      <main className="flex flex-col gap-4 md:gap-6">

        {/* HERO TERMINAL */}
        <FadeIn className="scroll-mt-20 md:scroll-mt-24">
          <Hero />
        </FadeIn>

        {/* ROW 1: About + Skills (first row two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full">
            <div id="about" className="h-full scroll-mt-20 md:scroll-mt-24">
              <About />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full">
            <div id="skills" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Skills />
            </div>
          </FadeIn>
        </div>

        {/* ROW 2: Experience + Research (second row two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full">
            <div id="experience" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Experience />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full">
            <div id="research" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Research />
            </div>
          </FadeIn>
        </div>

        {/* ROW 3: Projects (single column format with multiple projects in multiple columns) */}
        <FadeIn className="h-full">
          <div id="projects" className="h-full scroll-mt-20 md:scroll-mt-24">
            <Projects />
          </div>
        </FadeIn>

        {/* ROW 4: Education (+ Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full">
            <div id="education" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Education />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full">
            <div id="activity" className="h-full scroll-mt-20 md:scroll-mt-24">
              <GithubHeatmap />
            </div>
          </FadeIn>
        </div>

        {/* ROW 5: Position of Responsibility (single column format with sub-fields column-wise) */}
        <FadeIn className="h-full">
          <div id="positions" className="h-full scroll-mt-20 md:scroll-mt-24">
            <Positions />
          </div>
        </FadeIn>

        {/* ROW 6: Profiles/Links + Contacts (last row for now) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <FadeIn className="h-full">
            <div id="links" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Links />
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full">
            <div id="contact" className="h-full scroll-mt-20 md:scroll-mt-24">
              <Contact />
            </div>
          </FadeIn>
        </div>

      </main>

      <footer className="text-center font-mono text-xs sm:text-sm text-faint py-10 md:py-12 mt-10 md:mt-12 space-y-3 px-4">
        <div className="text-muted">built with <span className="text-amber">$CURIOSITY</span>, one commit a day</div>
        <div className="max-w-md mx-auto leading-relaxed">
          This site logs basic visit analytics (page, approximate location, time).
          No cookies, no personal profile stored.
        </div>
      </footer>
    </div>
  );
}
