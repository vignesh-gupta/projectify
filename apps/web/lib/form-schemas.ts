import { z } from "zod";

export const feedbackFormSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(10).max(500),
  projectId: z.string().min(10),
  senderName: z.string(),
  senderEmail: z.string().email(),
  status: z.enum(["open", "reviewed", "closed"]).optional().default("open"),
  type: z
    .enum(["documentation", "feature", "issue", "question", "idea", "other"])
    .optional()
    .default("feature"),
});
