import { ChangeEvent, ReactNode, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type InputModalProps = {
  children: ReactNode;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (title?: string, description?: string) => Promise<any>;
  header: string;
  description?: string;
  toastMessage?: string;
};

const InputModal = ({
  children,
  header,
  onConfirm,
  description,
  disabled,
  toastMessage,
}: InputModalProps) => {
  const [formValue, setFormValue] = useState({
    title: "New Project",
    description: "Planning to do something awesome!",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm(formValue.title, formValue.description)
      .then(() => {
        toast.success(toastMessage);
      })
      .catch(() => {
        toast.error("Failed to perform action. Please try again.");
      })
      .finally(() => setIsOpen(false));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="truncate">{header}</DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <Input
          value={formValue.title}
          name="title"
          onChange={handleInputChange}
        />

        <Textarea
          value={formValue.description}
          name="description"
          onChange={handleInputChange}
        ></Textarea>
        <DialogFooter>
          <Button
            className={buttonVariants()}
            disabled={disabled}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InputModal;
