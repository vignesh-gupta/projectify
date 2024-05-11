import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { MoreHorizontalIcon, NotebookPen } from "lucide-react";
import Link from "next/link";
import ProjectStatus from "./project-status";

type ProjectCardProps = {
  _id: Id<"projects">;
  description?: string | undefined;
  title: string;
  status: string;
};

const ProjectCard = ({ _id, status, title, description }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${_id}/dashboard`}>
      <Card className="group">
        <CardHeader className="flex flex-row items-center gap-4">
          <NotebookPen className="w-8 h-8 shrink-0" />
          <div className="grid gap-1">
            <CardTitle className="text-base truncate">{title}</CardTitle>
            {description && (
              <CardDescription className="truncate">
                {description}
              </CardDescription>
            )}
          </div>
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
                <Link href={`/projects/${_id}/settings`}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <ProjectStatus status={status} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
