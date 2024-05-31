"use client";

import NoProject from "@/components/empty-states/no-projects";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Plus } from "lucide-react";
import InputModal from "../modals/input-modal";
import ProjectCard from "./project-card";

type ProjectListProps = {
  orgId: string;
};

const ProjectList = ({ orgId }: ProjectListProps) => {
  const projects = useQuery(api.project.list, { orgId });

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

  const handleCreateProject = (title?: string, description?: string) => {
    if (!organization) throw new Error("Organization not found");

    return createProject({
      orgId: organization.id,
      title: title ?? "New Project",
      description: description ?? "Planning to do something awesome!",
      status: "development",
    });
  };

  return (
    <InputModal
      onConfirm={handleCreateProject}
      header="Create a new project"
      description="Provide Project details to create a new project."
      toastMessage="Project created successfully"
    >
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center gap-2 h-full min-h-36 border-dashed"
      >
        <Plus className="w-8 h-8" />
        <span className="text-sm">Add Project</span>
      </Button>
    </InputModal>
  );
};

export default ProjectList;
