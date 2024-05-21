"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type MessageInputProps = {
  projectId: Id<"projects">;
};

const MessageInput = ({ projectId }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const { mutate: sendMessage, isPending } = useApiMutation(api.message.create);

  const { userId } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!userId) return toast.error("You must be logged in to send a message");

    e.preventDefault();
    sendMessage({
      content: message,
      projectId,
      senderClerkId: userId,
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-x-2 ">
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
