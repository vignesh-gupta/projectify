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
        "bg-destructive text-destructive-foreground": type === "issue",
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400": type === "question" || type === "idea",
      })}
    >
      {type}
    </Badge>
  );
};

export default FeedbackType;
