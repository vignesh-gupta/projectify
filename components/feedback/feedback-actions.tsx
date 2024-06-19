import { FeedbackStatus } from "@/lib/types";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type FeedbackActionsProps = {
  status: FeedbackStatus | undefined;
};

const FeedbackActions = ({ status }: FeedbackActionsProps) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex-1"
        disabled={status == "closed"}
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
          <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FeedbackActions;
