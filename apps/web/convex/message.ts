import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    content: v.string(),
    senderClerkId: v.string(),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot create messages");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const sender = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkId", args.senderClerkId))
      .first();

    if (!sender) {
      throw new Error("Sender not found");
    }

    return ctx.db.insert("messages", {
      content: args.content,
      projectId: args.projectId,
      senderId: sender._id,
      senderName: sender.firstName,
      senderImageUrl: sender.imageUrl,
    });
  },
});

export const remove = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity)
      throw new Error("Unauthenticated user cannot delete messages");

    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error("Message not found");

    return ctx.db.delete(message._id);
  },
});

export const list = query({
  args: {
    projectId: v.id("projects"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("messages")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
