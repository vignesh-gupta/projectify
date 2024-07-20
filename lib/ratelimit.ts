import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(
    Number(process.env.MAX_REQUESTS) ?? 5,
    "30 s"
  ),
});

export async function ApiRateLimit(request: NextRequest) {
  if (!request.url.includes("/api")) {
    return NextResponse.next();
  }

  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.json(
        {
          message: "Rate limit exceeded",
          error: "Too many requests",
        },
        {
          status: 429,
        }
      );
}
