import { v } from "convex/values";

export const ProjectStatus = v.union(
  v.literal("development"),
  v.literal("live"),
  v.literal("stale"),
  v.literal("archived")
);

export const TaskStatus = v.union(
  v.literal("backlog"),
  v.literal("todo"),
  v.literal("in-progress"),
  v.literal("done"),
  v.literal("canceled")
);

export const TaskPriority = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high")
);

export const TaskType = v.union(
  v.literal("documentation"),
  v.literal("bug"),
  v.literal("feature")
);