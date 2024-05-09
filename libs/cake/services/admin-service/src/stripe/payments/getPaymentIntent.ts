import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function getPaymentIntent(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["invoice"],
  });
  return paymentIntent;
}
