"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import type { PagePropsWithProjectId } from "@/lib/types";
import { api } from "@repo/backend/convex/_generated/api";
import { KafkaMessage } from "@repo/backend/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProjectSettingsDangerZonePage = ({
  params: { id },
}: PagePropsWithProjectId) => {
  const { isPending, mutate: deleteProject } = useApiMutation(
    api.project.remove
  );
  const router = useRouter();

  const handleDeleteProject = async () => {
    const message: KafkaMessage = {
      resource: "project",
      id,
      action: "delete",
    };

    try {
      await fetch("/api/kafka/produce", {
        method: "POST",
        body: JSON.stringify(message),
      });
      await deleteProject({ id });
      router.push(DASHBOARD_ROUTE);
    } catch (e) {
      toast.error("Something went wrong, try again later!");
    }
  };

  return (
    <div>
      <div className="mb-3">
        <p className="text-sm mb-1">Delete the project</p>
        <ConfirmModal
          onConfirm={handleDeleteProject}
          header="Delete project"
          disabled={isPending}
          toastMessage="Project deleted successfully"
        >
          <Button variant="destructive" disabled={isPending}>
            Delete Project
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default ProjectSettingsDangerZonePage;
