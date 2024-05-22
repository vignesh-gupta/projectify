import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";

export const useMessages = (projectId: Id<"projects">) => {
  const messages = usePaginatedQuery(
    api.message.list,
    { projectId },
    {
      initialNumItems: MESSAGES_PER_REQ,
    }
  );

  return {
    messages: messages.results,
    isLoading: messages.isLoading,
    fetchMore: () => messages.loadMore(MESSAGES_PER_REQ),
    status: messages.status,
  };
};

const MESSAGES_PER_REQ = 10;
