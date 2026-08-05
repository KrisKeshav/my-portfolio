import Link from "next/link";
import { blogPosts } from "@/lib/data";
import TerminalCard from "./TerminalCard";

export default function Blog() {
  return (
    <section className="h-full">
      <TerminalCard command="ls blog/*.md" label={`Total ${blogPosts.length}`}>
        <div className="p-6 md:p-8 space-y-4 font-mono text-xs">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border/60 hover:border-cyan/30 bg-surface2/30 hover:bg-surface2/60 rounded-xl transition-all duration-200 no-underline cursor-pointer group"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-text group-hover:text-cyan transition-colors duration-200">
                  -rw-r--r-- {post.slug}.md
                </h3>
                <p className="text-muted text-[11px] font-sans truncate max-w-lg">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:self-center self-start flex-shrink-0">
                <span className="text-faint font-sans text-[10px]">{post.date}</span>
                <span className="text-cyan group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </TerminalCard>
    </section>
  );
}
