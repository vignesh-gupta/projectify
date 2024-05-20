"use client";

import React, { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";

const MessagesList = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  return (
    <ScrollArea className="h-[calc(100dvh-200px)] rounded-md border">
      <div className="h-[600dvh]" ref={scrollRef}></div>
    </ScrollArea>
  );
};

export default MessagesList;
