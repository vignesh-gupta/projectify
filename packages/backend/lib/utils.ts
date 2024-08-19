import { Id } from "@/convex/_generated/dataModel";

export function generateAPIKey(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "pk_live_";
  for (let i = 0; i < length; i++) {
    key += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return key;
}

export const UNASSIGNED_USER = {
  label: "Unassigned",
  value: process.env.UNASSIGNED_USER_ID as Id<"users">,
};