import { ConvexClient } from "convex/browser";

export const convexClient = new ConvexClient(
  process.env.CONVEX_URL!
);
