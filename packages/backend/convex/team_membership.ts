import { v } from "convex/values";
import { mutation } from "@/convex/_generated//server";

export const addMember = mutation({
  args: {
    orgId: v.string(), // Organization ID is clerkId of the organization
    userId: v.string(), // User ID is clerkId of the user
    userRole: v.string(), // Role of the member in the organization
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.orgId))
      .first();

    if (!org) {
      console.error("[ORG_ADD_MEMBER_ERR] : Organization not found");
      return;
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_ADD_MEMBER_ERR] : User not found");
      return;
    }

    const existingMembership = await ctx.db
      .query("team_memberships")
      .withIndex("by_team_user", (q) =>
        q.eq("teamId", org._id).eq("userId", member._id)
      )
      .first();

    if (existingMembership) {
      console.error("[ORG_ADD_MEMBER_ERR] : Membership already exists");
      return;
    }

    await ctx.db.insert("team_memberships", {
      teamId: org._id,
      userId: member._id,
      isAdmin: args.userRole === "org:admin",
    });

    console.log("[ORG_ADD_MEMBER_OPS] : Added member to ORG", org._id);
  },
});

export const updateMemberRole = mutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
    userRole: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.orgId))
      .first();

    if (!org) {
      console.error("[ORG_UPDATE_MEMBER_ERR] : Organization not found");
      return;
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_UPDATE_MEMBER_ERR] : User not found");
      return;
    }

    const membership = await ctx.db
      .query("team_memberships")
      .withIndex("by_team_user", (q) =>
        q.eq("teamId", org._id).eq("userId", member._id)
      )
      .first();

    if (!membership) {
      console.error("[ORG_UPDATE_MEMBER_ERR] : Membership not found");
      return;
    }

    await ctx.db.patch(membership._id, {
      isAdmin: args.userRole === "org:admin",
    });

    console.log(
      "[ORG_UPDATE_MEMBER_OPS] : Updated member role in ORG",
      org._id
    );
  },
});

export const removeMember = mutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.orgId))
      .first();

    if (!org) {
      console.error("[ORG_REMOVE_MEMBER_ERR] : Organization not found");
      return;
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_REMOVE_MEMBER_ERR] : User not found");
      return;
    }

    const membership = await ctx.db
      .query("team_memberships")
      .withIndex("by_team_user", (q) =>
        q.eq("teamId", org._id).eq("userId", member._id)
      )
      .collect();

    await Promise.all(membership.map((mem) => ctx.db.delete(mem._id)));

    console.log(
      `[ORG_REMOVE_MEMBER_OPS] : Removed member ${member._id} from ORG", ${org._id}`
    );
  },
});
