"use client";

import FeedbackCard from "@/components/feedback/feedback-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@repo/backend/convex/_generated/api";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import type { ProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const FeedbacksList = () => {
  const { id } = useParams<ProjectId>();

  const feedbacks = useQuery(api.feedback.list, { projectId: id });

  return (
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
  );
};

export default FeedbacksList;

const NoFeedbacks = () => {
  const { onOpen } = useFeedbackModal();

  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-secondary py-12 rounded-xl">
      <h2 className="font-bold text-lg">There are no feedbacks yet!</h2>
      <Button onClick={() => onOpen()}>Add a feedback</Button>
    </div>
  );
};
