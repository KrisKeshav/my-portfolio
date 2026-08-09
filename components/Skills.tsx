import { skills } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function Skills() {
  return (
    <section className="h-full">
      <TerminalCard title="Skills & Stack" command="ls -la skills/" label="Total 3">
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
      </TerminalCard>
    </section>
  );
}
