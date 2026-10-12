import { awards } from "@/lib/data";
import TerminalCard from "./TerminalCard";
import { Trophy } from "lucide-react";

export default function Achievements() {
  return (
    <section className="h-full">
      <TerminalCard title="Achievements" command="grep -r 'rank' awards/" label={`${awards.length} entries`} accent="amber">
        <ul className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none font-sans text-sm">
          {awards.map((award) => (
            <li
              key={award}
              className="flex items-start gap-3 rounded-xl p-4 border border-border/60 bg-surface2/30 hover:border-amber/40 hover:bg-amber/5 transition-all duration-300"
            >
              <Trophy className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
              <span className="text-text/90 leading-relaxed">{award}</span>
            </li>
          ))}
        </ul>
      </TerminalCard>
    </section>
  );
}
