import ChangelogCard from "@/components/changelogs/changelog-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileText, Plus } from "lucide-react";

const ChangelogsPage = () => {
  return (
    <>
      <div className="flex justify-between gap-2 border-b pb-2">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
          Changelogs
        </h3>

        <div className="flex items-center gap-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Changelog
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Integration Docs
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100dvh-130px)] pr-3 pt-2">
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
