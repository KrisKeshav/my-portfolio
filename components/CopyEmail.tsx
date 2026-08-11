"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { site } from "@/lib/data";

export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const obfuscated = site.email.replace("@", " [at] ").replace(/\./g, " [dot] ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = site.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 group cursor-pointer ${className}`}
      title="Click to copy email"
    >
      <span className="text-cyan font-mono">{obfuscated}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-faint group-hover:text-cyan transition-colors flex-shrink-0" />
      )}
      {copied && (
        <span className="text-[10px] text-green-400 font-mono animate-fadeIn">Copied!</span>
      )}
    </button>
  );
}
