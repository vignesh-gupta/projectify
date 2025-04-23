import MessageInput from "@/components/messages/message-input";
import { Skeleton } from "@/components/ui/skeleton";
import type { PagePropsWithProjectId } from "@/lib/types";
import { lazy, Suspense } from "react";

const MessagesList = lazy(() => import("@/components/messages/messages-list"));

const MessagesPage = async ({ params }: PagePropsWithProjectId) => {
  const { id } = await params;
  return (
    <div className="min-h-full px-2 space-y-2">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-3">
        Project Chat
      </h3>
      <Suspense fallback={<Skeleton className="h-[calc(100dvh-150px)]" />}>
        <MessagesList projectId={id} />
      </Suspense>
      <MessageInput projectId={id} />
    </div>
  );
};

export default MessagesPage;
