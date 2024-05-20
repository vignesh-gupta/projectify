import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectStatusProps = {
  status: string;
};

const ProjectStatus = ({ status }: ProjectStatusProps) => {
  return (
    <Badge
      className={cn("capitalize", {
        "bg-green-500 group-hover:bg-green-600": status === "live",
        "bg-yellow-500 group-hover:bg-yellow-600 ": status === "archived",
        "bg-red-500 group-hover:bg-red-600": status === "stale",
        "bg-blue-500 group-hover:bg-blue-600": status === "development",
      })}
    >
      {status}
    </Badge>
  );
};

export default ProjectStatus;
