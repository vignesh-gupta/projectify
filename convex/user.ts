import { v } from "convex/values";
import { httpAction, internalMutation, mutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const create = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log({ identity });

    const projectId = await ctx.db.insert("users", {
      ...args,
    });

    return projectId;
  },
});
