"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createStripeCustomer(cartId: string) {
  const list = await stripe.customers.search({
    query: `metadata["cartId"]:"${cartId}"`,
  });
  const input: Stripe.CustomerCreateParams = {
    metadata: {
      cartId,
    },
  };

  if (list.data.length > 0) {
    return { customerId: list.data[0].id };
  }

  const customer = await stripe.customers.create(input);

  return { customerId: customer.id };
}
