"use client";

import { api } from "@repo/backend/convex/_generated/api";
import type { Id } from "@repo/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import FileList from "./file/file-list";
import LinkList from "./link/link-list";

const ResourceList = () => {
  const param = useParams();

  const links = useQuery(api.resources.link.list, {
    projectId: param.id as Id<"projects">,
  });

  const files = useQuery(api.resources.file.list, {
    projectId: param.id as Id<"projects">,
  });

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
      <FileList files={files} />
      <LinkList links={links} />
    </div>
  );
};

export default ResourceList;
