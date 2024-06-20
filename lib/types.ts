import { PROJECTS_STAGES } from "./constants";

export type OptionalProperty<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

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

export type FeedbackType =
  | "documentation"
  | "feature"
  | "issue"
  | "question"
  | "idea"
  | "other";

export type FeedbackStatus = "open" | "reviewed" | "closed";
