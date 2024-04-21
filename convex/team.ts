import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    members: v.array(v.string()),
    clerkId: v.string(),
    imageUrl: v.string(),
    admins: v.array(v.string()),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const filteredMembers = args.members.filter(async (member) => {
      const memberUser = await ctx.db
        .query("users")
        .withIndex("by_clerk", (q) => q.eq("clerkId", member))
        .first();

      return memberUser ? true : false;
    });

    if (filteredMembers.length !== args.members.length) {
      console.error("[ORG_CREATE_ERR] : Invalid members");
      throw new Error("Invalid members");
    }

    const orgId = await ctx.db.insert("teams", args);

    console.log("[ORG_CREATE_OPS] : Created ORG", orgId);
  },
});

export const update = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  },

  handler: async (ctx, args) => {
    const existingOrg = await ctx.db
      .query("teams")
      .withIndex("by_org", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingOrg) {
      console.error("[ORG_UPDATE_ERR] : Organization not found");
      throw new Error("Organization not found");
    }

    console.log("[ORG_UPDATE_OPS] : Updating ORG", existingOrg._id);

    await ctx.db.patch(existingOrg._id, args);
  },
});
