"use client";

import NoProject from "@/components/empty-states/no-projects";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ProjectCard from "./project-card";

type ProjectListProps = {
  orgId: string;
};

const ProjectList = ({ orgId }: ProjectListProps) => {
  const projects = useQuery(api.projects.list, { orgId });

  if (projects?.error) {
    console.error("[PROJECT_FETCH_ERROR]", projects.error);
  }

  if (!projects?.data?.length) return <NoProject />;

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {projects.data.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
