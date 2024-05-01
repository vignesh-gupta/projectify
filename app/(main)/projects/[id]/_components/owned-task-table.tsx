import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { PRIORITIES, STATUSES } from "@/lib/constants";

import React from "react";

type OwnedTaskTableProps = {
  tasks: Doc<"workItems">[];
};

const OwnedTaskTable = ({ tasks }: OwnedTaskTableProps) => {
  const getStatus = (status: string) => {
    const currStatus = STATUSES.find((s) => s.value === status);

    return (
      <div className="flex">
        {currStatus?.icon && (
          <currStatus.icon className="mr-2 h-4 w-4 text-muted-foreground  hidden md:block" />
        )}
        {currStatus?.label}
      </div>
    );
  };

  const getPriority = (priority: string) => {
    const currPriority = PRIORITIES.find((s) => s.value === priority);

    return (
      <div className="flex">
        {currPriority?.icon && (
          <currPriority.icon className="mr-2 h-4 w-4 text-muted-foreground hidden md:block" />
        )}
        {currPriority?.label}
      </div>
    );
  };

  return (
    <Table className="overflow-x-hidden table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-[300px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell className="truncate max-w-[300px]">
              {task.title}
            </TableCell>
            <TableCell>{getStatus(task.status)}</TableCell>
            <TableCell>{getPriority(task.priority)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OwnedTaskTable;
