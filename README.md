# Kris Keshav — Portfolio (build log)

Personal portfolio + blog, built as a 30-day learning project rather than
handed to you finished. Day 1 (this scaffold) is done. Everything else you
build yourself, one section at a time, with guidance.

## Stack — and why

| Piece | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Most in-demand React framework right now; Server Components, file-based routing, one command to deploy. |
| Language | **TypeScript** | Forces you to define real data shapes (see `lib/data.ts`) — the habit transfers directly to interviews. |
| Styling | **Tailwind CSS** | Fast to write, and the utility-class approach is genuinely common in production codebases now. |
| Content | **Typed data / MDX** — no database | Your content (projects, experience, publications) is small and changes rarely. Content-as-code is the correct choice here, not a shortcut. |
| Deploy | **Vercel** | Zero-config for Next.js, free tier, real CI/CD experience. |
| Later: DB | **Postgres + Prisma** (Neon/Supabase), *not* MongoDB | Once you add something genuinely dynamic (contact-form inbox, view counts), Postgres fits your relational data better and is more requested in current job postings. Scheduled deliberately as a later-day task so you get real practice — see Day 20–22. |

## Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in RESEND_API_KEY + NOTIFY_EMAIL
npm run dev
```

Then open `http://localhost:3000`. You should see the terminal hero typing
itself out with your name and tagline, a live GitHub contribution heatmap,
and a LinkedIn badge.

## New: analytics + visit notifications

- **GitHub heatmap** (`components/GithubHeatmap.tsx`) — real, live data from
  `ghchart.rshah.org`, no setup needed. Works immediately.
- **LinkedIn** — no live stats (see the code comment for why); just an
  honest "Connect on LinkedIn" badge for now.
- **Visit notification email** — `components/VisitTracker.tsx` fires once
  per browser session, hitting `app/api/track-visit/route.ts`, which emails
  you the page, approximate location (from IP), and time via
  [Resend](https://resend.com) (free tier, no Gmail app-password hassle —
  Resend sends the email, your Gmail address is just the recipient).
  Without `RESEND_API_KEY` set, this silently does nothing — the site still
  builds and runs fine.
- The footer includes a short, honest note that visits are logged. This
  isn't required by the mechanism itself (no cookies, nothing shown to the
  visitor), but it's good practice and costs nothing.

## What's here already (Day 1)

- Project scaffold: Next.js + TypeScript + Tailwind, all configured.
- `lib/data.ts` — your real resume content (education, experience, projects,
  publications, awards, skills, links) as typed data. **Check the flagged
  note on the email address** — the PDF extraction had a stray space.
- `app/layout.tsx` — loads IBM Plex Mono/Sans, wires up the dark terminal
  theme via Tailwind.
- `app/page.tsx` — nav + working animated terminal hero, plus placeholder
  sections marking what gets built on which day.
- `app/globals.css` + `tailwind.config.ts` — the full design token system
  (colors, fonts) from the approved mockup.

## The 30-day plan

Each day, build one piece yourself in `app/page.tsx` or a new file under
`components/`, reading from the relevant export in `lib/data.ts`. Ask for
review/help when stuck rather than having it written for you.

- **Day 1** ✅ — Scaffold, tooling, real data wired in, terminal hero live.
- **Day 1** ✅ — GitHub contribution heatmap, LinkedIn badge, and a
  session-based visit-notification email pulled forward from the original
  plan (Day 16–18) since you asked for them now. See "New: analytics +
  visit notifications" above.
- **Day 2–3** — `components/About.tsx`. Render `site.tagline` + a real bio
  paragraph as the `cat about.md` terminal block.
- **Day 4–5** — `components/Skills.tsx`. Render `skills.highPriority`,
  `skills.differentiator`, `skills.currentStack` as tag groups.
- **Day 6–8** — `components/Projects.tsx`. Map over `projects`, one
  terminal-file-style card per project. Add real GitHub links.
- **Day 9–10** — `components/Experience.tsx`. The git-log-graph UI, mapping
  over `experience` + `education` as commits.
- **Day 11–13** — Set up MDX (`@next/mdx`), migrate `blogPosts` into real
  `.mdx` files under `content/blog/`, build `app/blog/[slug]/page.tsx`.
  Write your first real post.
- **Day 14** — `components/Research.tsx` from `publications`. Add real
  arXiv/GitHub links for your ACOPF paper.
- **Day 15** — `components/Links.tsx` from `links` + `competitiveProgramming`.
- **Day 16–18** — First backend route: `app/api/contact/route.ts` handling
  the contact form (start with an email service like Resend; no DB yet).
- **Day 19** — Responsive pass: test and fix every section down to mobile.
  Add `prefers-reduced-motion` handling to the typing effect.
- **Day 20–22** — Add Postgres (Neon/Supabase) + Prisma for one real
  feature: contact-message storage or blog view counts. Your first schema,
  migration, and query.
- **Day 23–24** — Accessibility + performance pass (keyboard focus, alt
  text, Lighthouse score).
- **Day 25–26** — GitHub Actions CI: lint + type-check + build on every
  push.
- **Day 27** — Deploy to Vercel, connect a real domain if you have one.
- **Day 28** — SEO basics: `metadata` per page, Open Graph image,
  `sitemap.xml`.
- **Day 29** — Write it up as its own entry in `projects` — document the
  build itself.
- **Day 30** — Final review, fix rough edges, ship.

## Content to double check before Day 2

- `site.email` in `lib/data.ts` — verify the exact address.
- Add real GitHub repo links to each `project.github` and `publication.github`.
- Add your arXiv link to `publications[0].arxiv`.
