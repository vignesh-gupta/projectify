import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import MDXEditor from "../md/mdx-editor";
import { Switch } from "../ui/switch";

type ChangelogCardProps = {
  content: string;
  version: string;
  date: string;
  title: string;
  isPublished: boolean;
  id: Id<"changeLogs">;
};

const ChangelogCard = ({
  content,
  date,
  title,
  version,
  isPublished,
  id,
}: ChangelogCardProps) => {
  const { mutate: togglePublish, isPending } = useApiMutation(
    api.changelog.update
  );

  return (
    <Card className="relative">
      <CardHeader className="pb-3 flex-row justify-between items-center">
        <div className="*:gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center mb-2">
            <Badge className="w-fit">v{version}</Badge>
            <h4 className="font-semibold">{title}</h4>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(date, "PPP")}
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isPublished ? "Public" : "Private"}
          </span>
          <Switch
            checked={isPublished}
            onCheckedChange={(value) =>
              togglePublish({ _id: id, isPublished: value })
            }
            disabled={isPending}
          />
        </div>
      </CardHeader>
      <CardContent>
        <MDXEditor content={content} readonly />
      </CardContent>
    </Card>
  );
};

export default ChangelogCard;
