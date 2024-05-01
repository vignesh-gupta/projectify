import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    assignee: v.string(),
    assigneeId: v.id("users"),
    label: v.union(
      v.literal("documentation"),
      v.literal("bug"),
      v.literal("feature")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    status: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in progress"),
      v.literal("done"),
      v.literal("canceled")
    ),
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

export const update = mutation({
  args: {
    _id: v.id("workItems"),
    title: v.string(),
    description: v.optional(v.string()),
    assignee: v.string(),
    assigneeId: v.id("users"),
    label: v.union(
      v.literal("documentation"),
      v.literal("bug"),
      v.literal("feature")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    status: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in progress"),
      v.literal("done"),
      v.literal("canceled")
    ),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const workItem = await ctx.db.patch(args._id, args);

    return;
  },
});

export const remove = mutation({
  args: {
    _id: v.id("workItems"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args._id);

    return;
  },
});
