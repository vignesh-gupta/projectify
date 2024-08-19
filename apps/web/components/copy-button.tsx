"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      size="icon"
      className="hidden group-hover:flex absolute right-4 top-4"
      onClick={copyText}
      disabled={copied}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </Button>
  );
};

export default CopyButton;
