import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle,
  CircleHelp,
  CircleIcon,
  CircleX,
  LucideIcon,
  Timer,
} from "lucide-react";

type TLables = {
  value: string;
  label: string;
  variant: "destructive" | "default" | "outline" | "secondary";
}[];

type TOptions = {
  value: string;
  label: string;
  icon: LucideIcon;
}[];

export const labels: TLables = [
  {
    value: "bug",
    label: "Bug",
    variant: "destructive",
  },
  {
    value: "feature",
    label: "Feat",
    variant: "default",
  },
  {
    value: "documentation",
    label: "Docs",
    variant: "outline",
  },
];

export const statuses: TOptions = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
];

export const priorities: TOptions = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
