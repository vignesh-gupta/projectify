"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { useUploadFiles, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { ChevronDown, File, Link } from "lucide-react";
import { useParams } from "next/navigation";

const AddButton = () => {
  const { onOpen } = useLinkModal();

  const params = useParams();

  const { mutate: generateUploadUrl, isPending } = useApiMutation(
    api.resources.storage.generateUploadUrl
  );
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { mutate: createFileResource } = useApiMutation(
    api.resources.file.create
  );

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
      });
    });

    fileInput.click();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: "sm" })}>
        Add <ChevronDown className="w-4 h-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onOpen()}>
          <Link className="w-4 h-4 mr-2" /> Add Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddFile} disabled={isPending}>
          <File className="w-4 h-4 mr-2" /> Add File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddButton;
