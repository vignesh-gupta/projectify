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
import { api } from "@/convex/_generated/api";
import { useConstructions } from "@/lib/hooks/use-constructions";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import type { PagePropsWithProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { Eye, FileText, MoreHorizontal, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ChangelogsPage = ({ params: { id } }: PagePropsWithProjectId) => {
  useConstructions("page"); // TODO: Remove this line when the page is ready

  const router = useRouter();
  const { onOpen } = useChangelogModal();

  const changelogs = useQuery(api.changelog.list, { projectId: id });

  const redirectToPreview = () => {
    router.push(`/changelog/${id}`);
  };

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

            <DropdownMenuItem onClick={redirectToPreview}>
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
          <Button variant="outline" onClick={redirectToPreview}>
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
          {changelogs?.map((log) => (
            <ChangelogCard
              content={log.changes}
              title={log.title}
              date={log.date}
              version={log.version}
              key={log._id}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default ChangelogsPage;
