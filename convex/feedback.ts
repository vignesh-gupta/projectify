import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { FeedbackStatus, FeedbackType } from "./types";

export const list = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return await ctx.db
      .query("feedbacks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId)).order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    content: v.string(),
    projectId: v.id("projects"),
    senderName: v.string(),
    senderEmail: v.string(),
    status: FeedbackStatus,
    type: FeedbackType,
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return await ctx.db.insert("feedbacks", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("feedbacks"),
    status: v.optional(FeedbackStatus),
    type: v.optional(FeedbackType),
    content: v.optional(v.string()),
    senderName: v.optional(v.string()),
    senderEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args);
  },
});

export const remove = mutation({
  args: {
    id: v.id("feedbacks"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
