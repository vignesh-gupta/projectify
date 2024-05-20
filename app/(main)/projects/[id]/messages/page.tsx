import MessageInput from "@/components/messages/message-input";
import MessagesList from "@/components/messages/messages-list";
import React from "react";

const MessagesPage = () => {
  return (
    <div className="min-h-full px-2 space-y-2">
      <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-3">
        Project Chat
      </h3>
      <MessagesList />
      <MessageInput />
    </div>
  );
};

export default MessagesPage;
