import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden sm:flex">
          <Plus className="w-4 h-4 mr-2" /> Invite members
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 border-none bg-transparent max-w-[880px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
