import { PROJECTS_STAGES } from "./constants";

export type TaskStatus =
  | "backlog"
  | "todo"
  | "in-progress"
  | "done"
  | "canceled";

export type TaskPriority = "low" | "medium" | "high";

export type TaskType = "documentation" | "bug" | "feature";

export type ProjectStatus = (typeof PROJECTS_STAGES)[number];

export type ResourceType = "link" | "file";
