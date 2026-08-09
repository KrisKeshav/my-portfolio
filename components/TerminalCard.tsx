export default function TerminalCard({
  title,
  command,
  label,
  children,
  accent = "default",
}: {
  title?: string;
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
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-surface2/80 border-b border-border/80 text-xs text-faint backdrop-blur-md">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-3 h-3 rounded-full bg-[#FF6058] shadow-sm flex-shrink-0" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm flex-shrink-0" />
          <span className="w-3 h-3 rounded-full bg-[#28C93F] shadow-sm flex-shrink-0" />
          {title && (
            <span className="ml-2 font-sans font-bold text-text text-sm tracking-tight">
              {title}
            </span>
          )}
          <span className="ml-1 text-faint/80 font-mono text-[11px] truncate">
            {title ? `(${command})` : command}
          </span>
        </div>
        {label && (
          <span className={`px-2 py-0.5 rounded-md border font-mono ${accentMap[accent] || "bg-surface border-border"}`}>
            {label}
          </span>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

