"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import ResourceCard from "./resource-card";

const ResourceList = () => {
  const param = useParams();

  const resources = useQuery(api.resources.links.list, {
    projectId: param.id as Id<"projects">,
  });

  if (!resources || !resources.length) return <NoResource />;

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {resources.map((res) => (
        <ResourceCard key={res._id} resource={res} />
      ))}
    </div>
  );
};

export default ResourceList;

const NoResource = () => {
  const { onOpen } = useLinkModal();

  return (
    <div className="h-48 bg-foreground/5 rounded-md flex items-center justify-center flex-col gap-3 border-dashed border">
      <h3 className="">There are no resources</h3>
      <Button size="sm" onClick={() => onOpen()}>
        Add Resource
      </Button>
    </div>
  );
};
