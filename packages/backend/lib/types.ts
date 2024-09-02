import { Id } from "../convex/_generated/dataModel";

export type Resource = "project";

export type Action = "delete";

export type KafkaMessage = {
  action: Action;
  id: Id<"projects">;
  resource: Resource;
};
