import { v } from "convex/values";
import { query } from "../_generated/server";

export const list = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot list resources");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    return ctx.db
      .query("links")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});
