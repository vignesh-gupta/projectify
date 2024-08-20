import { UNASSIGNED_USER } from "@/lib/constants";
import { v } from "convex/values";
import { mutation, query } from "@/convex/_generated//server";

export const create = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", args);

    console.log("[USER_CREATE_OPS] : Created user", userId);
  },
});

export const update = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingUser) {
      console.error("[USER_UPDATE_ERR] : User not found");
      throw new Error("User not found");
    }

    console.log("[USER_UPDATE_OPS] : Updating user", existingUser._id);

    await ctx.db.patch(existingUser._id, { ...args });
  },
});

export const remove = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingUser) {
      console.error("[USER_DELETE_ERR] : User not found");
      throw new Error("User not found");
    }

    // Remove all memberships and work items associated with the user
    const userMemberships = await ctx.db
      .query("team_memberships")
      .withIndex("by_user", (q) => q.eq("userId", existingUser._id))
      .collect();

    const userWorkItems = await ctx.db
      .query("workItems")
      .filter((q) => q.eq(q.field("assigneeId"), existingUser._id))
      .collect();

    await Promise.all([
      ...userMemberships.map((membership) => ctx.db.delete(membership._id)),
      ...userWorkItems.map((workItem) =>
        ctx.db.patch(workItem._id, {
          assignee: UNASSIGNED_USER.label,
          assigneeId: UNASSIGNED_USER.value,
        })
      ),
    ]);

    console.log("[USER_DELETE_OPS] : Deleting user", existingUser._id);

    await ctx.db.delete(existingUser._id);
  },
});

export const get = query({
  args: {
    id: v.optional(v.id("users")),
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { clerkId, id } = args;

    if (id) return await ctx.db.get(id);

    if (clerkId)
      return await ctx.db
        .query("users")
        .withIndex("by_clerk", (q) => q.eq("clerkId", args.clerkId || ""))
        .first();

    return null;
  },
});

export const list = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      console.error("[USER_GET_ERR] : User is not authenticated");
      return;
    }

    const team = await ctx.db
      .query("teams")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.teamId))
      .first();

    if (!team) {
      console.error("[USERS_GET_ERR] : Team not found");
      return;
    }

    const userIdList = await ctx.db
      .query("team_memberships")
      .withIndex("by_team", (q) => q.eq("teamId", team?._id))
      .collect();

    return await Promise.all(
      userIdList.map((userId) => ctx.db.get(userId.userId))
    );
  },
});
