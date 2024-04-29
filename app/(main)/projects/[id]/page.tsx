"use client";

import { useAuth } from "@clerk/nextjs";
import OwnedTaskTable from "./_components/owned-task-table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

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
    <div className="md:w-2/3 flex-1 md:flex-none">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5">
        Project Dashboard
      </h3>
      <section className="bg-primary-foreground/80 p-5 rounded-lg">
        <h4 className="mb-5 text-lg">Your task list</h4>
        {myTasks ? (
          <OwnedTaskTable tasks={myTasks} />
        ) : (
          <div className="h-36 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectDashboardPage;
