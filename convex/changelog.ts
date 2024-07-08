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
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return await ctx.db.insert("changeLogs", { ...args, isPublished: false });
  },
});
