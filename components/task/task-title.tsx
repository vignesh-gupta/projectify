import { LABELS } from "@/lib/constants";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskType } from "@/lib/types";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type TaskTitleProps = {
  type: TaskType;
  title: string;
  className?: ClassNameValue;
};

const TaskTitle = ({ title, type, className }: TaskTitleProps) => {
  const label = LABELS.find((label) => label.value === type);

  return (
    <div className={cn("flex space-x-2 md:w-[300px]", className)}>
      {label && (
        <Badge className="hidden md:flex" variant={label.variant}>
          {label.label}
        </Badge>
      )}
      <span className="truncate font-medium">{title}</span>
    </div>
  );
};

export default TaskTitle;
