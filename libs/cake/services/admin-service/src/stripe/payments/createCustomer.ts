import Stripe from "stripe";
import { member } from "../../members/member";
import { invitations } from "../../invitations";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createCustomer(iam: string, invitationId: string) {
  console.log("creating customer", iam, invitationId);
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

  await member.update(iam, {
    stripeCustomerId: customer.id,
  });

  console.log("created customer", iam, customer.id);
  return customer.id;
}
