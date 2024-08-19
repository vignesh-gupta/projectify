"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import InviteButton from "./invite-button";
import { ThemeSwitch } from "@/components/theme/theme-switch";

const DashBoardTopBar = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center justify-end px-5 py-2 gap-x-5 border-b">
      <div className="flex-1 block lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "367px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                justifyContent: "space-between",
              },
            },
          }}
        />
      </div>
      <ThemeSwitch />
      {organization && <InviteButton />}
      <UserButton
        appearance={{
          elements: {
            accordionTriggerButton: {
              border: "1px solid #E5E7EB",
            },
          },
        }}
      />
    </div>
  );
};

export default DashBoardTopBar;
