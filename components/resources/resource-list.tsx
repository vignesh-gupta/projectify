"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import ResourceCard from "./resource-card";

const ResourceList = () => {
  const param = useParams();

  const resources = useQuery(api.resources.links.list, {
    projectId: param.id as Id<"projects">,
  });

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {resources?.map(res => 
        <ResourceCard key={res._id} resource={res} />
      )}
    </div>
  );
};

export default ResourceList;
