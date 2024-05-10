"use client";

import NoProject from "@/components/empty-states/no-projects";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProjectCard from "./project-card";

type ProjectListProps = {
  orgId: string;
};

const ProjectList = ({ orgId }: ProjectListProps) => {
  const projects = useQuery(api.projects.list, { orgId });

  if (projects?.error) {
    console.error("[PROJECT_FETCH_ERROR]", projects.error);
  }

  if (!projects?.data?.length) return <NoProject />;

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {projects.data.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      <AddProject />
    </div>
  );
};

const AddProject = () => {
  const { organization } = useOrganization();
  const { mutate: createProject, isPending } = useApiMutation(
    api.project.create
  );

  const handleCreateProject = async () => {
    if (!organization) return;

    await createProject({
      orgId: organization.id,
      title: "New Project",
      status: "development",
      description: "I'm planning to do something awesome!",
    });
  };

  return (
    <Button
      onClick={handleCreateProject}
      disabled={isPending}
      variant="outline"
      className="flex flex-col items-center justify-center gap-2 h-full min-h-36 border-dashed"
    >
      <Plus className="w-8 h-8" />
      <span className="text-sm">Add Project</span>
    </Button>
  );
};

export default ProjectList;
