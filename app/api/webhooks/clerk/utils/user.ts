import { api } from "@/convex/_generated/api";
import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

type User = {
  clerkId: string;
  email: string;
  firstName: string;
  imageUrl: string;
};

export const createUser = async (userJson: UserJSON) => {
  const user = mapUserJsonToUser(userJson);
  await fetchMutation(api.user.create, user);
};

export const updateUser = async (userJson: UserJSON) => {
  const user = mapUserJsonToUser(userJson);
  await fetchMutation(api.user.update, user);
};

export const deleteUser = async (userJson: DeletedObjectJSON) => {
  const clerkId = userJson.id;
  if (!clerkId) return;

  await fetchMutation(api.user.remove, { clerkId });
};

function mapUserJsonToUser(userJson: UserJSON): User {
  return {
    clerkId: userJson.id,
    email:
      userJson.email_addresses.find(
        (email) => email.id === userJson.primary_email_address_id
      )?.email_address || `${userJson.id}@nothanks.com`,
    firstName: userJson.first_name,
    imageUrl: userJson.image_url,
  };
}
