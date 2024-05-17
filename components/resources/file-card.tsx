import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFileModal } from "@/lib/store/use-file-modal";
import { Edit, File, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import ConfirmModal from "../modals/confirm-modal";
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

  const { isPending, mutate: deleteFile } = useApiMutation(
    api.resources.file.remove
  );

  return (
    <Card className="group max-w-full">
      <CardHeader className="flex flex-row items-center gap-4 p-3 px-5 space-y-0">
        <FileIcon type={type} />
        <CardTitle className="text-base truncate hover:underline underline-offset-2 flex-1">
          <Link
            target="_blank"
            className="flex items-center gap-2 w-1/2 sm:w-2/3 md:w-auto"
            href={{
              host: process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_SITE,
              pathname: "/getFile",
              query: { storageId },
            }}
          >
            <span className="truncate shrink">{title}</span>
            <SquareArrowOutUpRight className="shrink-0 w-4 h-4 hidden md:flex" />
          </Link>
        </CardTitle>

        <div className="flex gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            disabled={isPending}
            onClick={() => onOpen({ _id, projectId, storageId, title, type })}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <ConfirmModal
            onConfirm={() => deleteFile({ _id })}
            header={"Delete file: " + title}
            disabled={isPending}
          >
            <Button
              variant="ghost"
              className="hover:bg-destructive hover:text-destructive-foreground"
              size="sm"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </ConfirmModal>
        </div>
      </CardHeader>
    </Card>
  );
};

export default FileCard;
