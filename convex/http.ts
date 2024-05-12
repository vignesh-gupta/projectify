import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/uploadIcon",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const url = new URL(req.url).search.replace("?url=", "");

    console.log("req", url);
    const icon = await fetch(
      `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          AllowOrigin: "*",
        },
      }
    ).catch(console.error);

    if (!icon) {
      return new Response("No Icon found", {
        status: 500,
        headers: new Headers({
          "Allow-Origin": "*",
          "Access-Control-Allow-Origin": "*",
          Vary: "origin",
        }),
      });
    }

    const blob = await icon.blob();

    const storageId = await ctx.storage.store(blob);

    return new Response(
      JSON.stringify({ favicon: storageId || "No Icon" }),
      {
        status: storageId ? 200 : 500,
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          Vary: "origin",
        }),
      }
    );
  }),
});

export default http;
