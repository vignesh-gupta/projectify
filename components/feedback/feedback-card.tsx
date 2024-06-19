import { Doc } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import FeedbackActions from "./feedback-actions";
import FeedbackStatus from "./feedback-status";
import FeedbackType from "./feedback-type";

type FeedbackCardProps = {
  feedback: Doc<"feedbacks"> | undefined;
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <Card className="gap-2 rounded-lg border mt-2 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-1">
          <div className="font-medium">{feedback?.senderName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {feedback?.senderEmail}
          </div>
        </div>
        <FeedbackStatus status={feedback?.status} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-gray-500 dark:text-gray-400">
          {feedback?.content}
        </div>
        <FeedbackType type={feedback?.type} />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <FeedbackActions feedback={feedback} />
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
