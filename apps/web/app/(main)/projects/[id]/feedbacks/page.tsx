"use client";

import FeedbackCard from "@/components/feedback/feedback-card";
import FeedbackIntegration from "@/components/feedback/feedback-integration";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@repo/backend/convex/_generated/api";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import type { ProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { FileText, Plus } from "lucide-react";
import { useParams } from "next/navigation";

const FeedbacksPage = () => {

  const { id } = useParams<ProjectId>()

  const feedbacks = useQuery(api.feedback.list, { projectId: id });

  const { onOpen } = useFeedbackModal();

  return (
    <>
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

      <ScrollArea className="h-[calc(100dvh-150px)] pr-3 pt-2">
        {!feedbacks || !feedbacks?.length ? (
          <NoFeedbacks />
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-2">
            {feedbacks.map((feedback, index) => (
              <FeedbackCard key={index} feedback={feedback} />
            ))}
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default FeedbacksPage;

const NoFeedbacks = () => {
  const { onOpen } = useFeedbackModal();

  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-secondary py-12 rounded-xl">
      <h2 className="font-bold text-lg">There are no feedbacks yet!</h2>
      <Button onClick={() => onOpen()}>Add a feedback</Button>
    </div>
  );
};
