"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import type { ProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import OwnedTaskTable from "../_components/owned-task-table";

const ProjectDashboardClientPage = ({ id }: ProjectId) => {
  const currentUser = useCurrentUser();

  const myTasks = useQuery(api.work_item.list, {
    projectId: id,
    assigneeId: currentUser?._id,
    ignoreCompleted: true,
  });

  return (
    <section className="bg-primary-foreground/80 md:p-5 py-5 px-3 m-1 rounded-lg">
      <h4 className="mb-5 text-lg">Your task list</h4>
      {myTasks ? (
        <OwnedTaskTable tasks={myTasks} />
      ) : (
        <div className="h-36 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </section>
  );
};

export default ProjectDashboardClientPage;
