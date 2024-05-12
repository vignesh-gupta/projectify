"use client";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

import Hint from "@/components/hint";
import { cn } from "@/lib/utils";

type OrganizationItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const OrganizationItem = ({ id, imageUrl, name }: OrganizationItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square ">
      <Hint align="start" side="right" sideOffset={15} label={name}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          sizes="50px"
          onClick={onClick}
          className={cn(
            "cursor-pointer opacity-75 hover:opacity-100 transition-all rounded-md",
            isActive && "opacity-100 rounded-full"
          )}
        />
      </Hint>
    </div>
  );
};

export default OrganizationItem;
