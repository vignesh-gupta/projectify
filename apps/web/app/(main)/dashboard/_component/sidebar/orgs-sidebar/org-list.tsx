"use client";

import { useOrganizationList } from "@clerk/nextjs";

import OrganizationItem from "./org-item";

const OrganizationList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((membership) => (
        <OrganizationItem
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
          key={membership.id}
        />
      ))}
    </ul>
  );
};

export default OrganizationList;
