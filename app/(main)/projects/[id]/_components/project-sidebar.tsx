"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn, getNavLinks } from "@/lib/utils";

const poppinsFont = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const ProjectSidebar = () => {
  const param = useParams();
  const pathname = usePathname();

  const navLinks = getNavLinks(param.id as string);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 border-r pr-3",
        poppinsFont.className
      )}
    >
      <div className="w-full space-y-2">
        {navLinks.map(({ href, Icon, name }) => (
          <Button
            key={href}
            variant={pathname.includes(href) ? "default" : "ghost"}
            asChild
            className="justify-start w-full px-2 font-normal"
          >
            <Link href={href}>
              <Icon className="w-4 h-4 mr-2" /> {name}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default ProjectSidebar;
