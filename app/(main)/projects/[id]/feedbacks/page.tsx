"use client";

import FeedbackCard from "@/components/feedback/feedback-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { Plus } from "lucide-react";

type FeedbacksPageProps = {
  params: {
    id: Id<"projects">;
  };
};

const FeedbacksPage = ({ params }: FeedbacksPageProps) => {
  const feedbacks = useQuery(api.feedback.list, { projectId: params.id });

  // const feedbacks = Array.from({ length: 121 }).fill(0);

  const { mutate: addFeedback, isPending } = useApiMutation(
    api.feedback.create
  );

  // if (!feedbacks?.length) return <NoFeedbacks />;

  const handleAddFeedback = () => {
    addFeedback({
      content: "This is a feedback",
      projectId: params.id,
      type: "issue",
      senderEmail: "abc@xyz.com",
      senderName: "John Doe",
      status: "open",
    });
  };

  return (
    <>
      <div className="flex justify-between gap-2 border-b pb-2">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
          Feedbacks
        </h3>

        <Button onClick={handleAddFeedback}>
          <Plus className="mr-2" /> Add Feedback
        </Button>
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

const NoFeedbacks = () => (
  <div className="flex justify-center items-center flex-col gap-4 bg-secondary py-12 rounded-xl">
    <h2 className="font-bold text-lg">There are no feedbacks yet!</h2>
    <Button>Add a feedback</Button>
  </div>
);
