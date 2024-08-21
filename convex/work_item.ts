import { v } from "convex/values";
import { mutation, query } from "@/convex/_generated//server";
import { TaskPriority, TaskStatus, TaskType } from "./types";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    assignee: v.string(),
    assigneeId: v.id("users"),
    label: TaskType,
    priority: TaskPriority,
    status: TaskStatus,
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("workItems", args);
  },
});

export const update = mutation({
  args: {
    _id: v.id("workItems"),
    title: v.string(),
    description: v.optional(v.string()),
    assignee: v.string(),
    assigneeId: v.id("users"),
    label: TaskType,
    priority: TaskPriority,
    status: TaskStatus,
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args._id, args);

    return args._id;
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

export const list = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.projectId) throw new Error("projectId is required");

    const workItems = await ctx.db
      .query("workItems")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    return workItems;
  },
});
