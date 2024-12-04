import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ResponsiveModel from "../responsive-model";

const NoOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" alt="Empty" height={300} width={300} />

      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <ResponsiveModel
          trigger={<Button size="lg">Create organization</Button>}
          asChild
          className="p-0 bg-transparent border-none max-w-[510px]"
        >
          <CreateOrganization />
        </ResponsiveModel>
      </div>
    </div>
  );
};

export default NoOrg;
