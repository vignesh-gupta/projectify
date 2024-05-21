import MessageInput from "@/components/messages/message-input";
import MessagesList from "@/components/messages/messages-list";
import { Id } from "@/convex/_generated/dataModel";

type MessagesPageProps = {
  params: {
    id: Id<"projects">;
  };
};

const MessagesPage = ({ params: { id } }: MessagesPageProps) => {
 
  return (
    <div className="min-h-full px-2 space-y-2">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-3">
        Project Chat
      </h3>
      <MessagesList projectId={id} />
      <MessageInput projectId={id} />
    </div>
  );
};

export default MessagesPage;
