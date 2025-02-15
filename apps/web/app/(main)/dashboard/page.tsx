"use client";

import { OrganizationProfile, useOrganization } from "@clerk/nextjs";
import NoOrg from "@/components/empty-states/no-org";
import ProjectList from "@/components/projects/project-list";
import { useSearchParams } from "next/navigation";


const DashboardPage = () => {

  const searchParams = useSearchParams();
  const settings = searchParams.get("settings");

  const { organization } = useOrganization();

  if (settings) {
    return (
      <div className="flex justify-center items-center pt-5">
        <OrganizationProfile />
      </div>
    );
  }

  return (
    <div className="flex-1 h-[calc(100dvh-80px)] p-6">
      {!organization ? <NoOrg /> : <ProjectList orgId={organization.id} />}
    </div>
  );
};

export default DashboardPage;
