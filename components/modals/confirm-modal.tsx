import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

type ConfirmModalProps = {
  children: ReactNode;
  disabled?: boolean;
  onConfirm: () => Promise<any>;
  header: string;
  description?: string;
  toastMessage?: string;
};

const ConfirmModal = ({
  children,
  description = "The action cannot be undone. Are you sure you want to proceed?",
  disabled,
  header,
  onConfirm,
  toastMessage = "Action completed successfully.",
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm()
      .then(() => toast.success(toastMessage))
      .catch(() => toast.error("Failed to perform action. Please try again."));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="truncate">{header}</AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={disabled}
            onClick={handleConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
