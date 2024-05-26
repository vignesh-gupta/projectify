import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { ProjectStatus, TaskPriority, TaskStatus, TaskType } from "./types";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: ProjectStatus,
    creatorId: v.string(),
    creatorName: v.string(),
    orgId: v.string(),
  }).index("by_org", ["orgId"]),

  workItems: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    assigneeId: v.id("users"),
    assignee: v.string(),
    label: TaskType,
    priority: TaskPriority,
    projectId: v.id("projects"),
    status: TaskStatus,
  }).index("by_project", ["projectId"]),

  users: defineTable({
    email: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  })
    .index("by_clerk", ["clerkId"])
    .index("by_email", ["email"]),

  teams: defineTable({
    name: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    createdBy: v.id("users"),
  }).index("by_clerkId", ["clerkId"]),

  team_memberships: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    isAdmin: v.boolean(),
  })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_user", ["teamId", "userId"]),

  links: defineTable({
    title: v.string(),
    url: v.string(),
    icon: v.optional(v.id("_storage")),
    projectId: v.id("projects"),
  }).index("by_project", ["projectId"]),

  files: defineTable({
    title: v.string(),
    storageId: v.id("_storage"),
    projectId: v.id("projects"),
    type: v.string(),
  }).index("by_project", ["projectId"]),

  messages: defineTable({
    content: v.string(),
    projectId: v.id("projects"),
    senderId: v.id("users"),
    senderName: v.string(),
    senderImageUrl: v.string(),
  }).index("by_project", ["projectId"]),
});
