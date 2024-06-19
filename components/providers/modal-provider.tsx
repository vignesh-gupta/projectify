"use client";

import FileModal from "@/components/modals/file-model";
import LinkModal from "@/components/modals/link-modal";
import TaskModal from "@/components/modals/task-modal";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import { useFileModal } from "@/lib/store/use-file-modal";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { useEffect, useState } from "react";
import FeedbackModal from "../modals/feedback-modal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const taskModal = useTaskModal();
  const linkModal = useLinkModal();
  const fileModal = useFileModal();
  const feedbackModal = useFeedbackModal();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  if (fileModal.isOpen) return <FileModal />;

  if (linkModal.isOpen) return <LinkModal />;

  if (taskModal.isOpen) return <TaskModal />;

  if (feedbackModal.isOpen) return <FeedbackModal />;

  return null;
};

export default ModelProvider;
