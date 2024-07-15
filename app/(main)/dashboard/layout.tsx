import type { PropsWithChildren } from "react";
import DashboardTopBar from "./_component/dashboard-top-bar";
import DashboardSidebar from "./_component/sidebar";
import OrganizationsSideBar from "./_component/sidebar/orgs-sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100dvh]">
      <OrganizationsSideBar />
      <div className="md:pl-[48px] h-full">
        <div className="flex h-full">
          <DashboardSidebar />
          <main className="flex flex-col flex-1 h-full">
            <DashboardTopBar />
            <div className="overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
