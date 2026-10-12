import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import {
  awards,
  competitiveProgramming,
  education,
  experience,
  links,
  projects,
  publications,
  site,
  skills,
} from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const maxDuration = 30;

const CHAT_LIMITS = {
  perMinute: 6,
  perDay: 40,
  globalPerDay: Number(process.env.CHAT_GLOBAL_DAILY_LIMIT) || 800,
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const portfolioContext = [
  `Profile: ${site.name}. ${site.bio} Based in ${site.location}.`,
  `Contact: ${site.email}. GitHub: ${links.github}. LinkedIn: ${links.linkedin}.`,
  `Education: ${education.map((item) => `${item.institution} (${item.detail}, ${item.dates})`).join("; ")}`,
  `Experience: ${experience.map((item) => `${item.role} at ${item.org} (${item.dates}): ${item.bullets.join(" ")}`).join("; ")}`,
  `Projects: ${projects.map((project) => `${project.name} [${project.category}, ${project.dates ?? "dates unavailable"}]: ${project.description} Technologies: ${project.tags.join(", ")}.`).join("\n")}`,
  `Skills: Current stack: ${skills.currentStack.join(", ")}. Tools: ${skills.tools.join(", ")}. Focus: ${skills.highPriority.join(", ")}.`,
  `Competitive programming: ${competitiveProgramming.platform}, handle ${competitiveProgramming.handle}, ${competitiveProgramming.rank}, max rating ${competitiveProgramming.maxRating}, ${competitiveProgramming.problemsSolved} problems solved.`,
  `Research & Publications: ${publications.map((p) => `"${p.title}" (${p.venue}): ${p.description} ${p.bullets.join(" ")}${p.ieeeUrl ? ` IEEE Xplore: ${p.ieeeUrl}` : ""}${p.arxiv ? ` arXiv: ${p.arxiv}` : ""}${p.github ? ` GitHub: ${p.github}` : ""}`).join("; ")}`,
  `Awards: ${awards.join("; ")}`,
].join("\n\n");

const systemPrompt = `You are Kris Keshav's concise portfolio assistant for recruiters, collaborators, and friends.

Answer only from the portfolio context below. Never invent achievements, dates, links, or experience. If the answer is not in the context, say so plainly and invite the visitor to contact Kris at ${site.email}. Keep answers practical and brief: usually 2–5 sentences or short bullets. Reply in plain text only — no Markdown (no **bold**, headings, or tables), because the chat window shows raw text.

You can help visitors navigate the page. The hero terminal supports: whoami, about, skills, experience, research, projects, achievements, education, positions, links, contact, clear, and help. Pressing Ctrl+K (⌘K on Mac) opens a command palette. For detailed project information, direct them to the Projects section.

PORTFOLIO CONTEXT
${portfolioContext}`;

// user input is capped hard; assistant replies come back from the client so we just trim them
function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Record<string, unknown>;
  if (typeof message.content !== "string" || message.content.trim().length === 0) return false;
  if (message.role === "user") return message.content.length <= 1_000;
  return message.role === "assistant";
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: "Chat is not configured yet." }, { status: 503 });
  }

  const ip = clientIp(req);
  const day = new Date().toISOString().slice(0, 10);
  // checked in order and short-circuited, so a blocked burst doesn't eat into the daily budget
  const limits: [string, number, number, string][] = [
    [`chat:min:${ip}`, CHAT_LIMITS.perMinute, 60, "You're sending messages too quickly. Give it a minute and try again."],
    [`chat:day:${ip}:${day}`, CHAT_LIMITS.perDay, 86_400, "You've reached today's chat limit. Feel free to email Kris directly instead."],
    [`chat:global:${day}`, CHAT_LIMITS.globalPerDay, 86_400, "The assistant is resting for today. Please email Kris directly instead."],
  ];
  for (const [key, limit, windowSec, message] of limits) {
    const { ok, retryAfter } = await rateLimit(key, limit, windowSec);
    if (!ok) {
      return Response.json(
        { error: message },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
  }

  try {
    const body: unknown = await req.json();
    const rawMessages = body && typeof body === "object" ? (body as { messages?: unknown }).messages : undefined;

    const recent = Array.isArray(rawMessages) ? rawMessages.slice(-8) : [];
    if (recent.length === 0 || !recent.every(isChatMessage) || recent[recent.length - 1].role !== "user") {
      return Response.json({ error: "Please send a valid chat message." }, { status: 400 });
    }

    const messages = recent.map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2_000),
    }));

    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      system: systemPrompt,
      messages,
      temperature: 0.2,
      maxOutputTokens: 350,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("portfolio chat error:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }
}
