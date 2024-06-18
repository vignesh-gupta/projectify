import type { FeedbackStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const FeedbackStatus = ({ status }: { status: FeedbackStatus | undefined }) => {
  if (!status) return null;

  return (
    <Badge
      className={cn("capitalize rounded-md ", {
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400":
          status === "open",
        "bg-accent text-accent-foreground": status === "reviewed",
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400":
          status === "closed",
      })}
    >
      {status}
    </Badge>
  );
};

export default FeedbackStatus;
