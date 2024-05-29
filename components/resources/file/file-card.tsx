import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFileModal } from "@/lib/store/use-file-modal";
import { Edit, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import FileIcon from "./file-icon";

type FileCardProps = {
  resource: {
    _id: Id<"files">;
    title: string;
    storageId: Id<"_storage">;
    projectId: Id<"projects">;
    type: string;
  };
};

const FileCard = ({
  resource: { _id, title, storageId, projectId, type },
}: FileCardProps) => {
  const { onOpen } = useFileModal();

  const { mutate: deleteFile, isPending: isDeleting } = useApiMutation(
    api.resources.file.remove
  );

  return (
    <div
      key={_id}
      className="grid grid-cols-[48px_1fr_auto] items-center gap-4"
    >
      <FileIcon type={type} />
      <div>
        <div className="font-medium">
          <Link
            target="_blank"
            className="flex items-center w-1/2 gap-2 sm:w-2/3 md:w-auto hover:underline"
            href={{
              host: process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_SITE,
              pathname: "/getFile",
              query: { storageId },
            }}
          >
            <span className="truncate shrink">{title}</span>
          </Link>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">12.3 MB</div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onOpen({ _id, title })}
          disabled={isDeleting}
        >
          <Edit className="w-5 h-5" />
        </Button>
        <ConfirmModal
          header={`Delete file : ${title}`}
          onConfirm={() => deleteFile({ _id })}
          disabled={isDeleting}
          toastMessage="File deleted successfully"
        >
          <Button size="icon" variant="ghost">
            <Trash className="w-5 h-5" />
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default FileCard;
