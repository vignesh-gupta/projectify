import ChangelogsHeader from "@/components/changelogs/changelogs-header";
import { Skeleton } from "@/components/ui/skeleton";
import { PagePropsWithProjectId } from "@/lib/types";
import dynamic from "next/dynamic";

const ChangelogList = dynamic(
  () => import("@/components/changelogs/changelog-list"),
  {
    loading: () => <Skeleton className="h-[calc(100dvh-150px)]" />,
  }
);

const ChangelogsPage = async ({ params }: PagePropsWithProjectId) => {
  const { id } = await params;

  return (
    <>
      <ChangelogsHeader id={id} />
      <ChangelogList id={id} />
    </>
  );
};

export default ChangelogsPage;
