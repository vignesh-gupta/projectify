import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { Row } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "./data-table";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type DataTableRowActionsProps = {
  row: Row<Task>;
};

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
  const { onOpen } = useTaskModal();
  const { mutate: deleteTask, isPending } = useApiMutation(
    api.work_item.remove
  );

  const handleEdit = () => {
    onOpen(row.original);
  };

  const handleDelete = () => {
    deleteTask({ _id: row.original._id })
      .then(() => toast.success("Task deleted successfully"))
      .catch(() => toast.error("Failed to delete task. Please try again."));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
