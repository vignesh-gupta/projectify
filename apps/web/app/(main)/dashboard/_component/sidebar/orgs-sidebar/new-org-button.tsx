import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import Hint from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DASHBOARD_ROUTE } from "@/lib/constants";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="New Organization"
            align="center"
            side="right"
            sideOffset={15}
          >
            <button className="flex items-center justify-center w-full h-full transition rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization skipInvitationScreen afterCreateOrganizationUrl={DASHBOARD_ROUTE} />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
