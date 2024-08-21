"use client";

import { ColumnDef } from "@tanstack/react-table";

import TaskPriority from "@/components/task/task-priority";
import TaskStatus from "@/components/task/task-status";
import { PRIORITIES, STATUSES } from "@/lib/constants";
import TaskTitle from "../task/task-title";
import { Task } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="md:w-[300px]">
        <DataTableColumnHeader column={column} title="Title" />
      </div>
    ),
    cell: ({ row }) => (
      <TaskTitle title={row.getValue("title")} type={row.original.label} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.getValue("assignee") ?? "Unassigned"}
      </div>
    ),
    filterFn: (row, _, value) => value.includes(row.original.assigneeId),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="md:w-[100px]">
        <DataTableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({ row }) => (
      <TaskStatus status={row.getValue("status")} className="md:w-28" />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    sortingFn: (rowA, rowB, id) => {
      const statusSeq = STATUSES.map((status) => status.value);

      return (
        statusSeq.indexOf(rowA.getValue(id)) -
        statusSeq.indexOf(rowB.getValue(id))
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => <TaskPriority priority={row.getValue("priority")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, id) => {
      const prioritySeq = PRIORITIES.map((priority) => priority.value);

      return (
        prioritySeq.indexOf(rowA.getValue(id)) -
        prioritySeq.indexOf(rowB.getValue(id))
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-8" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
