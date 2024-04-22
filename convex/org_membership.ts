import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
      throw new Error("Organization not found");
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_ADD_MEMBER_ERR] : User not found");
      throw new Error("User not found");
    }

    let filteredMembers = Array.from(new Set([...org.members, member._id]));

    if (args.userRole === "admin") {
      let filteredAdmins = Array.from(new Set([...org.admins, member._id]));
      await ctx.db.patch(org._id, {
        admins: filteredAdmins,
        members: filteredMembers,
      });
    } else {
      await ctx.db.patch(org._id, {
        members: filteredMembers,
      });
    }

    const currentOrgs = member.orgIds || [];

    await ctx.db.patch(member._id, {
      orgIds: Array.from(new Set([...currentOrgs, org._id])),
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
      throw new Error("Organization not found");
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_UPDATE_MEMBER_ERR] : User not found");
      throw new Error("User not found");
    }

    let filteredMembers = Array.from(new Set([...org.members, member._id]));

    console.log(filteredMembers);

    if (args.userRole === "org:admin") {
      let filteredAdmins = Array.from(new Set([...org.admins, member._id]));

      await ctx.db.patch(org._id, {
        admins: filteredAdmins,
        members: filteredMembers,
      });
    } else {
      await ctx.db.patch(org._id, {
        members: filteredMembers,
        admins: org.admins.filter((a) => a !== member._id),
      });
    }

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
      throw new Error("Organization not found");
    }

    const member = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!member) {
      console.error("[ORG_REMOVE_MEMBER_ERR] : User not found");
      throw new Error("User not found");
    }

    let filteredMembers = org.members.filter((m) => m !== member._id);
    let filteredAdmins = org.admins.filter((a) => a !== member._id);

    await ctx.db.patch(org._id, {
      admins: filteredAdmins,
      members: filteredMembers,
    });

    const currentOrgs = member.orgIds || [];

    await ctx.db.patch(member._id, {
      orgIds: currentOrgs.filter((o) => o !== org._id),
    });

    console.log("[ORG_REMOVE_MEMBER_OPS] : Removed member from ORG", org._id);
  },
});
