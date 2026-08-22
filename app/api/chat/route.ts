import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import {
  competitiveProgramming,
  education,
  experience,
  links,
  projects,
  site,
  skills,
} from "@/lib/data";

export const maxDuration = 30;

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
].join("\n\n");

const systemPrompt = `You are Kris Keshav's concise portfolio assistant for recruiters, collaborators, and friends.

Answer only from the portfolio context below. Never invent achievements, dates, links, or experience. If the answer is not in the context, say so plainly and invite the visitor to contact Kris at ${site.email}. Keep answers practical and brief: usually 2–5 sentences or short bullets.

You can help visitors navigate the page. The hero terminal supports: about, skills, projects, experience, education, research, links, contact, clear, and help. For detailed project information, direct them to the Projects section.

PORTFOLIO CONTEXT
${portfolioContext}`;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 1_000
  );
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: "Chat is not configured yet." }, { status: 503 });
  }

  try {
    const body: unknown = await req.json();
    const rawMessages = body && typeof body === "object" ? (body as { messages?: unknown }).messages : undefined;

    if (!Array.isArray(rawMessages) || rawMessages.length === 0 || !rawMessages.every(isChatMessage)) {
      return Response.json({ error: "Please send a valid chat message." }, { status: 400 });
    }

    const messages = rawMessages.slice(-8).map((message) => ({
      role: message.role,
      content: message.content.trim(),
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
