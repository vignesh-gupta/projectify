import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.orgId) return { error: "Please select an organization" };

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId || ""))
      .collect();

    return { success: true, data: projects };
  },
});
