import React from "react";
import ProjectSidebar from "./[id]/_components/project-sidebar";
import ProjectTopBar from "./[id]/_components/project-top-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[100dvh]">
      <ProjectTopBar />
      <div className="flex h-[calc(100dvh-56px)]">
        <ProjectSidebar />
        <div className="flex-1 h-full">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
