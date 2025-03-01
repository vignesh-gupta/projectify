"use client";

import { useState, useRef } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface CodeWithCopyProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
  title?: string;
}

const CodeWithCopy = ({
  code,
  language = "json",
  showLineNumbers = false,
  title,
}: CodeWithCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full overflow-hidden border rounded-lg bg-muted/30 border-border group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 border-border">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="absolute hidden right-2 top-2 group-hover:inline-flex"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
        <pre
          ref={codeRef}
          className={cn(
            "p-4 text-sm overflow-x-auto",
            showLineNumbers && "line-numbers"
          )}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeWithCopy;
