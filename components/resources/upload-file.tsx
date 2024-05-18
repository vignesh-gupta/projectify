import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

const UploadFile = () => {
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
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      const [res] = await startUpload([file]);
      createFileResource({
        title: res.name,
        storageId: (res.response as { storageId: Id<"_storage"> }).storageId,
        projectId: params.id as Id<"projects">,
        type: res.type,
      });
    });

    fileInput.click();
  };

  return (
    <Button size="sm" onClick={handleAddFile}>
      <Upload className="mr-2 h-4 w-4" />
      Upload
    </Button>
  );
};

export default UploadFile;
