"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import Hint from "../hint";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type MessagesListProps = {
  projectId: Id<"projects">;
};

const MessagesList = ({ projectId }: MessagesListProps) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const { userId } = useAuth();

  const currentUser = useQuery(api.user.get, { clerkId: userId as string });

  const messages = usePaginatedQuery(
    api.message.list,
    { projectId },
    {
      initialNumItems: 10,
    }
  );

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      block: "end",
    });
  }, []);

  return (
    <ScrollArea className="h-[calc(100dvh-200px)] rounded-md border">
      <div
        className="flex flex-col-reverse h-[calc(100dvh-220px)]"
        ref={scrollRef}
      >
        {!messages || messages.isLoading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 py-5 self-center ">
            No messages yet
          </div>
        ) : (
          messages.results.map((message) => (
            <div
              key={message._id}
              className={cn("flex items-center gap-x-2 p-2", {
                "flex-row-reverse ": currentUser?.clerkId === userId,
              })}
            >
              <Hint label={message.senderName}>
                <Avatar className="flex justify-center items-center border-foreground">
                  <AvatarImage
                    src={message.senderImageUrl}
                    alt={message.senderName}
                    width={6}
                    height={6}
                  />

                  <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                </Avatar>
              </Hint>
              <div
                className={cn("p-3 rounded-lg", {
                  "bg-blue-700 text-white": currentUser?.clerkId === userId,
                  "bg-accent": currentUser?.clerkId !== userId,
                })}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))
        )}

        {messages.status === "CanLoadMore" && (
          <div className="flex items-center justify-center gap-x-2 p-2">
            <Button variant="ghost" onClick={() => messages.loadMore(1)}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
