import { api } from "@/convex/_generated/api";
import { DeletedObjectJSON, OrganizationJSON } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

type Organization = {
  clerkId: string;
  name: string;
  imageUrl: string;
  createdBy: string;
};

export const createOrg = async (orgJson: OrganizationJSON) => {
  const org = mapOrgJsonToOrg(orgJson);

  await fetchMutation(api.team.create, org);
};

export const updateOrg = async (orgJson: OrganizationJSON) => {
  const org = mapOrgJsonToOrg(orgJson);

  await fetchMutation(api.team.update, {
    imageUrl: org.imageUrl,
    name: org.name,
    clerkId: org.clerkId,
  });
};

export const deleteOrg = async (orgJson: DeletedObjectJSON) => {
  await fetchMutation(api.team.remove, { clerkId: orgJson.id || "" });
};

function mapOrgJsonToOrg(orgJson: OrganizationJSON): Organization {
  return {
    clerkId: orgJson.id,
    name: orgJson.name,
    imageUrl: orgJson.image_url,
    createdBy: orgJson.created_by,
  };
}
