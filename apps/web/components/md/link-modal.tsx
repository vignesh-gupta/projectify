import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type ReactNode } from "react";

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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter destination</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            value={link || ""}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <DialogFooter className="justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={() => onLinkSave(link)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;
