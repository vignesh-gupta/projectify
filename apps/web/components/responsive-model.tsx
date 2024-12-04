import React from "react";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { cn } from "@/lib/utils";

type ResponsiveModelProps = {
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  asChild?: boolean;
  onTriggerClick?: () => void;
};

const ResponsiveModel = ({
  children,
  onOpenChange,
  open,
  className,
  asChild,
  trigger,
  onTriggerClick,
}: ResponsiveModelProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  const handleOpenChange = (open: boolean) => onOpenChange?.(open);

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {trigger && (
          <DialogTrigger asChild={asChild} onClick={onTriggerClick}>
            {trigger}
          </DialogTrigger>
        )}
        <DialogContent className={className}>{children}</DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      {trigger && <DrawerTrigger asChild={asChild}>{trigger}</DrawerTrigger>}
      <DrawerContent
        className={cn(
          "overflow-y-auto hide-scrollbar max-h-[85vh] px-5 pb-5",
          className
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;

export const ResponsiveModelTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const className = "my-2 truncate";
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return <DialogTitle className={className}>{children}</DialogTitle>;
  }

  return <DrawerTitle className={className}>{children}</DrawerTitle>;
};
export const ResponsiveModelDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const className = "my-2";
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <DialogDescription className={className}>{children}</DialogDescription>
    );
  }

  return (
    <DrawerDescription className={className}>{children}</DrawerDescription>
  );
};
