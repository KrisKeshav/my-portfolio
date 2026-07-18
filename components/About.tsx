import { site } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="my-12 scroll-mt-20">
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
            <span className="ml-2">cat about.md</span>
          </div>
          <span>UTF-8</span>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 font-mono">
            <div className="relative group w-32 h-32 rounded-lg border border-border bg-surface2 flex items-center justify-center overflow-hidden shadow-inner select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-amberDim/20 to-violet/10 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <span className="text-4xl text-amber font-bold font-mono group-hover:scale-110 transition-transform duration-300">KK</span>
              <div className="absolute bottom-1 right-2 text-[9px] text-faint">v1.0.0</div>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-text font-mono">{site.name}</h2>
              <p className="text-xs text-muted flex items-center gap-1.5 justify-center md:justify-start">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan animate-pulse" />
                {site.location}
              </p>
            </div>
            <div className="w-full border-t border-border pt-4 text-xs space-y-2 text-muted">
              <div>
                <span className="text-faint font-semibold">Email:</span>
                <a href={`mailto:${site.email}`} className="block text-cyan hover:underline truncate">
                  {site.email}
                </a>
              </div>
              <div>
                <span className="text-faint font-semibold">Phone:</span>
                <span className="block text-text">{site.phone}</span>
              </div>
            </div>
            <a
              href="/resnew.pdf"
              download="Kris_Keshav_Resume.pdf"
              className="w-full text-center py-2 px-3 rounded border border-amber/40 hover:border-amber bg-amberDim/10 hover:bg-amberDim/20 text-amber text-xs transition-colors duration-200 no-underline font-semibold"
            >
              Download CV
            </a>
          </div>
          <div className="md:col-span-2 space-y-6">
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
      </div>
    </section>
  );
}
