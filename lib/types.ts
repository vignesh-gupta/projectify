export type TaskStatus =
  | "backlog"
  | "todo"
  | "in progress"
  | "done"
  | "canceled";

export type TaskPriority = "low" | "medium" | "high";

export type TaskType = "documentation" | "bug" | "feature";