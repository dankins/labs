import Stripe from "stripe";

export async function getSubscriptionByCustomerId(
  customerId: string
): Promise<Stripe.Subscription | undefined> {
  const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    expand: ["data.latest_invoice.payment_intent"],
    // additional filters can be applied if necessary to find the specific subscription
  });

  if (subscriptions.data && subscriptions.data.length > 0) {
    return subscriptions.data[0];
  }

  return undefined;
}
