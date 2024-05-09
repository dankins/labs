import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function getOrCreateCustomer(cartId: string): Promise<string> {
  const list = await stripe.customers.search({
    query: `metadata["cartId"]:"${cartId}"`,
  });
  if (list.data.length > 0) {
    return list.data[0].id;
  }

  const input: Stripe.CustomerCreateParams = {
    metadata: {
      cartId,
    },
  };
  const customer = await stripe.customers.create(input);

  return customer.id;
}
