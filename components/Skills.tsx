import { skills } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function Skills() {
  return (
    <section className="h-full">
      <TerminalCard title="Skills & Stack" command="ls -la skills/" label="Total 3">
        <div className="p-6 md:p-7 space-y-6 font-mono text-sm h-full flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-violet">
              <span className="text-faint/80">drwxr-xr-x</span>
              <span className="font-bold tracking-wide">core_focus/</span>
            </div>
            <div className="pl-0 sm:pl-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {skills.highPriority.map((skill, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/60 bg-surface2/40 hover:bg-surface2/80 hover:border-violet/30 transition-all duration-300 group shadow-sm flex flex-col justify-between">
                  <div className="text-amber text-xs font-semibold mb-2 group-hover:text-violet transition-colors duration-300">{skill}</div>
                  <div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber to-amber/70 group-hover:from-violet group-hover:to-violet/70 h-full rounded-full transition-all duration-500" 
                      style={{ width: skill === "Data Structures & Algorithms" ? "90%" : skill === "System Design" ? "75%" : "80%" }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan">
              <span className="text-faint/80">drwxr-xr-x</span>
              <span className="font-bold tracking-wide">current_stack/</span>
            </div>
            <div className="pl-0 sm:pl-3 flex flex-wrap gap-2">
              {skills.currentStack.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-lg border border-cyan/20 bg-cyan/5 text-cyan hover:bg-cyan/10 hover:border-cyan/40 hover:shadow-[0_0_8px_rgba(77,216,211,0.2)] transition-all duration-300 cursor-default font-medium text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted">
              <span className="text-faint/80">-rw-r--r--</span>
              <span className="font-bold tracking-wide text-text/80">tools.env</span>
            </div>
            <div className="pl-0 sm:pl-3 flex flex-wrap gap-2 text-xs">
              {skills.tools.map((tool, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-lg border border-border/80 bg-surface2/50 text-muted hover:text-text hover:bg-surface2 hover:border-border transition-all duration-300 cursor-default shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TerminalCard>
    </section>
  );
}
