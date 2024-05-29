import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash } from "lucide-react";
import FileCard from "./file-card";
import FileUpload from "./file-upload";

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
        {!files ? (
          <FileSkeleton />
        ) : files.length <= 0 ? (
          <NoFiles />
        ) : (
          files?.map((res) => <FileCard key={res._id} resource={res} />)
        )}
      </CardContent>
    </Card>
  );
};

export default FileList;

const NoFiles = () => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 border border-dashed rounded-md bg-foreground/5">
    <h3>There are no resources</h3>
    <FileUpload />
  </div>
);

const FileSkeleton = () => (
  <div className="grid grid-cols-[48px_1fr_auto] items-center gap-4">
    <Skeleton className="w-10 h-10" />
    <Skeleton className="w-32 h-4" />
    <div className="flex items-center gap-2">
      <Button size="icon" variant="ghost" disabled>
        <Edit className="w-5 h-5" />
      </Button>
      <Button size="icon" variant="ghost" disabled>
        <Trash className="w-5 h-5" />
      </Button>
    </div>
  </div>
);
