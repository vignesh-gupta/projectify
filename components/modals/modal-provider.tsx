"use client";

import { useLinkModal } from "@/lib/store/use-link-modal";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { useEffect, useState } from "react";
import LinkModal from "./link-modal";
import TaskModal from "./task-modal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const taskModal = useTaskModal();
  const linkModal = useLinkModal();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (linkModal.isOpen) return <LinkModal />;

  if (taskModal.isOpen) return <TaskModal />;

  return null;
};

export default ModelProvider;
