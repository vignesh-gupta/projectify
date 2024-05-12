"use client";

import { FaviconResponse } from "@/app/api/favicon/route";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { ChevronDown, File, Link } from "lucide-react";
import { useParams } from "next/navigation";

const AddButton = () => {
  const param = useParams();

  const addResource = useAction(api.resources.link.createLinkAction);

  const addLink = async () => {
    const icon: FaviconResponse = await fetch(
      `/api/favicon?url=https://vigneshgupta.tech/`,
      {
        method: "POST",
        headers: {
          AllowOrigin: "*",
        },
      }
    )
      .then((res) => res.json())
      .catch(console.error);



    // addResource({
    //   title: "Portfolio Website",
    //   url: "https://vigneshgupta.tech/",
    //   projectId: param.id as Id<"projects">,
    // });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: "sm" })}>
        Add <ChevronDown className="w-4 h-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={addLink}>
          <Link className="w-4 h-4 mr-2" /> Add Link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <File className="w-4 h-4 mr-2" /> Add File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddButton;
