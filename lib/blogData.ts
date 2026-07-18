export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

export const blogPostsContent: Record<string, BlogPost> = {
  "day-1-scaffold": {
    slug: "day-1-scaffold",
    title: "Day 1 — scaffolding this site instead of a scratch repo",
    date: "2026-07-16",
    content: `# Day 1 — Scaffolding this site instead of a scratch repo

When building a personal portfolio, it is tempting to go with standard, pre-made templates or drag-and-drop builders. However, as software engineers, our portfolios should reflect our core technical choices, architecture decisions, and code craftsmanship.

Here is why I built this project using a robust Next.js 14 and Tailwind stack:

## The Stack Decisions

- **Next.js 14 (App Router)**: Utilizing server-side rendering (SSR) and Server Components allows us to build extremely fast pages that have great SEO out of the box. The file-based App Router is standard for current production codebases.
- **TypeScript**: Having strongly typed structures forces us to design clear data shapes. It makes maintaining content easy and reduces standard runtime errors.
- **Tailwind CSS**: Utility classes make development fast, and the layout system matches current responsive standards.
- **Content-as-code**: Instead of running a heavy Postgres/MongoDB instance to store data that changes once a month, storing it as typed data in TypeScript is the absolute correct engineering trade-off. It keeps builds static, fast, and simple to host.

## Visual Identity

I wanted a terminal-inspired developer theme. A dark theme with green, amber, cyan, and violet console outputs that represents code logs, git commits, and shell scripts. It's clean, direct, and speaks the language of recruiters and hiring managers.

Stay tuned for the daily build log!
`
  },
  "custom-git-log-timeline": {
    slug: "custom-git-log-timeline",
    title: "Writing a custom git-log SVG timeline in React",
    date: "2026-07-18",
    content: `# Writing a custom git-log SVG timeline in React

In designing the experience section of this portfolio, I wanted to showcase my work, education, and extra-curricular positions in a way that feels organic to developers. A standard bulleted list is boring; a **git log graph** is interactive, premium, and visually engaging.

## Design Concept

In a git log, commits are represented as dots on vertical paths, connected by branches. I mapped out two main branches:
1. \`main\` (Professional experience and leadership positions)
2. \`academic\` (Education milestones)

To make it responsive, we use:
- A layout grid where the left column houses the git graph (using SVG lines and circles) and the right column houses the commit detail card.
- **Dynamic CSS variables and SVG coordinates**: Vertical SVG lines stretch to match the exact height of the cards, meaning the branches stay continuous regardless of the text size.
- **Hover effects**: Hovering over a card highlights its respective commit node, and vice versa.

## Core Implementation Details

The SVG code maps each commit index to lines:
\`\`\`typescript
// SVG Line drawing
// We draw vertical lines for active branches and map dots to their indices
<svg className="w-16 h-full min-h-[100px]" ...>
  <line x1="20" y1="0" x2="20" y2="100%" stroke="#22262E" strokeWidth="2" />
  {/* Active branch dot */}
  <circle cx="20" cy="40" r="6" fill="#4DD8D3" />
</svg>
\`\`\`

By coupling React state with pure SVG, we achieved a smooth, highly detailed visual timeline that is lightweight, fully accessible, and completely customized.
`
  }
};
