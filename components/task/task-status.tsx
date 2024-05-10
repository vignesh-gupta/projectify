import { STATUSES } from "@/lib/constants";
import { TaskStatus as TStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

type TaskStatusProps = {
  status: TStatus;
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
