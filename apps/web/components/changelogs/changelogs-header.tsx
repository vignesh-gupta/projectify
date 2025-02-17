"use client";

import ChangelogIntegration from "@/components/changelogs/changelog-integration";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import type { ProjectId } from "@/lib/types";
import { Eye, FileText, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";


const ChangelogsHeader = ({ id }: ProjectId ) => {


  const { onOpen } = useChangelogModal();

  return (
    <div className="flex justify-between gap-2 border-b p-2 items-center">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
          Changelogs
        </h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onOpen()}>
              <Plus className="h-4 w-4 mr-2" /> Add Changelog
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link target="_blank" href={`/changelog/${id}`}>
                <Eye className="h-4 w-4 mr-2" /> Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <ChangelogIntegration>
                <FileText className="h-4 w-4 mr-2" /> View Integration Docs
              </ChangelogIntegration>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex items-center gap-4 hidden">
          <Button onClick={() => onOpen()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Changelog
          </Button>
          <Button variant="outline" asChild>
            <Link target="_blank" href={`/changelog/${id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <ChangelogIntegration>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Integration Docs
            </Button>
          </ChangelogIntegration>
        </div>
      </div>
  );
};

export default ChangelogsHeader;
