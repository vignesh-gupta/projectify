import NoProject from "@/app/(main)/dashboard/_component/empty-states/no-projects";
import React from "react";

const projects = [];

const ProjectList = () => {
  if (!projects.length) return <NoProject />;

  return <div>ProjectList</div>;
};

export default ProjectList;
