"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type ProjectSettingsDangerZonePageProps = {
  params: {
    id: Id<"projects">;
  };
};

const ProjectSettingsDangerZonePage = ({
  params: { id },
}: ProjectSettingsDangerZonePageProps) => {
  const project = useQuery(api.project.get, { id });

  return (
    <div>
      <div className="mb-3">
        <p className="text-sm mb-1">Delete the project</p>
        <Button variant="destructive">Delete Project</Button>
      </div>
    </div>
  );
};

export default ProjectSettingsDangerZonePage;
