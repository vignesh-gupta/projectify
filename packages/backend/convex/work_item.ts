import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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
  handler: async (ctx, args) => await ctx.db.delete(args._id),
});

export const list = query({
  args: {
    projectId: v.id("projects"),
    assigneeId: v.optional(v.id("users")),
    ignoreCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (!args.projectId) throw new Error("projectId is required");

    let workItems = ctx.db
      .query("workItems")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId));

    if (args.assigneeId)
      workItems = workItems.filter((q) =>
        q.eq(q.field("assigneeId"), args.assigneeId)
      );

    if (args.ignoreCompleted)
      workItems = workItems.filter((q) => q.and(q.neq(q.field("status"), "canceled"), q.neq(q.field("status"), "done")));

    console.log("[WORK_ITEM_LIST_OPS] : Listing work items", args);

    return workItems.collect();
  },
});
