"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { default as LinkCard, default as ResourceCard } from "./link-card";
import FileCard from "./file-card";

const ResourceList = () => {
  const param = useParams();

  const links = useQuery(api.resources.links.list, {
    projectId: param.id as Id<"projects">,
  });

  const files = useQuery(api.resources.files.list, {
    projectId: param.id as Id<"projects">,
  });

  if ((!links || !links.length) && (!files || !files.length))
    return <NoResource />;

  return (
    <>
      {links?.length ? (
        <section>
          <h4 className="text-xl font-semibold">Links</h4>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {links?.map((res) => <LinkCard key={res._id} resource={res} />)}
          </div>
        </section>
      ) : null}
      {files?.length ? (
        <section>
          <h4 className="text-xl font-semibold">Files</h4>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {files?.map((res) => (
              <FileCard key={res._id} resource={res} />
            ))}
          </div>
        </section>
      ) : null}
    </>
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
