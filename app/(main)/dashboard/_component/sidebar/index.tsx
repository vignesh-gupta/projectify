"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { Notebook, Settings2, Users } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppinsFont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const DashboardSidebar = () => {
  const searchParams = useSearchParams();
  const settings = searchParams.get("settings");
  const team = searchParams.get("team");

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5",
        poppinsFont.className
      )}
    >
      <Link href={DASHBOARD_ROUTE}>
        <div className="flex items-center gap-x-2">
          {/* <Image src="logo.svg" alt="Logo" height={45} width={45} /> */}
          <span>Projectify</span>
        </div>
      </Link>
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

      <div className="w-full space-y-2">
        <Button
          variant={!settings && !team ? "default" : "ghost"}
          asChild
          size="lg"
          className="justify-start w-full px-2 font-normal"
        >
          <Link href={DASHBOARD_ROUTE}>
            <Notebook className="w-4 h-4 mr-2" /> Projects
          </Link>
        </Button>
        <Button
          variant={team && !settings ? "default" : "ghost"}
          asChild
          size="lg"
          className="justify-start w-full px-2 font-normal"
        >
          <Link
            href={{
              pathname: DASHBOARD_ROUTE,
              query: { team: true },
            }}
          >
            <Users className="w-4 h-4 mr-2" /> Team
          </Link>
        </Button>
        <Button
          variant={!team && settings ? "default" : "ghost"}
          asChild
          size="lg"
          className="justify-start w-full px-2 font-normal"
        >
          <Link
            href={{
              pathname: DASHBOARD_ROUTE,
              query: { settings: true },
            }}
          >
            <Settings2 className="w-4 h-4 mr-2" /> Settings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;