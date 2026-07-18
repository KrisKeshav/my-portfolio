import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
      console.warn("contact api: RESEND_API_KEY or NOTIFY_EMAIL not configured");
      return NextResponse.json({ ok: false, error: "Credentials not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

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

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Time (IST): ${time}`,
        `IP: ${ip}`,
        `User agent: ${userAgent}`,
        `\nMessage:\n${message}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
