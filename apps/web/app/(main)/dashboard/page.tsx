
import { OrganizationProfile } from "@clerk/nextjs";
import DashboardClientPage from "./page-client";

type DashboardPageProps = {
  searchParams: Promise<{
    settings?: string;
  }>
};

const DashboardPage = async ({ searchParams } : DashboardPageProps) => {

const { settings} = await searchParams;

  if (settings) {
    return (
      <div className="flex justify-center items-center pt-5">
        <OrganizationProfile />
      </div>
    );
  }

  return <DashboardClientPage />
};

export default DashboardPage;
