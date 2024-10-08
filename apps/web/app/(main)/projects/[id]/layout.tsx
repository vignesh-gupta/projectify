import type { PropsWithChildren } from "react";
import ProjectSidebar from "./_components/project-sidebar";
import ProjectTopBar from "./_components/project-top-bar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100dvh]">
      <ProjectTopBar />
      <div className="flex h-[calc(100dvh-56px)]">
        <ProjectSidebar />
        <main className="w-full h-full md:p-8 p-3 *:max-w-4xl *:mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
