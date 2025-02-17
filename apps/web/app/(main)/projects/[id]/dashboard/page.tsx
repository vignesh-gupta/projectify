import type { PagePropsWithProjectId } from "@/lib/types";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDashboardClientPage = dynamic(() => import("./page-client"), {
  loading: () => <Skeleton className="h-36" />, // Show a loading indicator
});

const ProjectDashboardPage = async ({ params }: PagePropsWithProjectId) => {
  const id = (await params).id;

  return (
    <section>
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5">
        Project Dashboard
      </h3>
      <ProjectDashboardClientPage id={id} />
    </section>
  );
};

export default ProjectDashboardPage;
