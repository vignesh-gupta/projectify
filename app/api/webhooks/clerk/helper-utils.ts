import { api } from "@/convex/_generated/api";
import { UserJSON } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";

export const createUser = async (userJson: UserJSON) => {
  const user = {
    clerkId: userJson.id,
    email:
      userJson.email_addresses.find(
        (email) => email.id === userJson.primary_email_address_id
      )?.email_address || `${userJson.id}@nothanks.com`,
    firstName: userJson.first_name,
    imageUrl: userJson.image_url,
  };

  const res = fetchMutation(api.user.create, user);
};
