import React from "react";
import OrganizationsSideBar from "./_component/sidebar/orgs-sidebar";
import DashboardSidebar from "./_component/sidebar";
import DashboardTopBar from "./_component/dashboard-top-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[100dvh]">
      <OrganizationsSideBar />
      <div className="pl-[60px] h-full">
        <div className="flex h-full">
          <DashboardSidebar />
          <div className="flex-1 h-full">
            <DashboardTopBar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
