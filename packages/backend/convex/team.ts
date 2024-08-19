import { v } from "convex/values";
import { mutation } from "@/convex/_generated//server";

export const create = mutation({
  args: {
    name: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const existingOrg = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingOrg) {
      console.error("[ORG_CREATE_ERR] : Organization already exists");
      throw new Error("Organization already exists");
    }

    const createdBy = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.createdBy))
      .first();

    if (!createdBy) {
      console.error("[ORG_CREATE_ERR] : User not found");
      throw new Error("User not found");
    }

    const orgId = await ctx.db.insert("teams", {
      ...args,
      createdBy: createdBy._id,
    });

    await ctx.db.insert("team_memberships", {
      teamId: orgId,
      userId: createdBy._id,
      isAdmin: true,
    });

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
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingOrg) {
      console.error("[ORG_UPDATE_ERR] : Organization not found");
      throw new Error("Organization not found");
    }

    console.log("[ORG_UPDATE_OPS] : Updating ORG", existingOrg._id);

    await ctx.db.patch(existingOrg._id, args);
  },
});

export const remove = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!org) {
      console.error("[ORG_REMOVE_ERR] : Organization not found");
      throw new Error("Organization not found");
    }

    await ctx.db.delete(org._id);

    const team_memberships = await ctx.db
      .query("team_memberships")
      .withIndex("by_team", (q) => q.eq("teamId", org._id))
      .collect();

    const team_projects = await ctx.db
      .query("projects")
      .withIndex("by_org", (q) => q.eq("orgId", args.clerkId))
      .collect();

    await Promise.all([
      ...team_memberships.map((doc) => ctx.db.delete(doc._id)),
      ...team_projects.map((doc) => ctx.db.delete(doc._id)),
    ]);

    console.log("[ORG_REMOVE_OPS] : Removed ORG", org._id);
  },
});
