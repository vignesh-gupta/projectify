"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

const NoProject = () => {
  const { organization } = useOrganization();
  const router = useRouter();
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
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="No Projects" />
      <h2 className="text-2xl mt-6 font-semibold ">
        Create your first Project
      </h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Start by creating a Project for your team
      </p>
      <div className="mt-6">
        <Button disabled={isPending} size="lg" onClick={handleCreateProject}>
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default NoProject;
