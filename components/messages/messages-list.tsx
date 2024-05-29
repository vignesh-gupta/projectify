"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Id } from "@/convex/_generated/dataModel";
import { useMessages } from "@/lib/hooks/use-messages";
import { useScroll } from "@/lib/hooks/use-scroll";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import MessageChat from "./message-chat";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type MessagesListProps = {
  projectId: Id<"projects">;
};

const MessagesList = ({ projectId }: MessagesListProps) => {
  const { messages, isLoading, fetchMore, status } = useMessages(projectId);

  const scrollRef = useScroll("instant", "end", [messages]);

  return (
    <ScrollArea className="h-[calc(100dvh-200px)] rounded-md border">
      <div
        className="flex flex-col-reverse min-h-[calc(100dvh-220px)] md:px-3 py-5"
        ref={scrollRef}
      >
        {isLoading ? (
          Array.from({ length: 20 }).map((_, i) => (
            <MessageSkeleton
              key={`message-skeleton-${i}`}
              isRight={i % 2 == 0}
            />
          ))
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <MessageChat message={message} key={message._id} />
          ))
        ) : (
          <div className="flex items-center self-center justify-center flex-1 py-5 text-gray-500 ">
            No messages yet
          </div>
        )}

        {!isLoading && status == "CanLoadMore" && (
          <div className="flex items-center justify-center p-2 gap-x-2">
            <Button variant="ghost" onClick={fetchMore}>
              Load More
            </Button>
          </div>
        )}

        {!isLoading && status == "Exhausted" && (
          <div className="flex items-center justify-center p-2 gap-x-2 text-muted-foreground">
            <p>No more messages</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;

const MessageSkeleton = ({ isRight }: { isRight: boolean }) => (
  <div
    className={cn("flex items-center gap-2 p-2", {
      "flex-row-reverse": isRight,
    })}
  >
    <Skeleton className="w-8 h-8 rounded-full" />
    <Skeleton
      className={cn("w-32 p-3 h-4 rounded-lg bg-accent/60", {
        "bg-accent": isRight,
      })}
    />
  </div>
);
