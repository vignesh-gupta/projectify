"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";

import ProjectSwitcher from "@/components/projects/project-switcher";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const ProjectTopBar = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center justify-end px-5 py-2 gap-x-5 border-b h-14">
      <div className="flex-1 flex gap-1 items-center">
        <Link href={DASHBOARD_ROUTE}>
          <Image src="/logo.svg" height={30} width={30} alt="Projectify" />
        </Link>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
        <div className="hidden md:block">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl={DASHBOARD_ROUTE}
            afterLeaveOrganizationUrl={DASHBOARD_ROUTE}
            afterSelectOrganizationUrl={DASHBOARD_ROUTE}
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
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
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
        {organization && <ProjectSwitcher orgId={organization.id} />}
      </div>
      <ThemeSwitch />
      <UserButton
        afterSignOutUrl={DASHBOARD_ROUTE}
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

export default ProjectTopBar;
