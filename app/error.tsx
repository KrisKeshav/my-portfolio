"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-border/80 bg-surface/50 backdrop-blur-sm p-8 text-center space-y-6">
        <div className="font-mono text-xs text-[#FF6058]">
          FATAL ERROR: Unhandled exception
        </div>
        <h1 className="text-2xl font-bold font-mono text-text">
          Something went wrong
        </h1>
        <p className="text-sm text-muted font-sans">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-cyan/10 hover:bg-cyan/20 border border-cyan/40 hover:border-cyan text-cyan rounded font-mono text-xs font-semibold transition-colors"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-surface2 border border-border hover:border-faint rounded text-text font-mono text-xs no-underline hover:text-cyan transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
