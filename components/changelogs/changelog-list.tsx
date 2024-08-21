import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import { useQuery } from "convex/react";
import { Button } from "../ui/button";
import ChangelogCard from "./changelog-card";

type ChangelogListProps = {
  projectId: Id<"projects">;
};

const ChangelogList = ({ projectId }: ChangelogListProps) => {
  const changelogs = useQuery(api.changelog.list, { projectId });

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
    <div className="flex justify-center items-center flex-col gap-4 bg-secondary py-12 rounded-xl">
      <h2 className="font-bold text-lg">There are no Changelogs yet!</h2>
      <Button onClick={() => onOpen()}>Add a Changelog</Button>
    </div>
  );
};
