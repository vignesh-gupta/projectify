"use client";

import { useFileModal } from "@/lib/store/use-file-modal";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { useEffect, useState } from "react";
import FileModal from "./file-model";
import LinkModal from "./link-modal";
import TaskModal from "./task-modal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const taskModal = useTaskModal();
  const linkModal = useLinkModal();
  const fileModal = useFileModal();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (fileModal.isOpen) return <FileModal />;

  if (linkModal.isOpen) return <LinkModal />;

  if (taskModal.isOpen) return <TaskModal />;

  return null;
};

export default ModelProvider;
