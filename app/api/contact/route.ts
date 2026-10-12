import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const LIMITS = { name: 100, email: 200, message: 5_000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
      console.warn("contact api: RESEND_API_KEY or NOTIFY_EMAIL not configured");
      return NextResponse.json({ ok: false, error: "Credentials not configured" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const name = field(body?.name, LIMITS.name);
    const email = field(body?.email, LIMITS.email);
    const message = field(body?.message, LIMITS.message);

    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid or missing fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // newlines in a subject line can mess with mail headers
    const safeName = name.replace(/[\r\n]+/g, " ");

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      reply_to: email,
      subject: `New portfolio message from ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${email}`,
        `Time (IST): ${time}`,
        `IP: ${ip}`,
        `User agent: ${userAgent}`,
        `\nMessage:\n${message}`,
      ].join("\n"),
    });

    if (error) {
      console.error("contact api resend error:", error);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
