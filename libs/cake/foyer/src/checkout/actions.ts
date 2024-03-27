"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createStripeCustomer(iam: string) {
  const input: Stripe.CustomerCreateParams = {
    metadata: {
      iam,
    },
  };

  const customer = await stripe.customers.create(input);

  return { customerId: customer.id };
}
