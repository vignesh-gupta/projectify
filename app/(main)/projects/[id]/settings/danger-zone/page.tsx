"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectSettingsDangerZonePageProps = {
  params: {
    id: Id<"projects">;
  };
};

const ProjectSettingsDangerZonePage = ({
  params: { id },
}: ProjectSettingsDangerZonePageProps) => {
  const { isPending, mutate: deleteProject } = useApiMutation(
    api.project.remove
  );
  const router = useRouter();

  const handleDeleteProject = () => {
    deleteProject({ id })
      .then(() => {
        toast.success("Project deleted successfully");
        router.push(DASHBOARD_ROUTE);
      })
      .catch(() => {
        toast.error("Failed to delete project");
      });
  };

  return (
    <div>
      <div className="mb-3">
        <p className="text-sm mb-1">Delete the project</p>
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleDeleteProject}
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettingsDangerZonePage;
