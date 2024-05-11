"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
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
  const { userId } = useAuth();

  const convexUser = useQuery(api.user.get, { clerkId: userId ?? "" });

  const myTasks = useQuery(api.work_items.list, { projectId: id })?.filter(
    (task) => task.assigneeId === convexUser?._id
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
