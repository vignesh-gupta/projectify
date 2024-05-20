"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddLink from "./add-link";
import FileCard from "./file-card";
import LinkCard from "./link-card";
import UploadFile from "./upload-file";

const ResourceList = () => {
  const param = useParams();

  const links = useQuery(api.resources.link.list, {
    projectId: param.id as Id<"projects">,
  });

  const files = useQuery(api.resources.file.list, {
    projectId: param.id as Id<"projects">,
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      <Card className="col-span-3 overflow-hidden">
        <CardHeader className="bg-gray-100 dark:bg-gray-800 flex-row flex items-center justify-between py-3">
          <h2 className="text-lg font-semibold">Files</h2>
          <UploadFile fileCount={files?.length} />
        </CardHeader>
        <CardContent className="p-6 grid gap-6">
          {files && files.length > 0 ? (
            files?.map((res) => <FileCard key={res._id} resource={res} />)
          ) : (
            <div className="h-48 bg-foreground/5 rounded-md flex items-center justify-center flex-col gap-3 border-dashed border">
              <h3>There are no resources</h3>
              <UploadFile />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-2 overflow-hidden">
        <CardHeader className="bg-gray-100 dark:bg-gray-800 flex-row flex items-center justify-between py-3">
          <h2 className="text-lg font-semibold">Links</h2>
          <AddLink />
        </CardHeader>
        <CardContent className="p-6 grid gap-6">
          {links && links.length > 0 ? (
            links?.map((res) => <LinkCard key={res._id} resource={res} />)
          ) : (
            <div className="h-48 bg-foreground/5 rounded-md flex items-center justify-center flex-col gap-3 border-dashed border">
              <h3 className="">There are no resources</h3>
              <AddLink />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceList;
