"use client";

import FeedbackIntegration from "@/components/feedback/feedback-integration";
import { Button } from "@/components/ui/button";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import { FileText, Plus } from "lucide-react";

const FeedbacksPageHeader = () => {
  const { onOpen } = useFeedbackModal();

  return (
    <div className="flex justify-between gap-2 border-b pb-2">
      <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">Feedbacks</h3>

      <div className="flex items-center gap-2">
        <Button onClick={() => onOpen()}>
          <Plus className="mr-2" /> Add Feedback
        </Button>

        <FeedbackIntegration>
          <Button variant="outline" className="hidden sm:flex">
            <FileText className="w-4 h-4 mr-2" /> Feedback Integration
          </Button>
        </FeedbackIntegration>
      </div>
    </div>
  );
};

export default FeedbacksPageHeader;
