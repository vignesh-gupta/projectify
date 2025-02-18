import { api } from "@repo/backend/convex/_generated/api";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import { useQuery } from "convex/react";
import { Button } from "../ui/button";
import ChangelogCard from "./changelog-card";
import { ScrollArea } from "../ui/scroll-area";
import { ProjectId } from "@/lib/types";

const ChangelogList = ({ id }: ProjectId) => {
  const changelogs = useQuery(api.changelog.list, { projectId: id });

  if (!changelogs) {
    return <>Loading...</>;
  }

  if (changelogs.length === 0) {
    return <NoChangelogs />;
  }

  return (
    <div className="space-y-5">
      {changelogs?.map((log) => (
        <ChangelogCard changelog={log} key={log._id} />
      ))}
    </div>
  );
};

export default ChangelogList;

const NoChangelogs = () => {
  const { onOpen } = useChangelogModal();

  return (
    <ScrollArea className="h-[calc(100dvh-150px)] pr-3 pt-2">
      <div className="flex justify-center items-center flex-col gap-4 bg-secondary py-12 rounded-xl">
        <h2 className="font-bold text-lg">There are no Changelogs yet!</h2>
        <Button onClick={() => onOpen()}>Add a Changelog</Button>
      </div>
    </ScrollArea>
  );
};
