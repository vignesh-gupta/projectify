import { ChangeEvent, ReactNode, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ResponsiveModel, {
  ResponsiveModelDescription,
  ResponsiveModelTitle,
} from "../responsive-model";

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
    <ResponsiveModel
      trigger={children}
      asChild
      open={isOpen}
      onTriggerClick={() => setIsOpen(true)}
      onOpenChange={setIsOpen}
    >
      <ResponsiveModelTitle>{header}</ResponsiveModelTitle>
      <ResponsiveModelDescription>{description}</ResponsiveModelDescription>
      <Input
        value={formValue.title}
        name="title"
        onChange={handleInputChange}
      />

      <Textarea
        value={formValue.description}
        name="description"
        onChange={handleInputChange}
      />
      <Button
        className={buttonVariants({ className: "my-3" })}
        disabled={disabled}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </ResponsiveModel>
  );
};

export default InputModal;
