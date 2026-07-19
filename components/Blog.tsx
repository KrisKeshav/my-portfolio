import Link from "next/link";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <section className="h-full">
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border font-mono text-xs text-faint">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C93F]" />
            <span className="ml-2">ls blog/*.md</span>
          </div>
          <span>Total {blogPosts.length}</span>
        </div>
        <div className="p-6 md:p-8 space-y-4 font-mono text-xs">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border border-border hover:border-faint bg-surface2/20 hover:bg-surface2/60 rounded-lg transition-all duration-200 no-underline cursor-pointer group"
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
      </div>
    </section>
  );
}
