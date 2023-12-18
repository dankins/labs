"use server";
import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function createPaymentIntent() {
  const session = await stripe.paymentIntents.create({
    amount: 100 * 100,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {},
  });

  if (!session.client_secret) {
    throw new Error("no client_secret");
  }

  return { clientSecret: session.client_secret };
}

// https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=elements#create-customer
export async function createSubscription(priceId: string, customerId: string) {
  // Create the subscription. Note we're expanding the Subscription's
  // latest invoice and that invoice's payment_intent
  // so we can pass it to the front end to confirm the payment
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  if (!subscription.latest_invoice) {
    throw new Error("invoice not provided on subscription");
  } else if (typeof subscription.latest_invoice === "string") {
    throw new Error("latest_invoice object not available");
  }

  const invoice = subscription.latest_invoice as Stripe.Invoice;
  if (!invoice.payment_intent) {
    throw new Error("payment_intent object not available");
  } else if (typeof invoice.payment_intent === "string") {
    throw new Error("payment_intent object not available");
  }
  if (!invoice.payment_intent!.client_secret) {
    throw new Error("no client secret");
  }

  const clientSecret = invoice.payment_intent!.client_secret;

  return {
    subscriptionId: subscription.id,
    clientSecret: clientSecret,
  };
}

export async function createCustomer(
  email: string,
  name: string,
  billing: Stripe.AddressParam,
  shipping?: Stripe.ShippingAddressParam
) {
  const input: Stripe.CustomerCreateParams = {
    email,
    name,
    address: billing,
  };
  if (shipping) {
    input.shipping = {
      name,
      address: shipping,
    };
  }

  const customer = await stripe.customers.create(input);

  return { customerId: customer.id };
}
