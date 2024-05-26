"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Id } from "@/convex/_generated/dataModel";
import { useMessages } from "@/lib/hooks/use-messages";
import { useScroll } from "@/lib/hooks/use-scroll";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import MessageChat from "./message-chat";

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
        {!messages.length ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 py-5 self-center ">
            No messages yet
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 py-5 self-center ">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          messages.map((message) => (
            <MessageChat message={message} key={message._id} />
          ))
        )}

        {status === "CanLoadMore" && (
          <div className="flex items-center justify-center gap-x-2 p-2">
            <Button variant="ghost" onClick={fetchMore}>
              Load More
            </Button>
          </div>
        )}

        {status === "Exhausted" && (
          <div className="flex items-center justify-center gap-x-2 p-2 text-muted-foreground">
            <p>No more messages</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
