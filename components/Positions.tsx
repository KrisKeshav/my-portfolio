import { positions } from "@/lib/data";
import TerminalCard from "./TerminalCard";
import { Users, Award, ShieldCheck, Code, Globe, GraduationCap } from "lucide-react";

export default function Positions() {
  const getCategoryIcon = (org: string) => {
    if (org.includes("MaRS")) return <Code className="w-3.5 h-3.5 text-cyan" />;
    if (org.includes("NSS")) return <Users className="w-3.5 h-3.5 text-amber" />;
    if (org.includes("EESS")) return <Globe className="w-3.5 h-3.5 text-violet" />;
    if (org.includes("Cognizance")) return <GraduationCap className="w-3.5 h-3.5 text-cyan" />;
    return <Award className="w-3.5 h-3.5 text-amber" />;
  };

  return (
    <section className="h-full">
      <TerminalCard title="Positions of Responsibility" command={'git log --grep="positions-of-responsibility"'} label={`${positions.length} campus roles`} accent="amber">
        <div className="p-6 md:p-8 space-y-6 font-mono text-xs">
          {positions.map((pos, idx) => {
            const isLast = idx === positions.length - 1;

            return (
              <div key={idx} className="flex items-stretch gap-5 relative group">
                <div className="w-10 flex-shrink-0 flex justify-center relative select-none">
                  {!isLast && (
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-amber/40 to-amber/10 group-hover:from-amber group-hover:to-amber/40 transition-colors duration-500" />
                  )}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle
                        cx="20"
                        cy="20"
                        r="5"
                        className="fill-amber transition-all duration-300 group-hover:r-[7]"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 rounded-xl p-5 transition-all duration-300 border border-border/60 bg-surface2/30 group-hover:border-amber/40 group-hover:bg-amber/5 group-hover:shadow-lg group-hover:shadow-amber/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-surface border border-border/60">
                        {getCategoryIcon(pos.org)}
                      </div>
                      <span className="px-2 py-0.5 rounded-md border text-[10px] font-bold text-amber border-amber/30 bg-amber/10">
                        campus-role
                      </span>
                    </div>
                    <span className="text-[11px] text-muted bg-surface/50 px-2 py-1 rounded-md border border-border/50">
                      {pos.dates}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-[15px] font-bold text-text group-hover:text-amber transition-colors duration-300">
                      {pos.role}
                    </h3>
                    <p className="text-muted font-sans text-[13px] mt-0.5 font-medium text-text/80">
                      {pos.org}
                    </p>
                  </div>

                  <ul className="list-none space-y-2 pl-0 mt-4 border-t border-border/40 pt-4">
                    {pos.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-muted leading-relaxed font-sans">
                        <span className="text-amber select-none mt-0.5 text-lg leading-none">›</span>
                        <span className="text-[13px] text-text/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </TerminalCard>
    </section>
  );
}
