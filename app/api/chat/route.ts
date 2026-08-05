import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { site, education, experience, projects, skills, competitiveProgramming } from '@/lib/data';

export const maxDuration = 30;

const systemPrompt = `You are an AI assistant integrated into Kris Keshav's personal portfolio website. 
Your goal is to answer questions about Kris Keshav's background, projects, skills, and experience accurately and concisely.
You should also help visitors navigate the "Terminal Hero" section of the website if they ask how to use it. The terminal accepts commands like: about, skills, projects, experience, education, blog, research, links, contact, clear, and help.

Here is the data you should base your answers on:

# Profile
Name: ${site.name}
Bio: ${site.bio}
Tagline: ${site.tagline}

# Education
${JSON.stringify(education)}

# Experience
${JSON.stringify(experience)}

# Projects
${JSON.stringify(projects)}

# Skills
${JSON.stringify(skills)}

# Competitive Programming
${JSON.stringify(competitiveProgramming)}

# Instructions
1. Be helpful, professional, and concise. Don't write essays.
2. If asked something not in the data above, say you don't know, but encourage them to contact Kris directly at ${site.email}.
3. If they ask about the terminal on the page, tell them to type commands like "projects" or "experience" into the terminal prompt.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
