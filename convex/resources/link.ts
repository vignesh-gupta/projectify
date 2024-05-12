import { v } from "convex/values";
import { action, mutation } from "../_generated/server";

export const createLinkAction = action({
  args: {
    title: v.string(),
    url: v.string(),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const icon = await fetch(`/api/favicon?url=https://vigneshgupta.tech/`, {
      method: "POST",
      headers: {
        AllowOrigin: "*",
      },
    })
      .then((res) => res.blob())
      .catch(console.error);

    // const url = await ctx.storage.generateUploadUrl();
    // await ctx.storage.store()
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    url: v.string(),
    projectId: v.id("projects"),
    icon: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot create resources");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return ctx.db.insert("links", args);
  },
});
