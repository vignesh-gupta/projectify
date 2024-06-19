import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

type FeedbackActionsProps = {
  feedback: Doc<"feedbacks"> | undefined;
};

const FeedbackActions = ({ feedback }: FeedbackActionsProps) => {
  const { onOpen } = useFeedbackModal();

  const { mutate: deleteFeedback, isPending } = useApiMutation(
    api.feedback.remove
  );

  if (!feedback) return null;

  const handleCreateWorkItem = () => {
    toast.warning("This functionality in under development.");

    // Create work item
    // Close feedback
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex-1"
        disabled={feedback.status == "closed"}
        onClick={handleCreateWorkItem}
      >
        Create WorkItem
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => onOpen(feedback)}
            disabled={isPending}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => deleteFeedback({ id: feedback._id })}
          >
            <Trash className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FeedbackActions;
