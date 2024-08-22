"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import type { PagePropsWithProjectId } from "@/lib/types";
import { useRouter } from "next/navigation";

const ProjectSettingsDangerZonePage = ({
  params: { id },
}: PagePropsWithProjectId) => {
  const { isPending, mutate: deleteProject } = useApiMutation(
    api.project.remove
  );
  const router = useRouter();

  const handleDeleteProject = () =>
    deleteProject({ id }).then(() => {
      router.push(DASHBOARD_ROUTE);
    });

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
