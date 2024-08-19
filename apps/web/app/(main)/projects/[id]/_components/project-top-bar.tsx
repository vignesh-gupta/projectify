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
import ProjectMobileBar from "./project-mobile-bar";

const ProjectTopBar = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center justify-end px-5 py-2 border-b h-14">
      <ProjectMobileBar />
      <div className="flex-1 flex gap-1 items-center">
        <Link href={DASHBOARD_ROUTE}>
          <Image src="/logo.png" height={45} width={45} alt="Projectify" />
        </Link>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
        <div className="hidden md:flex gap-1 items-center">
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
                  border: "1px solid var(--input)",
                  width: "100%",
                  borderRadius: "8px",
                  justifyContent: "space-between",
                },
              },
            }}
          />
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        {organization && <ProjectSwitcher orgId={organization.id} />}
      </div>
      <div className="hidden md:flex gap-2 items-center">
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
    </div>
  );
};

export default ProjectTopBar;
