import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import MDXEditor from "../md/mdx-editor";
import ChangelogActions from "./changelog-actions";

type ChangelogCardProps = {
  changelog: Doc<"changeLogs">;
};

const ChangelogCard = ({ changelog }: ChangelogCardProps) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-3 flex-row justify-between items-center">
        <div className="*:gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center mb-2">
            <Badge className="w-fit">v{changelog.version}</Badge>
            <h4 className="font-semibold">{changelog.title}</h4>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(changelog.date, "PPP")}
            </span>
          </div>
        </div>

        <ChangelogActions changelog={changelog} />
      </CardHeader>
      <CardContent>
        <MDXEditor content={changelog.changes} readonly />
      </CardContent>
    </Card>
  );
};

export default ChangelogCard;
