"use client";

import { Button } from "@/components/ui/button";
import { columns } from "@/components/work-items/columns";
import { DataTable } from "@/components/work-items/data-table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

type WorkItemsPageProps = {
  params: {
    id: string;
  };
};

const WorkItemsPage = ({ params: { id } }: WorkItemsPageProps) => {
  const tasks = useQuery(api.work_items.list, { projectId: id });

  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="space-y-5 flex flex-col">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Work Items
        </h3>
        <Button size="sm">Add Item</Button>
      </div>
      <div className="hidden flex-1 flex-col space-y-8 md:flex mx-auto">
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
};

export default WorkItemsPage;
