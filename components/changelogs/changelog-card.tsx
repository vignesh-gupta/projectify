import { CalendarDays, Clock } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import MDXEditor from "../md/mdx-editor";
import { Card, CardContent, CardHeader } from "../ui/card";

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
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Badge>v1.2.0</Badge>
          <h4 className="font-semibold">New features and improvements</h4>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">June 30, 2024</span>
        </div>
      </CardHeader>
      <CardContent>
        <MDXEditor content={content} readonly />
      </CardContent>
    </Card>
  );
};

export default ChangelogCard;
