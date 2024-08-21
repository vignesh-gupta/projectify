import { v } from "convex/values";
import { mutation, query } from "@/convex/_generated//server";

export const create = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
    projectId: v.id("projects"),
    type: v.string(),
  },
  handler: async (ctx, { title, storageId, projectId, type }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const project = await ctx.db.get(projectId);

    if (!project) {
      ctx.storage.delete(storageId);
      throw new Error("Project not found");
    }

    return await ctx.db.insert("files", {
      title,
      storageId,
      projectId,
      type,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("files"),
    title: v.string(),
  },
  handler: async (ctx, { id, title }) => {
    const file = await ctx.db.get(id);

    if (!file) {
      throw new Error("File not found");
    }

    return await ctx.db.patch(id, { title });
  },
});

export const remove = mutation({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, { _id }) => {
    const file = await ctx.db.get(_id);

    if (!file) {
      throw new Error("File not found");
    }

    ctx.storage.delete(file.storageId);

    return await ctx.db.delete(_id);
  },
});

export const list = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const resources = await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    return resources;
  },
});
