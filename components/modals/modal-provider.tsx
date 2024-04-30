"use client";

import { useTaskModal } from "@/lib/store/use-task-modal";
import { useEffect, useState } from "react";
import TaskModal from "./task-modal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const taskModal = useTaskModal();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (!taskModal.isOpen) return null;

  if (taskModal.isOpen) return <TaskModal />;
};

export default ModelProvider;
