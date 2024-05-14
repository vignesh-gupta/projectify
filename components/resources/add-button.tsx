"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { ChevronDown, File, Link } from "lucide-react";

const AddButton = () => {
  const { onOpen } = useLinkModal();

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
