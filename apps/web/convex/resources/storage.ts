import { api } from "@/convex/_generated//api";
import { action, mutation } from "@/convex/_generated//server";
import { v } from "convex/values";

export const generateUploadUrl = mutation((ctx) => {
  return ctx.storage.generateUploadUrl();
});

export const saveFavicon = action({
  args: {
    id: v.id("links"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const iconReq = await fetch(
      `https://icons.duckduckgo.com/ip3/${new URL(args.url).hostname}.ico`
    );

    console.log({ iconReq });

    if (!iconReq.ok) return;

    const icon = await iconReq.blob();

    console.log({ icon });

    const storageRes = await ctx.storage.store(icon);

    console.log({ storageRes });

    await ctx.runMutation(api.resources.link.update, {
      _id: args.id,
      icon: storageRes,
    });

    console.log("done");
  },
});
