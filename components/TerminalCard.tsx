export default function TerminalCard({
  command,
  label,
  children,
  accent = "default",
}: {
  command: string;
  label?: string;
  children: React.ReactNode;
  accent?: "default" | "cyan" | "amber";
}) {
  const accentMap = {
    default: "",
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    amber: "bg-amber/10 text-amber border-amber/20",
  };

  return (
    <div className="h-full flex flex-col rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between px-5 py-3 bg-surface2/80 border-b border-border/80 font-mono text-xs text-faint backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm" />
          <span className="ml-3 font-semibold tracking-wide">{command}</span>
        </div>
        {label && (
          <span className={`px-2 py-0.5 rounded-md border ${accentMap[accent] || "bg-surface border-border"}`}>
            {label}
          </span>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
