import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
      .withIndex("by_clerk_and_email", (q) =>
        q.eq("clerkId", args.clerkId).eq("email", args.email)
      )
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

    console.log("[USER_DELETE_OPS] : Deleting user", existingUser._id);

    await ctx.db.delete(existingUser._id);
  },
});
