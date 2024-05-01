export const DASHBOARD_ROUTE = "/dashboard";

export const UNASSIGNED_USER = {
  label: "Unassigned",
  value: "jd75ssjrcgeeh74f89vkt3th896qywhp",
};

export const PROJECTS_STAGES = ["development", "stale", "archived", "live"];

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

export type TLable = {
  value: string;
  label: string;
  variant: "destructive" | "default" | "outline" | "secondary";
};

export type TOptions = {
  value: string;
  label: string;
  icon?: LucideIcon;
}[];

export const LABELS: TLable[] = [
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

export const STATUSES: TOptions = [
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

export const PRIORITIES: TOptions = [
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
