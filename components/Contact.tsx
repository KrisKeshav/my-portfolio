import { useState } from "react";
import { site } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [progressMsg, setProgressMsg] = useState("");

  const runFakeTerminalProgress = async () => {
    setStatus("sending");
    const steps = [
      "Connecting to api.resend.com...",
      "Resolving destination mailbox...",
      "Encrypting message payload...",
      "Sending payload packet [100%]"
    ];
    for (let i = 0; i < steps.length; i++) {
      setProgressMsg(steps[i]);
      await new Promise((r) => setTimeout(r, 400));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    await runFakeTerminalProgress();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="my-12 scroll-mt-20">
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
            <span className="ml-2">./send-message.sh</span>
          </div>
          <span>Interactive Shell</span>
        </div>
        <div className="p-6 md:p-8 font-mono text-xs space-y-6">
          
          {status === "idle" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-faint">
                <span>$</span>
                <span className="text-cyan">./send-message.sh --interactive</span>
              </div>
              
              <div className="space-y-3.5 pl-4 border-l border-border">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-muted block">name :</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full max-w-md bg-surface2 border border-border rounded px-3 py-1.5 text-text focus:outline-none focus:border-cyan text-xs font-mono"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-muted block">email :</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full max-w-md bg-surface2 border border-border rounded px-3 py-1.5 text-text focus:outline-none focus:border-cyan text-xs font-mono"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-muted block">message :</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-surface2 border border-border rounded px-3 py-1.5 text-text focus:outline-none focus:border-cyan text-xs font-mono resize-none"
                    placeholder="Type your message details here..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan/10 hover:bg-cyan/20 border border-cyan/40 hover:border-cyan text-cyan rounded font-semibold transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}

          {status === "sending" && (
            <div className="space-y-3 pl-4 border-l border-cyan py-1">
              <div className="text-cyan animate-pulse">Running SMTP pipeline...</div>
              <div className="text-text font-mono text-[11px]">{progressMsg}</div>
              <div className="flex gap-1">
                <span className="w-1.5 h-3 bg-cyan animate-pulse" />
                <span className="w-1.5 h-3 bg-cyan animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-3 bg-cyan animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4 pl-4 border-l border-cyan py-1">
              <div className="text-cyan font-bold">SUCCESS: Message delivered successfully.</div>
              <p className="text-muted font-sans max-w-md leading-relaxed">
                Your message has been routed to <span className="text-text font-mono font-semibold">{site.email}</span>. I will review it and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-3.5 py-1.5 bg-surface2 border border-border hover:border-faint rounded text-text hover:text-cyan transition-colors"
              >
                Send Another
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4 pl-4 border-l border-[#FF6058] py-1">
              <div className="text-[#FF6058] font-bold">ERROR: Code 500 — Delivery failed.</div>
              <p className="text-muted font-sans max-w-md leading-relaxed">
                Something went wrong while executing the SMTP connection. Please verify your internet connection or email directly at <a href={`mailto:${site.email}`} className="text-cyan hover:underline font-mono">{site.email}</a>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-3.5 py-1.5 bg-surface2 border border-border hover:border-faint rounded text-text hover:text-cyan transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
