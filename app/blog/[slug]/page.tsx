"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { blogPostsContent } from "@/lib/blogData";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = blogPostsContent[slug];

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 font-mono text-sm text-center">
        <h1 className="text-xl font-bold text-text mb-4">ERROR 404: Post Not Found</h1>
        <p className="text-muted mb-8">No log entry found matching slug: &quot;{slug}&quot;</p>
        <Link href="/" className="text-cyan hover:underline">
          cd ..
        </Link>
      </main>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur bg-bg/90 border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3.5">
          <div className="font-mono font-semibold text-sm text-amber flex items-center gap-2">
            root@portfolio
            <span className="w-2 h-4 bg-amber animate-blink" />
          </div>
          <div className="font-mono text-xs">
            <Link href="/" className="text-muted hover:text-text no-underline">
              <span className="text-faint">./</span>
              dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6 font-mono text-xs">
          <Link href="/" className="text-cyan hover:underline flex items-center gap-1.5 no-underline">
            <span>$</span> cd ..
          </Link>
        </div>

        <article className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
              <span className="ml-2">{post.slug}.md</span>
            </div>
            <span>{post.date}</span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="border-b border-border/80 pb-4">
              <h1 className="text-xl md:text-2xl font-bold font-mono text-text mb-2">
                {post.title}
              </h1>
              <div className="text-[11px] font-mono text-muted flex items-center gap-2">
                <span>Date: {post.date}</span>
                <span>•</span>
                <span>Author: Kris Keshav</span>
              </div>
            </div>

            <div className="leading-relaxed">
              {renderContent(post.content)}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

function parseInlineMarkdown(text: string) {
  const parts = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchText = match[0];

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    if (matchText.startsWith("`")) {
      parts.push(
        <code key={matchIndex} className="px-1.5 py-0.5 rounded bg-surface2 border border-border text-xs text-amber font-mono">
          {matchText.slice(1, -1)}
        </code>
      );
    } else if (matchText.startsWith("**")) {
      parts.push(
        <strong key={matchIndex} className="font-bold text-text">
          {matchText.slice(2, -2)}
        </strong>
      );
    } else if (matchText.startsWith("[")) {
      const closingBracket = matchText.indexOf("]");
      const label = matchText.slice(1, closingBracket);
      const url = matchText.slice(closingBracket + 2, -1);
      parts.push(
        <a key={matchIndex} href={url} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
          {label}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  let inCodeBlock = false;
  const codeBlockContent: string[] = [];

  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const code = codeBlockContent.join("\n");
        codeBlockContent.length = 0;
        elements.push(
          <pre key={`code-${idx}`} className="my-4 p-4 rounded bg-[#0D1117] border border-border overflow-x-auto text-[11px] text-text font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={idx} className="text-lg md:text-xl font-bold text-text mt-6 mb-3 font-mono">
          {line.slice(2)}
        </h1>
      );
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={idx} className="text-base md:text-lg font-bold text-text mt-5 mb-2 font-mono">
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="text-sm md:text-base font-bold text-text mt-4 mb-2 font-mono">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    if (line.startsWith("- ")) {
      elements.push(
        <li key={idx} className="list-disc ml-6 my-1 text-xs text-muted font-sans leading-relaxed">
          {parseInlineMarkdown(line.slice(2))}
        </li>
      );
      return;
    }

    if (line.trim() === "") {
      elements.push(<div key={idx} className="h-2" />);
      return;
    }

    elements.push(
      <p key={idx} className="my-2.5 text-xs text-muted font-sans leading-relaxed">
        {parseInlineMarkdown(line)}
      </p>
    );
  });

  return elements;
}
