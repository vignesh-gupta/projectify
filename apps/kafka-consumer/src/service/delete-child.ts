var { api } = require("@repo/backend/convex/_generated/api");
var { convexClient } = require("../utils");
import { Id } from "@repo/backend/convex/_generated/dataModel";

export const postDeleteProject = async (projectId: Id<"projects">) => {
  await Promise.all([
    deleteAllWorkItems(projectId),
    deleteAllResources(projectId),
    deleteAllFeedback(projectId),
    deleteAllChangelogs(projectId),
    deleteAllMessages(projectId),
  ]);
};

export async function deleteAllWorkItems(projectId: Id<"projects">) {
  const workItems = await convexClient.query(api.work_item.list, {
    projectId: projectId,
  });

  if (workItems.length === 0) return;

  await Promise.all(
    workItems.map((items) =>
      convexClient.mutation(api.work_item.remove, { _id: items._id })
    )
  );
}

export async function deleteAllResources(projectId: Id<"projects">) {
  const files = await convexClient.query(api.resources.file.list, {
    projectId,
  });

  const links = await convexClient.query(api.resources.link.list, {
    projectId,
  });

  if (files.length === 0 && links.length === 0) return;

  await Promise.all([
    ...files.map((file) =>
      convexClient.mutation(api.resources.file.remove, { _id: file._id })
    ),
    ...links.map((link) =>
      convexClient.mutation(api.resources.link.remove, { _id: link._id })
    ),
  ]);
}

export async function deleteAllFeedback(projectId: Id<"projects">) {
  const feedbacks = await convexClient.query(api.feedback.list, {
    projectId,
  });

  if (feedbacks.length === 0) return;

  await Promise.all(
    feedbacks.map((feedback) =>
      convexClient.mutation(api.feedback.remove, { id: feedback._id })
    )
  );
}

export async function deleteAllChangelogs(projectId: Id<"projects">) {
  const changelogs = await convexClient.query(api.changelog.list, {
    projectId,
  });

  if (changelogs.length === 0) return;

  await Promise.all(
    changelogs.map((changelog) =>
      convexClient.mutation(api.changelog.remove, { _id: changelog._id })
    )
  );
}

export async function deleteAllMessages(projectId: Id<"projects">) {
  const messages = await convexClient.query(api.message.listAll, {
    projectId,
  });

  if (messages.length === 0) return;

  await Promise.all(
    messages.map((message) =>
      convexClient.mutation(api.message.remove, { messageId: message._id })
    )
  );
}
