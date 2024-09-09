var { ConvexClient } = require("convex/browser");

export const convexClient = new ConvexClient(
  process.env.CONVEX_URL!
);
