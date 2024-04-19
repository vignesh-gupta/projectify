"use client";

import { useOrganization } from "@clerk/nextjs";
import NoOrg from "@/components/empty-states/no-org";
import ProjectList from "@/components/projects/project-list";

const DashboardPage = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? <NoOrg /> : <ProjectList orgId={organization.id} />}
    </div>
  );
};

export default DashboardPage;
