import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    // icon: v.string(),
    status: v.union(
      v.literal("development"),
      v.literal("live"),
      v.literal("stale"),
      v.literal("archived")
    ),
    team: v.array(v.string()),
    creatorId: v.string(),
    creatorName: v.string(),
    orgId: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),

  workItems: defineTable({
    assigneeId: v.id("users"),
    assignee: v.string(),
    label: v.union(
      v.literal("documentation"),
      v.literal("bug"),
      v.literal("feature")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    projectId: v.id("projects"),
    status: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in progress"),
      v.literal("done"),
      v.literal("canceled")
    ),
    title: v.string(),
    description: v.optional(v.string()),
  })
    .index("by_project", ["projectId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["projectId"],
    }),

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
  })
    .index("by_clerkId", ["clerkId"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["clerkId"],
    }),

  team_memberships: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    isAdmin: v.boolean(),
  })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_user", ["teamId", "userId"]),
});
