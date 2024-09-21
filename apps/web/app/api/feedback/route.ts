import { api } from "@repo/backend/convex/_generated/api";
import { Id } from "@repo/backend/convex/_generated/dataModel";
import { feedbackFormSchema } from "@/lib/form-schemas";
import { fetchMutation } from "convex/nextjs";

export async function POST(request: Request) {
  const body = await request.json();

  const feedback = feedbackFormSchema.safeParse(body);
  if (!feedback.success) {
    return Response.json(
      {
        message: "Invalid feedback",
        errors: feedback.error.issues.map((issue) => {
          return {
            path: issue.path.join("."),
            message: issue.message,
          };
        }),
      },
      {
        status: 400,
      }
    );
  }

  try {
    const res = await fetchMutation(api.feedback.create, {
      ...feedback.data,
      senderName: feedback.data.senderName ?? feedback.data.senderEmail,
      projectId: feedback.data.projectId as Id<"projects">,
    });

    return Response.json(
      {
        message: "Feedback received",
        body: res,
      },
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return Response.json(
      {
        message: "Failed to create feedback",
        error: "Malformed JSON or Invalid Project ID",
      },
      {
        status: 500,
      }
    );
  }
}
