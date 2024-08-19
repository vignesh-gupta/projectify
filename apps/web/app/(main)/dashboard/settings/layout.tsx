"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const AccountSettingsLayout = ({ children }: PropsWithChildren) => {
  const url = usePathname();
  const isOrgSettings = url.includes("/settings/organization-settings");

  const settingUrl = "/dashboard/settings";

  return (
    <div className="px-5">
      <div className="flex gap-x-4 md:[&>*]:text-lg sm:[&>*]:text-base text-sm pt-3 pb-2">
        <h4
          className={cn({
            "underline underline-offset-[15px]": !isOrgSettings,
          })}
        >
          <Link href={settingUrl}>Account Settings</Link>
        </h4>
        <h4
          className={cn({
            "underline underline-offset-[15px]": isOrgSettings,
          })}
        >
          <Link href={`${settingUrl}/organization-settings`}>
            Organization settings
          </Link>
        </h4>
      </div>
      <Separator className="mb-3" />
      {children}
    </div>
  );
};

export default AccountSettingsLayout;
