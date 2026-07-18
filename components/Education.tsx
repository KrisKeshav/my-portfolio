import { useState } from "react";
import { education } from "@/lib/data";

type TimelineItem = {
  hash: string;
  role: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

export default function Education() {
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);

  const items: TimelineItem[] = [
    {
      hash: "c3f5a7b",
      role: "Undergraduate Student",
      org: education[0].institution,
      location: "Roorkee, India",
      dates: education[0].dates,
      bullets: [education[0].detail],
    },
    {
      hash: "e5b7c9d",
      role: "Intermediate (Class XII)",
      org: education[1].institution,
      location: "Patna, India",
      dates: education[1].dates,
      bullets: [education[1].detail],
    },
    {
      hash: "f6c8d0e",
      role: "Matriculate (Class X)",
      org: education[2].institution,
      location: "Patna, India",
      dates: education[2].dates,
      bullets: [education[2].detail],
    },
  ];

  return (
    <section id="education" className="my-12 scroll-mt-20">
      <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between px-5 py-3 bg-surface2/80 border-b border-border/80 font-mono text-xs text-faint backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm" />
            <span className="ml-3 font-semibold tracking-wide">git log --grep="education"</span>
          </div>
          <span className="bg-amber/10 text-amber px-2 py-0.5 rounded-md border border-amber/20">3 commits</span>
        </div>
        <div className="p-6 md:p-8 space-y-6 font-mono text-xs">
          {items.map((item, idx) => {
            const isHovered = hoveredHash === item.hash;
            const isLast = idx === items.length - 1;

            return (
              <div 
                key={item.hash}
                className="flex items-stretch gap-5 relative group"
                onMouseEnter={() => setHoveredHash(item.hash)}
                onMouseLeave={() => setHoveredHash(null)}
              >
                {/* Visual Git Graph Column */}
                <div className="w-10 flex-shrink-0 flex justify-center relative select-none">
                  {/* Vertical branch line */}
                  {!isLast && (
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-amber/40 to-amber/10 group-hover:from-amber group-hover:to-amber/40 transition-colors duration-500" />
                  )}
                  
                  {/* Active node */}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle 
                        cx="20" 
                        cy="20" 
                        r={isHovered ? 7 : 5} 
                        className={`fill-amber transition-all duration-300 cursor-pointer ${isHovered ? 'shadow-[0_0_12px_#F0A84E]' : ''}`}
                      />
                      {isHovered && (
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="12" 
                          fill="none"
                          stroke="#F0A84E"
                          strokeWidth="2"
                          className="animate-ping opacity-70"
                        />
                      )}
                    </svg>
                  </div>
                </div>

                {/* Commit Content Card */}
                <div className={`flex-1 rounded-xl p-5 transition-all duration-300 border ${isHovered ? "border-amber/40 bg-amber/5 shadow-lg shadow-amber/5 translate-x-1" : "border-border/60 bg-surface2/30"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-violet font-bold tracking-wider">{item.hash}</span>
                      <span className="px-2 py-1 rounded-md border text-[10px] font-bold text-amber border-amber/30 bg-amber/10 shadow-sm">
                        academic
                      </span>
                    </div>
                    <span className="text-[11px] text-muted bg-surface/50 px-2 py-1 rounded-md border border-border/50">{item.dates}</span>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="text-[15px] font-bold text-text group-hover:text-amber transition-colors duration-300">
                      {item.role}
                    </h3>
                    <div className="text-muted flex items-center gap-2 mt-1 font-sans text-[13px]">
                      <span className="font-medium text-text/80">{item.org}</span>
                      {item.location && (
                        <>
                          <span className="text-faint/60">•</span>
                          <span className="text-faint italic">{item.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="list-none space-y-2 pl-0 mt-4 border-t border-border/40 pt-4">
                    {item.bullets.map((bullet, bIdx) => (
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
      </div>
    </section>
  );
}
