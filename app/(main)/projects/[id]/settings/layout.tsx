import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

type ProjectSettingsLayoutProps = {
  children: ReactNode;
};

const ProjectSettingsLayout = ({ children }: ProjectSettingsLayoutProps) => {
  return (
    <div className="md:w-2/3 flex-1 md:flex-none">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
        Project Settings
      </h3>
      <div className="mt-5">
        <div className="flex gap-x-4">
          <h4 className="text-lg underline underline-offset-[6px]">General</h4>
          <h4 className="text-lg text-destructive">Danger</h4>
        </div>
        <Separator className="mb-3" />
        {children}
      </div>
    </div>
  );
};

export default ProjectSettingsLayout;
