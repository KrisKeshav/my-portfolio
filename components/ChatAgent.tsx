"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) {
        setApiAvailable(false);
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "🚧 This AI agent is currently under development. Please explore the site manually or use the terminal commands (type 'help' in the terminal above) to navigate! Stay tuned — this feature is coming soon.",
        }]);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setApiAvailable(false);
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "🚧 This AI agent is currently under development. Stay tuned!",
        }]);
        return;
      }

      const decoder = new TextDecoder();
      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      }

      // if we got an empty response, the API silently failed
      if (!assistantText.trim()) {
        setApiAvailable(false);
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "🚧 This AI agent is currently under development. Please explore the site manually or use the terminal commands (type 'help' in the terminal above) to navigate! Stay tuned — this feature is coming soon.",
          };
          return copy;
        });
      }
    } catch {
      setApiAvailable(false);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "🚧 This AI agent is currently under development. Stay tuned!",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm max-h-[75vh] sm:max-h-[500px] bg-surface/90 backdrop-blur-md border border-border/80 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300">
          <div className="bg-surface2/80 p-3.5 sm:p-4 border-b border-border/60 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${apiAvailable ? "bg-cyan animate-pulse" : "bg-amber"}`} />
              <h3 className="font-mono text-sm text-text font-medium">Kris&apos;s AI Agent</h3>
              {!apiAvailable && (
                <span className="text-[10px] text-amber bg-amber/10 px-2 py-0.5 rounded-full font-mono">beta</span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-faint hover:text-text transition-colors p-1"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto min-h-[260px] max-h-[360px] sm:max-h-[400px] flex flex-col gap-3 font-sans text-sm">
            {messages.length === 0 && (
              <div className="text-center text-muted mt-8 sm:mt-10">
                <p>Hi! I&apos;m an AI assistant trained on Kris&apos;s portfolio.</p>
                <p className="mt-2 text-xs">Ask me about his projects, experience, or how to use this site!</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-cyan/10 border border-cyan/20 text-text self-end rounded-tr-sm"
                    : "bg-surface2/50 border border-border/40 text-text self-start rounded-tl-sm"
                }`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="bg-surface2/50 border border-border/40 text-text self-start rounded-tl-sm max-w-[85%] p-3 rounded-2xl flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-border/60 bg-surface/50">
            <div className="flex items-center bg-surface2/50 border border-border/60 rounded-xl overflow-hidden focus-within:border-cyan/50 transition-colors">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none text-sm p-2.5 sm:p-3 outline-none text-text placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 sm:p-3 text-cyan hover:bg-cyan/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                aria-label="Send prompt"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI assistant"
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-surface2 border border-border/80 text-faint" : "bg-cyan text-bg hover:scale-105"
        }`}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
}
