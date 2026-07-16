import { links } from "@/lib/data";

// Renders a real, live GitHub contribution heatmap using ghchart.rshah.org,
// which builds the SVG straight from GitHub's public contribution data —
// no API key or auth needed. If you later want a fully custom chart (e.g.
// to style it exactly like the terminal theme, or add hover tooltips),
// the alternative is calling GitHub's GraphQL API server-side with a
// personal access token and rendering the grid yourself — a good stretch
// task once you're comfortable with API routes (see Day 20+ in README).
export default function GithubHeatmap() {
  const src = `https://ghchart.rshah.org/F0A84E/${links.githubUsername}`;

  return (
    <div className="rounded-lg border border-border bg-surface p-4 overflow-x-auto">
      <div className="font-mono text-xs text-faint mb-3">
        <span className="text-amber">$</span> curl github.com/{links.githubUsername}/contributions
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${links.githubUsername}'s GitHub contribution graph`}
        className="min-w-[600px] w-full"
      />
    </div>
  );
}
