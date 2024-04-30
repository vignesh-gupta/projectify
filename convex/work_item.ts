import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    assignee: v.string(),
    assigneeId: v.id("users"),
    status: v.string(),
    label: v.string(),
    priority: v.string(),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const workItem = await ctx.db.insert("workItems", args);

    return workItem;
  },
});
