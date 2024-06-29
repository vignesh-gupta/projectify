import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { UNASSIGNED_USER } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { TaskType } from "@/lib/types";
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

  const { mutate: createTask } = useApiMutation(api.work_item.create);
  const { mutate: updateFeedback } = useApiMutation(api.feedback.update);

  const { mutate: deleteFeedback, isPending } = useApiMutation(
    api.feedback.remove
  );

  if (!feedback) return null;

  const handleCreateWorkItem = () => {
    const findLabel = {
      issue: "bug",
      idea: "feature",
      question: "documentation",
      documentation: "documentation",
      feature: "feature",
      other: "feature",
    };

    const label = findLabel[feedback.type] as TaskType;

    createTask({
      assignee: UNASSIGNED_USER.label,
      assigneeId: UNASSIGNED_USER.value,
      description: feedback.content,
      label,
      title: `${feedback.senderName}'s ${feedback.type} (Feedback)`,
      priority: "low",
      projectId: feedback.projectId,
      status: "backlog",
    })
      .then(() => {
        updateFeedback({
          _id: feedback._id,
          status: "closed",
        });

        toast.success("WorkItem created successfully");
      })
      .catch((error) => {
        console.error(
          "[FEEDBACK_ACTIONS] [handleCreateWorkItem] [createTask]",
          error
        );
        toast.error("Failed to create WorkItem");
      });
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
