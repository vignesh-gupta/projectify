import { httpRouter } from "convex/server";
import { httpAction } from "@/convex/_generated//server";

const http = httpRouter();

http.route({
  path: "/getFile",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get("storageId")!;
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("File not found", {
        status: 404,
      });
    }
    return new Response(blob);
  }),
});

export default http;
