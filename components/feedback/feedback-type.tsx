import type { FeedbackType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FeedbackType = ({ type }: { type: FeedbackType | undefined }) => {
  if (!type) return null;

  return (
    <Badge
      className={cn("capitalize", {
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400":
          type === "feature" || type === "documentation",
        "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400": type === "issue",
        "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400": type === "question" || type === "idea",
      })}
    >
      {type}
    </Badge>
  );
};

export default FeedbackType;
