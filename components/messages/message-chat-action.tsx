import { Copy, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmModal from "../modals/confirm-modal";

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

  const handleDelete = async () => {
    return deleteMessage({ messageId })
      .then(() => toast.success("Message deleted"))
      .catch(() => toast.error("Failed to delete message"));
  };

  return (
    <>
      <Button size="icon" variant="ghost" onClick={handleCopy}>
        <Copy className="w-4 h-4" />
      </Button>
      <ConfirmModal header="Delete this message" onConfirm={handleDelete} toastMessage="Message deleted successfully">
        <Button size="icon" variant="ghost" disabled={isPending}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </>
  );
};

export default MessageChatAction;
