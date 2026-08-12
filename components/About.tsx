import { site } from "@/lib/data";
import Image from "next/image";
import TerminalCard from "./TerminalCard";
import CopyEmail from "./CopyEmail";
import ResumePreview from "./ResumePreview";

export default function About() {
  return (
    <section className="h-full">
      <TerminalCard title="About Me" command="cat about.md" label="UTF-8">
        <div className="p-6 md:p-7 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-6 h-full font-mono">
          <div className="sm:col-span-1 xl:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <div className="relative group w-28 h-28 rounded-lg border border-border bg-surface2 overflow-hidden shadow-inner select-none">
              <Image
                src="/Kris_picture_2.jpeg"
                alt="Kris Keshav"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="112px"
                priority
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-text font-mono">{site.name}</h2>
              <p className="text-xs text-muted flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan animate-pulse" />
                {site.location}
              </p>
            </div>
            <div className="w-full border-t border-border pt-3 text-xs space-y-2 text-muted">
              <div>
                <span className="text-faint font-semibold">Email:</span>
                <CopyEmail className="block mt-0.5 text-xs" />
              </div>
            </div>
            <a
              href="/Kris_Keshav_resume.pdf"
              download="Kris_Keshav_resume.pdf"
              className="w-full text-center py-2 px-3 rounded border border-amber/40 hover:border-amber bg-amberDim/10 hover:bg-amberDim/20 text-amber text-xs transition-colors duration-200 no-underline font-semibold"
            >
              Download CV
            </a>
            <ResumePreview />
          </div>
          <div className="sm:col-span-2 xl:col-span-2 space-y-5 flex flex-col justify-center">
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono text-violet tracking-wider uppercase">{"/* Summary */"}</h3>
              <p className="text-sm font-mono text-text leading-relaxed">
                {site.tagline}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-mono text-violet tracking-wider uppercase">{"/* Background */"}</h3>
              <p className="text-sm text-muted leading-relaxed font-sans">
                {site.bio}
              </p>
            </div>
          </div>
        </div>
      </TerminalCard>
    </section>
  );
}
