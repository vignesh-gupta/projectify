import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    projectId: v.id("projects"),
    showPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    const changeLogs = await ctx.db
      .query("changeLogs")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();

    if (args.showPublished) {
      return changeLogs.filter((changeLog) => changeLog.isPublished);
    }

    return changeLogs;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    version: v.string(),
    changes: v.string(),
    date: v.string(),
    projectId: v.id("projects"),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return await ctx.db.insert("changeLogs", args);
  },
});

export const update = mutation({
  args: {
    _id: v.id("changeLogs"),
    title: v.optional(v.string()),
    version: v.optional(v.string()),
    changes: v.optional(v.string()),
    date: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => await ctx.db.patch(args._id, args),
});

export const remove = mutation({
  args: {
    _id: v.id("changeLogs"),
  },
  handler: async (ctx, args) => await ctx.db.delete(args._id),
});
