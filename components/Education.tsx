import { education } from "@/lib/data";
import TerminalCard from "./TerminalCard";

type TimelineItem = {
  hash: string;
  role: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

export default function Education() {
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
    <section className="h-full">
      <TerminalCard title="Education" command={'git log --grep="education"'} label="3 commits" accent="amber">
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
                    <div className="absolute top-6 bottom-[-24px] left-[19px] w-[2px] bg-gradient-to-b from-amber/40 to-amber/10 group-hover:from-amber group-hover:to-amber/40 transition-colors duration-500" />
                  )}
                  <div className="relative mt-1">
                    <svg className="w-10 h-10 overflow-visible">
                      <circle
                        cx="20"
                        cy="20"
                        r="5"
                        className="fill-amber transition-all duration-300"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 rounded-xl p-5 transition-all duration-300 border border-border/60 bg-surface2/30 group-hover:border-amber/40 group-hover:bg-amber/5 group-hover:shadow-lg group-hover:shadow-amber/5 group-hover:translate-x-1">
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
      </TerminalCard>
    </section>
  );
}
