import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    orgId: v.string(),
    description: v.optional(v.string()),
    status: v.string(),
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
