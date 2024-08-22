"use client";

import { Button } from "@/components/ui/button";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { Plus } from "lucide-react";

const AddLink = () => {
  const { onOpen } = useLinkModal();
  return (
    <Button size="sm" onClick={() => onOpen()}>
      <Plus className="mr-2 h-4 w-4" />
      Add
    </Button>
  );
};

export default AddLink;
