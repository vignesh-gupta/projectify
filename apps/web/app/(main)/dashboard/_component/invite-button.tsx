import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import ResponsiveModel from "@/components/responsive-model";
import { Button } from "@/components/ui/button";

const InviteButton = () => {
  return (
    <ResponsiveModel
      className="p-0 border-none bg-transparent max-w-[880px]"
      trigger={
        <Button className="hidden sm:flex">
          <Plus className="w-4 h-4 mr-2" /> Invite members
        </Button>
      }
      asChild
    >
      <OrganizationProfile />
    </ResponsiveModel>
  );
};

export default InviteButton;
