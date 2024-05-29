import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddLink from "./add-link";
import { Doc } from "@/convex/_generated/dataModel";
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
        {links && links.length > 0 ? (
          links?.map((res) => <LinkCard key={res._id} resource={res} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-48 gap-3 border border-dashed rounded-md bg-foreground/5">
            <h3 className="">There are no resources</h3>
            <AddLink />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkList;
