import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { member } from "../../members/member";
import { invitations } from "../../invitations";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createCustomer(iam: string, invitationId: string) {
  const input: Stripe.CustomerCreateParams = {
    metadata: {
      iam,
    },
  };

  const invitation = await invitations.getInvitation.cached(invitationId);
  if (!invitation) {
    throw new Error("invitation not found");
  }

  const customer = await stripe.customers.create(input);

  const dbMember = await db.query.members.findFirst({
    where: eq(members.iam, iam),
  });

  let maxCollectionItems = member.DEFAULT_MAX_COLLECTION_ITEMS;
  if (invitation.collectionItemsGranted) {
    maxCollectionItems = invitation.collectionItemsGranted;
  } else if (invitation.campaign?.collectionItemsGranted) {
    maxCollectionItems = invitation.campaign.collectionItemsGranted;
  }

  if (!dbMember) {
    await member.create(iam, {
      stripeCustomerId: customer.id,
      invitationId,
      maxCollectionItems,
    });
  } else {
    await member.update(iam, {
      stripeCustomerId: customer.id,
      invitationId,
      maxCollectionItems,
    });
  }

  console.log("created customer", iam, customer.id);
  return customer.id;
}
