import React from "react";
import ProjectSidebar from "./[id]/_components/project-sidebar";
import ProjectTopBar from "./[id]/_components/project-top-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh]">
      <ProjectTopBar />
      <div className="flex h-[calc(100dvh-56px)]">
        <ProjectSidebar />
        <main className="w-full h-full md:p-8 p-3 *:max-w-4xl *:mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
