import { CalendarDays, Clock } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import MDXEditor from "../md/mdx-editor";

const ChangelogCard = () => {
  const content = `
  <ul>
            <li>Added new project management features</li>
            <li>Improved task scheduling and tracking</li>
            <li>Enhanced team collaboration tools</li>
            <li>Fixed several minor bugs</li>
          </ul>
  `;

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-md border bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge>v1.2.0</Badge>
            <span className="text-sm font-medium">
              New features and improvements
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">June 30, 2024</span>
          </div>
        </div>
        <MDXEditor content={content} readonly />
      </div>
    </div>
  );
};

export default ChangelogCard;
