import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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
      .withIndex("by_team", (q) => q.eq("teamId", team?._id as Id<"teams">))
      .collect();

    return await Promise.all(
      userIdList.map((userId) => ctx.db.get(userId.userId))
    );
  },
});
