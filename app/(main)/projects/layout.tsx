import React from "react";
import ProjectSidebar from "./[id]/_components/project-sidebar";
import ProjectTopBar from "./[id]/_components/project-top-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh]">
      <ProjectTopBar />
      <div className="flex h-[calc(100dvh-56px)]">
        <ProjectSidebar />
        <main className="flex-1 h-full p-8 flex justify-center">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;