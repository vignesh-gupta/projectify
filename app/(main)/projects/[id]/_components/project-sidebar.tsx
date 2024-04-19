"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { Layout, ListTodo, Notebook, Settings2, Users } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppinsFont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const ProjectSidebar = () => {
  const param = useParams();

  const pathname = usePathname();
  const isWorkItem = pathname.includes("work-items");
  const isSetting = pathname.includes("settings");

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 border-r pr-3",
        poppinsFont.className
      )}
    >
      <div className="w-full space-y-2">
        <Button
          variant={!isSetting && !isWorkItem ? "default" : "ghost"}
          asChild
          className="justify-start w-full px-2 font-normal"
        >
          <Link href={`/projects/${param.id}`}>
            <Layout className="w-4 h-4 mr-2" /> Dashboard
          </Link>
        </Button>
        <Button
          variant={isWorkItem ? "default" : "ghost"}
          asChild
          className="justify-start w-full px-2 font-normal"
        >
          <Link href={`/projects/${param.id}/work-items`}>
            <ListTodo className="w-4 h-4 mr-2" /> Work Item
          </Link>
        </Button>
        <Button
          variant={isSetting ? "default" : "ghost"}
          asChild
          className="justify-start w-full px-2 font-normal"
        >
          <Link href={`/projects/${param.id}/settings`}>
            <Settings2 className="w-4 h-4 mr-2" /> Settings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectSidebar;
