import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { Edit, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type LinkCardProps = {
  resource: {
    _id: Id<"links">;
    title: string;
    url: string;
    projectId: Id<"projects">;
  };
};

const LinkCard = ({
  resource: { _id, title, url, projectId },
}: LinkCardProps) => {
  const { onOpen } = useLinkModal();

  const { mutate: deleteLink, isPending } = useApiMutation(
    api.resources.link.remove
  );

  const hostName = new URL(url).hostname;

  return (
    <Card className="group">
      <CardHeader className="flex flex-row items-center gap-4 p-3 px-5 space-y-0">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={`https://icons.duckduckgo.com/ip3/${hostName}.ico`}
          />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-base truncate hover:underline underline-offset-2 flex-1">
          <Link
            className="flex items-center gap-2 w-1/2 sm:w-2/3 md:w-auto"
            href={url}
          >
            <span className="truncate shrink ">{title}</span>
            <SquareArrowOutUpRight className="shrink-0 w-4 h-4 hidden md:flex" />
          </Link>
        </CardTitle>

        <div className="flex gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpen({ _id, title, url, projectId })}
            disabled={isPending}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className="hover:bg-destructive hover:text-destructive-foreground"
            size="sm"
            onClick={() => deleteLink({ _id })}
            disabled={isPending}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LinkCard;
