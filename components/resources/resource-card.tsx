import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={`https://www.google.com/s2/favicons?domain=${url}&sz=50`}
            />
            <AvatarFallback>{title.charAt(0)}</AvatarFallback>
          </Avatar>
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
