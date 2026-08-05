import { experience, positions } from "@/lib/data";
import TerminalCard from "./TerminalCard";

type TimelineItem = {
  hash: string;
  role: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

export default function Experience() {
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
    <section className="h-full">
      <TerminalCard command={'git log --grep="experience"'} label="3 commits" accent="cyan">
        <div className="p-6 md:p-8 space-y-6 font-mono text-xs">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <div
                key={item.hash}
                className="flex items-stretch gap-5 relative group"
              >
                <div className="w-10 flex-shrink-0 flex justify-center relative select-none">
                  {!isLast && (
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-cyan/40 to-cyan/10 group-hover:from-cyan group-hover:to-cyan/40 transition-colors duration-500" />
                  )}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle
                        cx="20"
                        cy="20"
                        r="5"
                        className="fill-cyan transition-all duration-300 group-hover:r-[7]"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 rounded-xl p-5 transition-all duration-300 border border-border/60 bg-surface2/30 group-hover:border-cyan/40 group-hover:bg-cyan/5 group-hover:shadow-lg group-hover:shadow-cyan/5 group-hover:translate-x-1">
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
      </TerminalCard>
    </section>
  );
}
