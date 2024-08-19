import { api } from "@repo/backend/convex/_generated/api";
import { Doc } from "@repo/backend/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import { Edit, Trash } from "lucide-react";
import ConfirmModal from "../modals/confirm-modal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

type ChangelogActionsProps = {
  changelog: Doc<"changeLogs">;
};

const ChangelogActions = ({ changelog }: ChangelogActionsProps) => {
  const { mutate: deleteLog, isPending: isDeleting } = useApiMutation(
    api.changelog.remove
  );

  const { mutate: togglePublish, isPending: isUpdating } = useApiMutation(
    api.changelog.update
  );

  const { onOpen } = useChangelogModal();

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="icon"
        variant="ghost"
        aria-label="Edit"
        onClick={() => onOpen(changelog)}
      >
        <Edit className="-4 h-4" />
      </Button>
      <ConfirmModal
        header="Delete the changelog"
        onConfirm={() => deleteLog({ _id: changelog._id })}
        disabled={isDeleting || isUpdating}
        toastMessage="Changelog deleted successfully"
      >
        <Button size="icon" variant="ghost" aria-label="Delete">
          <Trash className="-4 h-4" />
        </Button>
      </ConfirmModal>
      <div className="hidden md:flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {changelog.isPublished ? "Public" : "Private"}
        </span>
        <Switch
          checked={changelog.isPublished}
          onCheckedChange={(value) =>
            togglePublish({ _id: changelog._id, isPublished: value })
          }
          disabled={isUpdating || isDeleting}
        />
      </div>
    </div>
  );
};

export default ChangelogActions;
