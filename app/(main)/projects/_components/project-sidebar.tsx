"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { Layout, ListTodo, Notebook, Settings2, Users } from "lucide-react";
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

const ProjectSidebar = () => {
  const searchParams = useSearchParams();
  const settings = searchParams.get("settings");
  const team = searchParams.get("team");

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 border-r pr-3",
        poppinsFont.className
      )}
    >
      <div className="w-full space-y-2">
        <Button
          variant={!settings && !team ? "default" : "ghost"}
          asChild
          className="justify-start w-full px-2 font-normal"
        >
          <Link href={DASHBOARD_ROUTE}>
            <Layout className="w-4 h-4 mr-2" /> Dashboard
          </Link>
        </Button>
        <Button
          variant={team && !settings ? "default" : "ghost"}
          asChild
          className="justify-start w-full px-2 font-normal"
        >
          <Link
            href={{
              pathname: DASHBOARD_ROUTE,
              query: { team: true },
            }}
          >
            <ListTodo className="w-4 h-4 mr-2" /> Work Item
          </Link>
        </Button>
        <Button
          variant={!team && settings ? "default" : "ghost"}
          asChild
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

export default ProjectSidebar;
