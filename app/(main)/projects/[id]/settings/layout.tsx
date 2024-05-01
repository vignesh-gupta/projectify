"use client";

import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ProjectSettingsLayoutProps = {
  children: ReactNode;
  params: {
    id: Id<"projects">;
  };
};

const ProjectSettingsLayout = ({
  children,
  params: { id },
}: ProjectSettingsLayoutProps) => {
  const url = usePathname();

  const isDangerZone = url.includes("danger-zone");

  const settingsURL = `/projects/${id}/settings`;

  return (
    <div>
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-3">
        Project Settings
      </h3>
      <div className="flex gap-x-4 [&>*]:text-lg ">
        <h4
          className={cn({
            "underline underline-offset-[6px]": !isDangerZone,
          })}
        >
          <Link href={settingsURL}>General</Link>
        </h4>
        <h4
          className={cn("text-destructive", {
            "underline underline-offset-[6px]": isDangerZone,
          })}
        >
          <Link href={settingsURL + "/danger-zone"}>Danger</Link>
        </h4>
      </div>
      <Separator className="mb-3" />
      {children}
    </div>
  );
};

export default ProjectSettingsLayout;
