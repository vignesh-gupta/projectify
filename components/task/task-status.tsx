import { STATUSES } from "@/lib/constants";
import type { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type TaskStatusProps = {
  status: TaskStatus;
  className?: ClassNameValue;
};

const TaskStatus = ({ status, className }: TaskStatusProps) => {
  const currStatus = STATUSES.find((s) => s.value === status);

  return (
    <div className={cn("flex items-center", className)}>
      {currStatus?.icon && (
        <currStatus.icon className="mr-2 h-4 w-4 text-muted-foreground  hidden md:block" />
      )}
      {currStatus?.label}
    </div>
  );
};

export default TaskStatus;
