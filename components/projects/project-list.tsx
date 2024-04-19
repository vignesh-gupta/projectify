import NoProject from "@/components/empty-states/no-projects";
import React from "react";

const projects = [];

const ProjectList = () => {
  if (!projects.length) return <NoProject />;

  return <div>ProjectList</div>;
};

export default ProjectList;
