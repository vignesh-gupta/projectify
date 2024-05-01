"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import { Task } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import DataTableRowActions from "./data-table-row-actions";
import { labels, priorities, statuses } from "./options";

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px] hidden lg:block"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px] hidden lg:block"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="md:w-[300px]">
        <DataTableColumnHeader column={column} title="Title" />
      </div>
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2 md:w-[300px]">
          {label && <Badge variant={label.variant}>{label.label}</Badge>}
          <span className="truncate font-medium">{row.getValue("title")}</span>
        </div>
      );
    },
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
    filterFn: (row, id, value) => value.includes(row.original.assigneeId),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="md:w-[100px]">
        <DataTableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex md:w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    sortingFn: (rowA, rowB, id) => {
      const statusSeq = statuses.map((status) => status.value);

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
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, id) => {
      const prioritySeq = priorities.map((priority) => priority.value);

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
