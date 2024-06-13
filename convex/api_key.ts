import { generateAPIKey } from "@/lib/utils";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot generate API key");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const existingKey = await ctx.db
      .query("api_keys")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (existingKey) {
      ctx.db.delete(existingKey._id);
    }

    return ctx.db.insert("api_keys", {
      userId: user._id,
      key: generateAPIKey(32),
    });
  },
});

export const revoke = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot create messages");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const key = await ctx.db
      .query("api_keys")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!key) {
      throw new Error("API key not found");
    }

    return ctx.db.delete(key._id);
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot create messages");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return ctx.db
      .query("api_keys")
      .withIndex("by_user", (q) => q.eq("userId", user?._id))
      .first();
  },
});
