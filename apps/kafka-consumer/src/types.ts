import { Id } from "@repo/backend/convex/_generated/dataModel";

export type Resource = "project";

export type Action = "delete";

export type Message = {
  action: Action;
  id: Id<"projects">;
  resource: Resource;
};
