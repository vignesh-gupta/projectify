import { Card, CardFooter, CardHeader } from "../ui/card";

const FeedbackCard = () => {
  return (
    <Card className="gap-2 rounded-lg border mt-2 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-1">
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            john@example.com
          </div>
        </div>
        <div className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Open
        </div>
      </CardHeader> 
      <CardFooter className="flex flex-col items-start gap-2">
        <p className="text-muted-foreground">
          The login page is not working properly. I can&apos;t log in with my
          credentials.
        </p>
        <div className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          Bug Report
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
