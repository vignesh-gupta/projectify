import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type ReactNode } from "react";
import ResponsiveModel, { ResponsiveModelTitle } from "../responsive-model";

type LinkModalProps = {
  value?: string;
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSave: (link: string) => void;
};

const LinkModal = ({ value, children, onSave }: LinkModalProps) => {
  const [link, setLink] = useState(value || "");

  const onLinkSave = (link: string) => {
    onSave(link);
    setLink("");
  };

  return (
    <ResponsiveModel className="sm:max-w-md" trigger={children} asChild>
      <ResponsiveModelTitle>Enter destination</ResponsiveModelTitle>
      <div className="mb-3">
        <Label htmlFor="link" className="sr-only">
          Link
        </Label>
        <Input
          id="link"
          value={link || ""}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <DialogClose asChild>
        <Button type="button" onClick={() => onLinkSave(link)}>
          Save
        </Button>
      </DialogClose>
    </ResponsiveModel>
  );
};

export default LinkModal;
