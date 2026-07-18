import { useState } from "react";
import { experience, positions } from "@/lib/data";

type TimelineItem = {
  hash: string;
  role: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

export default function Experience() {
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);

  const items: TimelineItem[] = [
    {
      hash: "a1c3f9d",
      role: experience[0].role,
      org: experience[0].org,
      location: experience[0].location,
      dates: experience[0].dates,
      bullets: experience[0].bullets,
    },
    {
      hash: "b2d4e6f",
      role: positions[1].role,
      org: positions[1].org,
      dates: positions[1].dates,
      bullets: positions[1].bullets,
    },
    {
      hash: "d4a6b8c",
      role: positions[0].role,
      org: positions[0].org,
      dates: positions[0].dates,
      bullets: positions[0].bullets,
    },
  ];

  return (
    <section id="experience" className="my-12 scroll-mt-20">
      <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between px-5 py-3 bg-surface2/80 border-b border-border/80 font-mono text-xs text-faint backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm" />
            <span className="ml-3 font-semibold tracking-wide">git log --grep=&quot;experience&quot;</span>
          </div>
          <span className="bg-cyan/10 text-cyan px-2 py-0.5 rounded-md border border-cyan/20">3 commits</span>
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
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-cyan/40 to-cyan/10 group-hover:from-cyan group-hover:to-cyan/40 transition-colors duration-500" />
                  )}
                  
                  {/* Active node */}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle 
                        cx="20" 
                        cy="20" 
                        r={isHovered ? 7 : 5} 
                        className={`fill-cyan transition-all duration-300 cursor-pointer ${isHovered ? 'shadow-[0_0_12px_#4DD8D3]' : ''}`}
                      />
                      {isHovered && (
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="12" 
                          fill="none"
                          stroke="#4DD8D3"
                          strokeWidth="2"
                          className="animate-ping opacity-70"
                        />
                      )}
                    </svg>
                  </div>
                </div>

                {/* Commit Content Card */}
                <div className={`flex-1 rounded-xl p-5 transition-all duration-300 border ${isHovered ? "border-cyan/40 bg-cyan/5 shadow-lg shadow-cyan/5 translate-x-1" : "border-border/60 bg-surface2/30"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-violet font-bold tracking-wider">{item.hash}</span>
                      <span className="px-2 py-1 rounded-md border text-[10px] font-bold text-cyan border-cyan/30 bg-cyan/10 shadow-sm">
                        main
                      </span>
                    </div>
                    <span className="text-[11px] text-muted bg-surface/50 px-2 py-1 rounded-md border border-border/50">{item.dates}</span>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="text-[15px] font-bold text-text group-hover:text-cyan transition-colors duration-300">
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
                        <span className="text-cyan select-none mt-0.5 text-lg leading-none">›</span>
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
