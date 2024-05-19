import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "@/lib/constants";
import { toast } from "sonner";

type UploadFileProps = {
  fileCount?: number;
};

const UploadFile = ({ fileCount = 0 }: UploadFileProps) => {
  const params = useParams();

  const { mutate: generateUploadUrl, isPending } = useApiMutation(
    api.resources.storage.generateUploadUrl
  );
  const { mutate: createFileResource } = useApiMutation(
    api.resources.file.create
  );
  const { startUpload, isUploading } = useUploadFiles(generateUploadUrl);

  const handleAddFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "*/*";

    fileInput.addEventListener("change", async (e) => {
      if (fileCount >= MAX_FILE_COUNT) {
        toast.error(`A project can have a maximum of ${MAX_FILE_COUNT} files.`);
        return;
      }

      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size should be less than 5MB");
        return;
      }

      try {
        const [res] = await startUpload([file]);
        createFileResource({
          title: res.name,
          storageId: (res.response as { storageId: Id<"_storage"> }).storageId,
          projectId: params.id as Id<"projects">,
          type: res.type,
        });

        toast.success("File uploaded successfully.");
      } catch (e) {
        toast.error("Failed to upload file. Please try again.");
      }
    });

    fileInput.click();
  };

  return (
    <Button
      size="sm"
      onClick={handleAddFile}
      disabled={isPending || isUploading}
    >
      <Upload className="mr-2 h-4 w-4" />
      Upload
    </Button>
  );
};

export default UploadFile;
