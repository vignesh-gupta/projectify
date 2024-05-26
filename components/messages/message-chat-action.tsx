import { Copy, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type MessageChatActionProps = {
  messageId: Id<"messages">;
  content: string;
};

const MessageChatAction = ({ content, messageId }: MessageChatActionProps) => {
  const { mutate: deleteMessage, isPending } = useApiMutation(
    api.message.remove
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  const handleDelete = () => {
    deleteMessage({ messageId })
      .then(() => toast.success("Message deleted"))
      .catch(() => toast.error("Failed to delete message"));
  };

  return (
    <>
      <Button size="icon" variant="ghost" onClick={handleCopy}>
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        disabled={isPending}
        onClick={handleDelete}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </>
  );
};

export default MessageChatAction;
