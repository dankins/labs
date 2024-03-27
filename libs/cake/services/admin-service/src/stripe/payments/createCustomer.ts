import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { member } from "../../members/member";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createCustomer(iam: string, invitationId: string) {
  const input: Stripe.CustomerCreateParams = {
    metadata: {
      iam,
    },
  };

  const customer = await stripe.customers.create(input);

  const dbMember = await db.query.members.findFirst({
    where: eq(members.iam, iam),
  });
  if (!dbMember) {
    await member.create(iam, { stripeCustomerId: customer.id, invitationId });
  } else {
    await db
      .update(members)
      .set({ stripeCustomerId: customer.id, updatedAt: new Date() })
      .where(eq(members.iam, iam))
      .execute();
  }

  member.clearCache(iam);

  console.log("created customer", iam, customer.id);
  return customer.id;
}
