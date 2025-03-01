"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ProjectId } from "@/lib/types";
import { useParams } from "next/navigation";

import type { PropsWithChildren } from "react";
import CodeWithCopy from "../code-with-copy";

const FeedbackIntegration = ({ children }: PropsWithChildren) => {
  const { id } = useParams<ProjectId>();

  const code = `await fetch("https://projectify.vigneshguta.me/api/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    projectId: "${id}", // required
    content: "I really enjoy your application", // required
    senderName: "John Deo", // required,
    senderEmail: "test@example.com", // required,
    type: "feature" // optional - "documentation" | "feature" | "issue" | "question" | "idea" | "other" - default is "feature"
    status: "open" // optional - "open" | "reviewed" | "closed" - default is "open"
  }),
});`;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="md:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle>Feedback Integration</SheetTitle>
          <SheetDescription>
            Integrate feedbacks into your project.
          </SheetDescription>
          <div className="space-y-5">
            <p>You can send a request like following:</p>
            <CodeWithCopy code={code} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FeedbackIntegration;
