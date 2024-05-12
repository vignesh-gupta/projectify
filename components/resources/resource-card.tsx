import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { Link2, MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ResourceCardProps = {
  resource: {
    _id: Id<"links">;
    title: string;
    url: string;
    icon?: string;
  };
};

const ResourceCard = ({
  resource: { _id, title, url, icon },
}: ResourceCardProps) => {
  return (
    <Link href={url}>
      <Card className="group">
        <CardHeader className="flex flex-row items-center gap-4 p-3 px-5 space-y-0">
          {icon ? (
            <Image className="w-6 h-6 rounded-full" src={icon} alt={title} />
          ) : (
            <Link2 className="w-6 h-6 shrink-0" />
          )}
          <CardTitle className="text-base truncate">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="ml-auto rounded-full"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontalIcon className="w-4 h-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Project</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/projects/${"asdasd"}/settings`}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ResourceCard;
