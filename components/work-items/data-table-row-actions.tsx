import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Task } from "./data-table";

type DataTableRowActionsProps = {
  row: Row<Task>;
};

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
