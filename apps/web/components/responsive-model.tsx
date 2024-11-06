import React from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { cn } from "@/lib/utils";

type ResponsiveModelProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const ResponsiveModel = ({
  children,
  onOpenChange,
  open,
  className,
}: ResponsiveModelProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  console.log(open);

  const handleOpenChange = (open: boolean) => {
    console.log("open", open);

    onOpenChange(open);
  };

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className={className}>{children}</DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
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
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return <DialogTitle>{children}</DialogTitle>;
  }

  return <DrawerTitle>{children}</DrawerTitle>;
};
