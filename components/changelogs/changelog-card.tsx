import { CalendarDays } from "lucide-react";
import MDXEditor from "../md/mdx-editor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";


type ChangelogCardProps = {
  content: string;
  version: string;
  date: string;
  title: string;
};

const ChangelogCard = ({
  content,
  date,
  title,
  version,
}: ChangelogCardProps) => {
  return (
    <Card>
      <CardHeader className="md:flex-row md:items-center md:justify-between gap-2 pb-3">
        <div className="flex gap-2 flex-col sm:flex-row">
          <Badge className="w-fit">v{version}</Badge>
          <h4 className="font-semibold pb-1">{title}</h4>
        </div>
        <div className="flex items-center gap-2 ite">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{format(date, "PPP")}</span>
        </div>
      </CardHeader>
      <CardContent>
        <MDXEditor content={content} readonly />
      </CardContent>
    </Card>
  );
};

export default ChangelogCard;
