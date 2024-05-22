import { Doc } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { cn } from "@/lib/utils";
import Hint from "../hint";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type MessageChatProps = {
  message: Doc<"messages">;
};

const MessageChat = ({ message }: MessageChatProps) => {
  const currentUser = useCurrentUser();

  return (
    <div
      className={cn("flex items-center gap-x-2 p-2", {
        "flex-row-reverse ": currentUser?._id === message.senderId,
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
          "bg-blue-700 text-white": currentUser?._id === message.senderId,
          "bg-accent": currentUser?._id !== message.senderId,
        })}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default MessageChat;
