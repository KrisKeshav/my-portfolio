import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { UAParser } from "ua-parser-js";

function isLocalOrPrivateIp(ip: string): boolean {
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "localhost" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.") ||
    ip.startsWith("fc00:") ||
    ip.startsWith("fe80:")
  ) {
    return true;
  }
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    if (parts.length >= 2) {
      const second = parseInt(parts[1], 10);
      if (second >= 16 && second <= 31) return true;
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
      console.warn("track-visit: RESEND_API_KEY or NOTIFY_EMAIL not set, skipping email");
      return NextResponse.json({ ok: true, skipped: true });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";

    const rawIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ip = rawIp.replace(/^::ffff:/, "").replace(/:\d+$/, "").trim();
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const refererHeader = req.headers.get("referer") || req.headers.get("referrer");

    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    let location = "unknown";
    if (ip !== "unknown" && ip) {
      if (isLocalOrPrivateIp(ip)) {
        location = "local/dev";
      } else {
        try {
          const token = process.env.IPINFO_TOKEN;
          const url = token
            ? `https://ipinfo.io/${ip}/json?token=${token}`
            : `https://ipinfo.io/${ip}/json`;
          const geoRes = await fetch(url, {
            headers: {
              Accept: "application/json",
              "User-Agent": "portfolio-tracker",
            },
            signal: AbortSignal.timeout(3000),
          });
          if (geoRes.ok) {
            const geo = await geoRes.json();
            location =
              [geo.city, geo.region, geo.country].filter(Boolean).join(", ") ||
              "unknown";
          }
        } catch {
          // best-effort geo lookup
        }
      }
    }

    let clientInfo = "unknown";
    try {
      const parser = new UAParser(userAgent);
      const browserName = parser.getBrowser().name;
      const osName = parser.getOS().name;
      if (browserName && osName) {
        clientInfo = `${browserName} on ${osName}`;
      } else if (browserName) {
        clientInfo = browserName;
      } else if (osName) {
        clientInfo = osName;
      }
    } catch {
      clientInfo = "unknown";
    }

    let referrer = "Direct visit";
    if (refererHeader) {
      try {
        const parsed = new URL(refererHeader);
        const host = parsed.hostname.replace(/^www\./, "");
        referrer = host ? `Came from: ${host}` : "Direct visit";
      } catch {
        referrer = "Direct visit";
      }
    }

    await resend.emails.send({
      from: "Portfolio Visits <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      subject: `New portfolio visit — ${path}`,
      text: [
        `Page: ${path}`,
        `Approx. location: ${location}`,
        `Browser/OS: ${clientInfo}`,
        `Referrer: ${referrer}`,
        `Time (IST): ${time}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-visit error:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
