"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { ChevronDown, File, Link } from "lucide-react";
import { useParams } from "next/navigation";

const AddButton = () => {
  const param = useParams();

  const { mutate: addResource, isPending } = useApiMutation(
    api.resources.link.create
  );

  const { onOpen } = useLinkModal();

  // const addLink = async () => {
  //   const url = "https://vigneshgupta.tech/";

  //   addResource({
  //     title: "Portfolio Website",
  //     url,
  //     projectId: param.id as Id<"projects">,
  //   });
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: "sm" })}>
        Add <ChevronDown className="w-4 h-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onOpen()}>
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
