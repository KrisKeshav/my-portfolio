# Kris Keshav — Portfolio

Terminal-themed developer portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

**Live:** https://my-portfolio-web-tau-black.vercel.app

## Features

- Interactive hero terminal and a `Ctrl/⌘ + K` command palette (CLI + search modes)
- AI portfolio assistant grounded in the site's own data (Groq, `openai/gpt-oss-20b`), with per-IP and global rate limits
- Project explorer with architecture and code tabs, research paper and certificate viewers
- Live GitHub contribution heatmap, light/dark themes
- Contact form and session-level visit notifications via Resend

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in the keys you need
npm run dev
```

Every integration is optional — without its key, that feature switches off and the site still builds.

| Variable | Used for |
|---|---|
| `GROQ_API_KEY` | AI chat assistant |
| `RESEND_API_KEY`, `NOTIFY_EMAIL` | Contact form and visit emails |
| `IPINFO_TOKEN` | Approximate visitor location |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Chat rate limits shared across serverless instances |
| `CHAT_GLOBAL_DAILY_LIMIT` | Daily cap on chat requests across all visitors (default 800) |

## Project layout

```
app/          routes, metadata, OG image, API routes (chat, contact, track-visit)
components/   page sections and UI
lib/data.ts   all portfolio content — edit this to update the site
public/       resume, paper and certificate PDFs, profile photo
default.tex   LaTeX source for the resume PDF
```

## Scripts

- `npm run dev` — dev server
- `npm run check` — type check
- `npm run validate` — type check + lint
- `npm run build` — production build
