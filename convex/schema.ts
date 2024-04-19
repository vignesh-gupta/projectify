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
});
