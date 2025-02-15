import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    Number(process.env.MAX_REQUESTS) ?? 5,
    "30 s"
  ),
});

export async function ApiRateLimit(request: NextRequest) {
  if (!request.url.includes("/api")) {
    return NextResponse.next();
  }

  // const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit("ip");

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
