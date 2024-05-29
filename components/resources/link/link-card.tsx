import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { Edit, LinkIcon, Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../../ui/skeleton";

type LinkCardProps = {
  resource: {
    _id: Id<"links">;
    title: string;
    url: string;
    projectId: Id<"projects">;
    icon?: Id<"_storage"> | undefined;
  };
};

const LinkCard = ({
  resource: { _id, title, url, projectId, icon },
}: LinkCardProps) => {
  const { onOpen } = useLinkModal();

  const { mutate: deleteLink, isPending } = useApiMutation(
    api.resources.link.remove
  );


  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon ? (
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={`https://${process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT_SITE}/getFile?storageId=${icon}`}
            />
            <AvatarFallback>
              {new URL(url).hostname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <LinkIcon className="w-5 h-5" />
        )}
        <a
          className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
          href={url}
          target="_blank"
        >
          {title.length > 10 ? `${title.slice(0, 10)}...` : title}
        </a>
      </div>
      <div>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={() => onOpen({ _id, title, url })}
        >
          <Edit className="w-5 h-5" />
        </Button>
        <ConfirmModal
          onConfirm={() => deleteLink({ _id })}
          header={`Delete link:${title}`}
          disabled={isPending}
          toastMessage="Link deleted successfully"
        >
          <Button size="icon" variant="ghost" disabled={isPending}>
            <Trash className="w-5 h-5" />
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default LinkCard;