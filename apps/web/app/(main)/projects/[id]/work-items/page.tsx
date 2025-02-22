"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/components/work-items/columns";
import { DataTable } from "@/components/work-items/data-table";
import { api } from "@repo/backend/convex/_generated/api";
import { useTaskModal } from "@/lib/store/use-task-modal";
import type { ProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const WorkItemsPage = () => {
  const { id } = useParams<ProjectId>()

  const tasks = useQuery(api.work_item.list, { projectId: id });

  const { onOpen } = useTaskModal();

  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-between bg-background/30 z-10 ">
        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Work Items
        </h3>
        <Button size="sm" onClick={() => onOpen()}>
          Add Item
        </Button>
      </div>
      <div className="flex-1 flex-col space-y-8 mx-auto rounded-lg">
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
};

export default WorkItemsPage;
