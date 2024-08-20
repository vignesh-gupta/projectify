import { api } from "@/convex/_generated/api";
import { ProjectId } from "@/lib/types";
import { fetchQuery } from "convex/nextjs";

export async function GET(_: Request, context: { params: ProjectId }) {
  try {
    const changelogs = await fetchQuery(api.changelog.list, {
      projectId: context.params.id,
      showPublished: true,
    });

    return Response.json({
      message: "Successfully fetched changelogs",
      data: changelogs,
    });
  } catch (e: any) {
    return Response.json(
      {
        message: "Failed to get changelogs",
        error: "Invalid Project ID",
      },
      {
        status: 500,
      }
    );
  }
}
