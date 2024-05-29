import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash } from "lucide-react";
import AddLink from "./add-link";
import LinkCard from "./link-card";

type LinkListProps = {
  links: Doc<"links">[] | undefined;
};

const LinkList = ({ links }: LinkListProps) => {
  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Links</h2>
        <AddLink />
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        {!links ? (
          <LinkSkeleton />
        ) : links.length === 0 ? (
          <NoLinks />
        ) : (
          links.map((res) => <LinkCard key={res._id} resource={res} />)
        )}
      </CardContent>
    </Card>
  );
};

export default LinkList;

const NoLinks = () => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 border border-dashed rounded-md bg-foreground/5">
    <h3>There are no resources</h3>
    <AddLink />
  </div>
);

const LinkSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-20 h-4 rounded-md" />
      </div>
      <div>
        <Button variant="ghost" size="icon" disabled>
          <Edit className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost" disabled>
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
