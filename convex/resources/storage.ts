import { v } from "convex/values";
import { action, mutation } from "../_generated/server";
import { api } from "../_generated/api";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const saveFavicon = action({
  args: {
    id: v.id("links"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const icon = await fetch(
      `https://icons.duckduckgo.com/ip3/${new URL(args.url).hostname}.ico`
    ).then((res) => res.blob());

    console.log({ icon });

    const storageRes = await ctx.storage.store(icon);

    await ctx.runMutation(api.resources.link.update, {
      _id: args.id,
      icon: storageRes,
    });
  },
});
