import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ProjectStatus } from "./types";
import { fetchMutation } from "convex/nextjs";
import { api } from "./_generated/api";

export const create = mutation({
  args: {
    title: v.string(),
    orgId: v.string(),
    description: v.optional(v.string()),
    status: ProjectStatus,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      orgId: args.orgId,
      creatorId: identity.subject,
      creatorName: identity.name!,
      description: args.description,
      status: args.status,
      team: [identity.subject],
    });

    return projectId;
  },
});

export const get = query({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  },
});

export const remove = mutation({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project not found");
    }

    const workItems = await ctx.db
      .query("workItems")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();

    await Promise.all(workItems.map((wi) => ctx.db.delete(wi._id)));

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(ProjectStatus),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const project = await ctx.db.get(args.id);
    if (!project) throw new Error("Project not found");

    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      status: args.status,
    });
  },
});
