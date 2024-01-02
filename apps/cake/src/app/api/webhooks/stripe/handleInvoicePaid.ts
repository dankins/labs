import {
  db,
  invitations,
  members,
  passports,
  brands,
  passes,
} from "@danklabs/cake/db";
import { createBrandPass } from "@danklabs/cake/services/admin-service";
import { Stripe } from "stripe";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);
const NEW_MEMBER_INVITATIONS = 5;
const NEW_MEMBER_MAX_REDEMPTIONS = 1;

export async function handleInvoicePaid(event: Stripe.InvoicePaidEvent) {
  console.log("invoice paid", event);

  // retrieve the invitationId from the subscription
  const subscriptionMetadata = event.data.object.subscription_details?.metadata;
  if (!subscriptionMetadata) {
    console.error("received invoice paid event with no subscription metadata");
    return;
  }

  await db.transaction(async (tx) => {
    // get the invitation from the database
    const invitationId = subscriptionMetadata["invitationId"];
    const clerkUserId = subscriptionMetadata["userId"];
    const selectedBrandsString = subscriptionMetadata["selectedBrands"];

    const invitation = await tx.query.invitations.findFirst({
      where: eq(invitations.id, invitationId),
    });

    // something went wrong if we couldn't find the invitation
    if (!invitation) {
      console.error("could not find invitation for subscription", invitationId);
      return;
    }

    // increment the number of redemptions on the invite
    await tx
      .update(invitations)
      .set({ redemptions: (invitation.redemptions || 0) + 1 })
      .where(eq(invitations.id, invitationId));

    // create the member
    type NewMember = typeof members.$inferInsert;
    const newMember: NewMember = {
      iam: clerkUserId,
    };
    const insertedMember = (
      await tx.insert(members).values(newMember).returning()
    )[0];

    // create invitations for the member
    type NewInvitation = typeof invitations.$inferInsert;
    const newInvitatations: NewInvitation[] = new Array(NEW_MEMBER_INVITATIONS)
      .fill(undefined)
      .map((_) => ({
        memberId: insertedMember.id,
        redemptions: 0,
        maxRedemptions: NEW_MEMBER_MAX_REDEMPTIONS,
      }));
    await tx.insert(invitations).values(newInvitatations);

    // create the passport
    const passport = (
      await tx
        .insert(passports)
        .values({
          memberId: insertedMember.id,
        })
        .returning()
    )[0];

    // create passes based selected brands
    const selectedBrands = validateSelectedBrands(selectedBrandsString);
    const createBrandPromises = selectedBrands.map((selectedBrand) =>
      createBrandPass(tx, passport.id, selectedBrand)
    );
    await Promise.all(createBrandPromises);
  });
}

function validateSelectedBrands(selectedBrandsString: string): string[] {
  if (
    !selectedBrandsString ||
    selectedBrandsString.length === 0 ||
    selectedBrandsString === ""
  ) {
    return [];
  }

  return selectedBrandsString.split(",");
}
