import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// POST /api/track-visit
// Called once per visitor session by <VisitTracker /> (see components/).
// Sends you an email with the page, time, and a rough location derived
// from IP — nothing is shown to the visitor, no cookie banner is required
// for this since no tracking cookie or personal profile is stored, just a
// one-off notification. Still, add a short privacy note in your footer —
// good practice regardless of the exact mechanism.

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
      console.warn("track-visit: RESEND_API_KEY or NOTIFY_EMAIL not set, skipping email");
      return NextResponse.json({ ok: true, skipped: true });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";

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

    let location = "unknown";
    if (ip !== "unknown") {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          location = [geo.city, geo.region, geo.country_name].filter(Boolean).join(", ") || "unknown";
        }
      } catch {
        // geo lookup is best-effort — never block the notification on it
      }
    }

    await resend.emails.send({
      from: "Portfolio Visits <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      subject: `New portfolio visit — ${path}`,
      text: [
        `Page: ${path}`,
        `Time (IST): ${time}`,
        `Approx. location: ${location}`,
        `IP: ${ip}`,
        `User agent: ${userAgent}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-visit error:", err);
    // Never surface this failure to the visitor
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
