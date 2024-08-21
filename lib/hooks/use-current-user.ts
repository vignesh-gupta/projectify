import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export const useCurrentUser = () => {
  const { userId } = useAuth();

  return useQuery(api.user.get, { clerkId: userId as string });
};
