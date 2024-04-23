import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "./utils/user";
import { createOrg, deleteOrg, updateOrg } from "./utils/organization";
import {
  addMember,
  removeMember,
  updateMemberRole,
} from "./utils/team-membership";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  try {
    switch (eventType) {
      // User events
      case "user.created":
        await createUser(evt.data);
        break;

      case "user.updated":
        await updateUser(evt.data);
        break;

      case "user.deleted":
        await deleteUser(evt.data);
        break;

      // Organization events
      case "organization.created":
        await createOrg(evt.data);
        break;

      case "organization.updated":
        updateOrg(evt.data);
        break;

      case "organization.deleted":
        await deleteOrg(evt.data);
        break;

      // Organization membership events
      case "organizationMembership.created":
        await addMember(evt.data);
        break;

      case "organizationMembership.updated":
        await updateMemberRole(evt.data);
        break;

      case "organizationMembership.deleted":
        await removeMember(evt.data);
        break;

      default:
        console.log("Unhandled event type:", eventType);
        break;
    }

    return new Response("", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
