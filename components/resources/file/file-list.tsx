import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import FileUpload from "./file-upload";
import FileCard from "./file-card";
import { Doc } from "@/convex/_generated/dataModel";

type FileListProps = {
  files: Doc<"files">[] | undefined;
};

const FileList = ({ files }: FileListProps) => {
  return (
    <Card className="col-span-3 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Files</h2>
        <FileUpload fileCount={files?.length} />
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        {files && files.length > 0 ? (
          files?.map((res) => <FileCard key={res._id} resource={res} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-48 gap-3 border border-dashed rounded-md bg-foreground/5">
            <h3>There are no resources</h3>
            <FileUpload />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileList;
