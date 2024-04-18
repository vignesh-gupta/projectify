import React from "react";
import OrganizationsSideBar from "./_component/sidebar/orgs-sidebar";
import DashboardSidebar from "./_component/sidebar";
import Navbar from "./_component/dashboard-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <OrganizationsSideBar />
      <div className="pl-[60px] h-full">
        <div className="flex h-full gap-x-3">
          <DashboardSidebar />
          <div className="flex-1 h-full">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
