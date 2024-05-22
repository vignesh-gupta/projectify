"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import OwnedTaskTable from "../_components/owned-task-table";

type ProjectDashboardPageProps = {
  params: {
    id: Id<"projects">;
  };
};

const ProjectDashboardPage = ({
  params: { id },
}: ProjectDashboardPageProps) => {
  const currentUser = useCurrentUser();

  const myTasks = useQuery(api.work_item.list, { projectId: id })?.filter(
    (task) => task.assigneeId === currentUser?._id
  );

  return (
    <section>
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5">
        Project Dashboard
      </h3>
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
    </section>
  );
};

export default ProjectDashboardPage;
