import type { FeedbackStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const FeedbackStatus = ({ status }: { status: FeedbackStatus | undefined }) => {
  if (!status) return null;

  return (
    <Badge
      className={cn("capitalize rounded-md ", {
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400":
          status === "open",
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400":
          status === "reviewed",
        "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400":
          status === "closed",
      })}
    >
      {status}
    </Badge>
  );
};

export default FeedbackStatus;
