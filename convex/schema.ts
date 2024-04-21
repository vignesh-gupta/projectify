import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    // icon: v.string(),
    status: v.string(),
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
    assignee: v.string(),
    label: v.string(),
    priority: v.string(),
    projectId: v.id("projects"),
    status: v.string(),
    title: v.string(),
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
    orgIds: v.optional(v.array(v.string())),
  })
    .index("by_clerk", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_clerk_and_email", ["clerkId", "email"])
    .searchIndex("search_by_org", {
      searchField: "orgIds",
      filterFields: ["clerkId"],
    }),

  teams: defineTable({
    name: v.string(),
    members: v.array(v.string()),
    clerkId: v.string(),
    imageUrl: v.string(),
    admins: v.array(v.string()),
    createdBy: v.string(),
  })
    .index("by_org", ["clerkId"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["clerkId"],
    }),
});
