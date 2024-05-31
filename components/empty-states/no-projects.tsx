"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

import InputModal from "@/components/modals/input-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/lib/hooks/use-api-mutation";

const NoProject = () => {
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
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="No Projects" />
      <h2 className="text-2xl mt-6 font-semibold ">
        Create your first Project
      </h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Start by creating a Project for your team
      </p>
      <div className="mt-6">
        <InputModal
          onConfirm={handleCreateProject}
          header="Create a new project"
          description="Provide Project details to create a new project."
          toastMessage="Project created successfully"
        >
          <Button>Create Project</Button>
        </InputModal>
      </div>
    </div>
  );
};

export default NoProject;
