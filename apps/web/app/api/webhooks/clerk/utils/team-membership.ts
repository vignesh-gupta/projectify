import { api } from "@/convex/_generated/api";
import { OrganizationMembershipJSON } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

type OrganizationMembership = {
  orgId: string;
  userId: string;
  userRole: string;
};

export const addMember = async (memJSON: OrganizationMembershipJSON) => {
  const mem = mapMemJsonToMem(memJSON);

  await fetchMutation(api.team_membership.addMember, mem);
};

export const updateMemberRole = async (memJSON: OrganizationMembershipJSON) => {
  const mem = mapMemJsonToMem(memJSON);

  await fetchMutation(api.team_membership.updateMemberRole, mem);
};

export const removeMember = async (memJSON: OrganizationMembershipJSON) => {
  const mem = mapMemJsonToMem(memJSON);

  await fetchMutation(api.team_membership.removeMember, {
    orgId: mem.orgId,
    userId: mem.userId,
  });
};

function mapMemJsonToMem(
  memJson: OrganizationMembershipJSON
): OrganizationMembership {
  return {
    orgId: memJson.organization.id,
    userId: memJson.public_user_data.user_id,
    userRole: memJson.role,
  };
}
