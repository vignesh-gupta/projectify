"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const NoProject = () => {
  const { organization } = useOrganization();
  const router = useRouter();

  const handleCreateProject = async () => {
    if (!organization) return;

    console.log("TODO: Create Project");
    
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="No Projects" />
      <h2 className="text-2xl mt-6 font-semibold ">Create your first Project</h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Start by creating a Project for your team
      </p>
      <div className="mt-6">
        <Button disabled={false} size="lg" onClick={handleCreateProject}>
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default NoProject;
