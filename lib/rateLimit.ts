// Fixed-window rate limiter.
// Uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL/TOKEN are set, so limits hold across
// all serverless instances. Without them it falls back to an in-memory map, which only
// limits per warm instance — still stops a single tab hammering the endpoint.

type Result = { ok: boolean; retryAfter: number };

const memory = new Map<string, { count: number; resetAt: number }>();

function memoryHit(key: string, windowSec: number): { count: number; resetAt: number } {
  const now = Date.now();
  if (memory.size > 5_000) {
    memory.forEach((v, k) => {
      if (v.resetAt <= now) memory.delete(k);
    });
  }
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + windowSec * 1000 };
    memory.set(key, fresh);
    return fresh;
  }
  entry.count += 1;
  return entry;
}

async function upstashHit(key: string, windowSec: number): Promise<{ count: number; ttl: number }> {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSec), "NX"],
      ["TTL", key],
    ]),
    signal: AbortSignal.timeout(1500),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  const [incr, , ttl] = (await res.json()) as { result: number }[];
  return { count: incr.result, ttl: ttl.result > 0 ? ttl.result : windowSec };
}

export async function rateLimit(key: string, limit: number, windowSec: number): Promise<Result> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const { count, ttl } = await upstashHit(`rl:${key}`, windowSec);
      return { ok: count <= limit, retryAfter: ttl };
    } catch (err) {
      // redis hiccup shouldn't take the chat down, drop to the local limiter
      console.error("rate limit store error:", err);
    }
  }
  const { count, resetAt } = memoryHit(key, windowSec);
  return { ok: count <= limit, retryAfter: Math.max(1, Math.ceil((resetAt - Date.now()) / 1000)) };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
