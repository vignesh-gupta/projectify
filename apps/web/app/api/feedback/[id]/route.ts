import { api } from "@repo/backend/convex/_generated/api";
import { ProjectId } from "@/lib/types";
import { fetchQuery } from "convex/nextjs";

export async function GET(_: Request, context: { params: Promise<ProjectId> }) {
  const id = (await context.params).id;
  try {
    const feedbacks = await fetchQuery(api.feedback.list, {
      projectId: id,
    });

    return Response.json({
      message: "Successfully fetched feedbacks",
      data: feedbacks,
    });
  } catch (e: any) {
    return Response.json(
      {
        message: "Failed to get feedbacks",
        error: "Invalid Project ID",
      },
      {
        status: 500,
      }
    );
  }
}
