import type { PagePropsWithProjectId } from "@/lib/types";
import ProjectDashboardClientPage from "./page-client";

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
