import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export function getPaymentMethod(paymentMethodId: string) {
  return stripe.paymentMethods.retrieve(paymentMethodId);
}
