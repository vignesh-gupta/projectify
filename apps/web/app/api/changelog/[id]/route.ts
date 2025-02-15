import { api } from "@repo/backend/convex/_generated/api";
import { ProjectId } from "@/lib/types";
import { fetchQuery } from "convex/nextjs";

export async function GET(_: Request, context: { params: Promise<ProjectId> }) {
const id = (await context.params).id;

  try {
    const changelogs = await fetchQuery(api.changelog.list, {
      projectId: id,
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
