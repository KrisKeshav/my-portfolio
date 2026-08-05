import { links, competitiveProgramming } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function Links() {
  const ratingProgress = (competitiveProgramming.maxRating / 2000) * 100;

  return (
    <section className="h-full">
      <TerminalCard command="curl profiles.json" label="Profiles">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-4 border border-border/60 bg-surface2/30 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-text mb-3"># online_presence</h3>
              <p className="text-muted mb-4 font-sans leading-relaxed">
                Connect with me on other development platforms and professional networks.
              </p>
            </div>
            <div className="space-y-2.5">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-surface2/30 hover:border-cyan/40 hover:bg-cyan/5 transition-all text-text no-underline group"
              >
                <span>GitHub — @{links.githubUsername}</span>
                <span className="text-cyan group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-surface2/30 hover:border-cyan/40 hover:bg-cyan/5 transition-all text-text no-underline group"
              >
                <span>LinkedIn — Connect</span>
                <span className="text-cyan group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          <div className="border border-border/60 bg-surface2/30 p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-text"># competitive_programming</h3>
                <div className="text-amber text-[10px] mt-0.5">{competitiveProgramming.platform} Account</div>
              </div>
              <span className="px-2 py-0.5 rounded border border-cyan/30 bg-cyan/10 text-cyan text-[10px] font-bold">
                {competitiveProgramming.rank}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-muted">
                <span>Handle:</span>
                <a
                  href={links.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline"
                >
                  {competitiveProgramming.handle}
                </a>
              </div>

              <div className="flex justify-between items-center text-muted">
                <span>Max Rating:</span>
                <span className="text-text font-bold">{competitiveProgramming.maxRating}</span>
              </div>

              <div className="flex justify-between items-center text-muted">
                <span>Problems Solved:</span>
                <span className="text-text font-bold">{competitiveProgramming.problemsSolved}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-faint">
                  <span>Rating Progress</span>
                  <span>Expert (1600+)</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan h-full rounded-full"
                    style={{ width: `${ratingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TerminalCard>
    </section>
  );
}
