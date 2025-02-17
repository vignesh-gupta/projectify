import FeedbacksPageHeader from "@/components/feedback/feedback-header";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const FeedbacksList = lazy(() => import("@/components/feedback/feedback-list"));

const FeedbacksPage = () => {
  return (
    <>
      <FeedbacksPageHeader />
      <Suspense fallback={<Skeleton className="h-[calc(100dvh-150px)]" />}>
        <FeedbacksList />
      </Suspense>
    </>
  );
};

export default FeedbacksPage;
