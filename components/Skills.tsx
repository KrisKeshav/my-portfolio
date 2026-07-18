import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="my-12 scroll-mt-20">
      <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between px-5 py-3 bg-surface2/80 border-b border-border/80 font-mono text-xs text-faint backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm" />
            <span className="ml-3 font-semibold tracking-wide">ls -la skills/</span>
          </div>
          <span className="bg-surface px-2 py-0.5 rounded-md border border-border">Total 3</span>
        </div>
        <div className="p-6 md:p-8 space-y-8 font-mono text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-violet">
              <span className="text-faint/80">drwxr-xr-x</span>
              <span className="font-bold tracking-wide">core_focus/</span>
            </div>
            <div className="pl-0 md:pl-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {skills.highPriority.map((skill, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-border/60 bg-surface2/40 hover:bg-surface2/80 hover:border-violet/30 transition-all duration-300 group shadow-sm">
                  <div className="text-amber font-semibold mb-3 group-hover:text-violet transition-colors duration-300">{skill}</div>
                  <div className="w-full bg-border/50 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber to-amber/70 group-hover:from-violet group-hover:to-violet/70 h-full rounded-full transition-all duration-500" 
                      style={{ width: skill === "Data Structures & Algorithms" ? "90%" : skill === "System Design" ? "75%" : "80%" }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan">
              <span className="text-faint/80">drwxr-xr-x</span>
              <span className="font-bold tracking-wide">current_stack/</span>
            </div>
            <div className="pl-0 md:pl-6 flex flex-wrap gap-2.5">
              {skills.currentStack.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3.5 py-1.5 rounded-lg border border-cyan/20 bg-cyan/5 text-cyan hover:bg-cyan/10 hover:border-cyan/40 hover:shadow-[0_0_8px_rgba(77,216,211,0.2)] transition-all duration-300 cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted">
              <span className="text-faint/80">-rw-r--r--</span>
              <span className="font-bold tracking-wide text-text/80">tools.env</span>
            </div>
            <div className="pl-0 md:pl-6 flex flex-wrap gap-2.5 text-[13px]">
              {skills.tools.map((tool, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-lg border border-border/80 bg-surface2/50 text-muted hover:text-text hover:bg-surface2 hover:border-border transition-all duration-300 cursor-default shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
