import { PRIORITIES } from "@/lib/constants";
import type { TaskPriority as TTaskPriority } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type TaskPriorityProps = {
  priority: TTaskPriority;
  className?: ClassNameValue;
};

const TaskPriority = ({ priority, className }: TaskPriorityProps) => {
  const currPriority = PRIORITIES.find((p) => p.value === priority);

  return (
    <div className={cn("flex items-center", className)}>
      {currPriority?.icon && (
        <currPriority.icon className="mr-2 h-4 w-4 text-muted-foreground hidden md:block" />
      )}
      {currPriority?.label}
    </div>
  );
};

export default TaskPriority;
