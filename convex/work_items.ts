import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const list = query({
  args: {
    projectId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.projectId) throw new Error("projectId is required");

    const workItems = await ctx.db
      .query("workItems")
      .withIndex("by_project", (q) =>
        q.eq("projectId", args.projectId as Id<"projects">)
      )
      .collect();

    return workItems;
  },
});
