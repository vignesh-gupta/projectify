"use client";

import ChangelogCard from "@/components/changelogs/changelog-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConstructions } from "@/lib/hooks/use-constructions";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import { Eye, FileText, MoreHorizontal, Plus } from "lucide-react";

const ChangelogsPage = () => {
  useConstructions("page"); // TODO: Remove this line when the page is ready

  const { onOpen } = useChangelogModal();

  return (
    <>
      <div className="flex justify-between gap-2 border-b p-2 items-center">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
          Changelogs
        </h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onOpen()}>
              <Plus className="h-4 w-4 mr-2" /> Add Changelog
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" /> View Integration Docs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex items-center gap-4 hidden">
          <Button onClick={() => onOpen()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Changelog
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Integration Docs
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100dvh-150px)] pr-3 pt-2">
        <div className="space-y-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ChangelogCard key={index} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ChangelogsPage;
