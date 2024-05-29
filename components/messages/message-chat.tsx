import { Doc } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { cn } from "@/lib/utils";
import Hint from "../hint";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageChatAction from "./message-chat-action";

type MessageChatProps = {
  message: Doc<"messages">;
};

const MessageChat = ({ message }: MessageChatProps) => {
  const currentUser = useCurrentUser();

  if(!currentUser) return null

  return (
    <div
      className={cn("flex items-center gap-x-2 p-2 group", {
        "flex-row-reverse": currentUser?._id === message.senderId,
      })}
    >
      <Hint label={message.senderName}>
        <Avatar className="flex items-center justify-center border-foreground">
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
        className={cn("p-3 rounded-lg bg-accent/60", {
          "bg-accent": currentUser?._id === message.senderId,
        })}
      >
        <p>{message.content}</p>
      </div>
      <div
        className={cn("group-hover:opacity-100 opacity-0", {
          hidden: currentUser?._id !== message.senderId,
        })}
      >
        <MessageChatAction messageId={message._id} content={message.content} />
      </div>
    </div>
  );
};

export default MessageChat;
