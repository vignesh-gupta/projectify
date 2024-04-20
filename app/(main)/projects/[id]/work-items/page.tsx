import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "@/components/work-items/column";
import { DataTable } from "@/components/work-items/data-table";
import { taskSchema } from "@/components/work-items/data/schema";
import { UserNav } from "@/components/work-items/user-nav";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "components/work-items/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const WorkItemsPage = async () => {
  const tasks = await getTasks();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};

export default WorkItemsPage;
