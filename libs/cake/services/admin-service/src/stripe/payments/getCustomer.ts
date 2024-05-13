import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function getCustomer(cartId: string): Promise<Stripe.Customer> {
  console.log("search for customer", cartId);
  const list = await stripe.customers.search({
    query: `metadata["cartId"]:"${cartId}"`,
    expand: ["data"],
  });
  if (list.data.length > 0) {
    return list.data[0];
  }
  throw new Error("no customer");
}
