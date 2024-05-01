"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/components/work-items/columns";
import { DataTable } from "@/components/work-items/data-table";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { useQuery } from "convex/react";

type WorkItemsPageProps = {
  params: {
    id: string;
  };
};

const WorkItemsPage = ({ params: { id } }: WorkItemsPageProps) => {
  const tasks = useQuery(api.work_items.list, { projectId: id });

  const { onOpen } = useTaskModal();

  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="space-y-5 flex flex-col">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Work Items
        </h3>
        <Button size="sm" onClick={() => onOpen()}>
          Add Item
        </Button>
      </div>
      <div className="flex-1 flex-col space-y-8  mx-auto">
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
};

export default WorkItemsPage;
