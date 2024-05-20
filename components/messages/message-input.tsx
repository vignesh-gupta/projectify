import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessageInput = () => {
  return (
    <div className="flex gap-x-2 ">
      <Input placeholder="Type a message..." />
      <Button>Send</Button>
    </div>
  );
};

export default MessageInput;
