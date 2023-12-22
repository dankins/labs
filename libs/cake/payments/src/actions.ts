"use server";
import z from "zod";
import { auth, clerkClient } from "@clerk/nextjs";
import {
  AddressParam,
  StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
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
export async function createSubscription(
  priceId: string,
  metadata: any,
  customerId: string
) {
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
    metadata,
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

export async function createStripeCustomer(
  email: string | undefined,
  billing: StripeAddressElementChangeEvent["value"],
  shipping?: StripeAddressElementChangeEvent["value"]
) {
  if (!email) {
    throw new Error("email or name not supplied");
  }
  const input: Stripe.CustomerCreateParams = {
    email,
    name: billing.name,
    address: billing.address as AddressParam,
  };
  if (shipping) {
    input.shipping = {
      name: shipping.name,
      address: shipping.address as AddressParam,
    };
  }

  const customer = await stripe.customers.create(input);

  return { customerId: customer.id };
}

export async function getCustomer(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

export async function checkSubscriptionStatus(subscriptionId: string): Promise<{
  status: "incomplete" | "pending" | "complete";
}> {
  const userAuth = auth();
  console.log("checking subscription", subscriptionId);
  const sub = await stripe.subscriptions.retrieve(subscriptionId);

  if (!userAuth.userId) {
    return { status: "incomplete" };
  }

  if (sub.status === "active") {
    const user = await clerkClient.users.getUser(userAuth.userId);
    console.log("subscription is active", user.privateMetadata);
    if (
      !user.privateMetadata ||
      !user.privateMetadata["membershipStatus"] ||
      !user.privateMetadata["subscriptionId"]
    ) {
      const privateMetadata = user.privateMetadata;
      user.privateMetadata["membershipStatus"] = "active";
      user.privateMetadata["subscriptionId"] = subscriptionId;
      await clerkClient.users.updateUserMetadata(userAuth.userId, {
        privateMetadata: user.privateMetadata,
      });

      console.log("updated user metadata", user.privateMetadata);
      return { status: "complete" };
    }
    if (user.privateMetadata["membershipStatus"] === "active") {
      console.log("status is already complete, not doing anything");
      return { status: "complete" };
    }
  }

  // const result = await stripe.invoices.search({
  //   query: `payment_intent:'${paymentIntentId}'`,
  // });
  // console.log("invoice", result);

  return { status: "pending" };
}

export async function createAccount(
  formData: FormData
): Promise<
  | { error?: undefined; userId: string; ticket: string }
  | { error: "ACCOUNT_EXISTS" }
> {
  const form = Object.fromEntries(formData.entries());
  const createAccountSchema = z.object({
    email: z.string(),
  });
  const data = createAccountSchema.parse(form);

  const request: Parameters<typeof clerkClient.users.createUser>[0] = {
    externalId: data.email.toLowerCase(),
    emailAddress: [data.email],
  };

  // clerkClient.users.getUser()
  const users = await clerkClient.users.getUserList({
    emailAddress: [data.email],
  });

  if (users.length > 0) {
    return { error: "ACCOUNT_EXISTS" };
  }
  const result = await clerkClient.users.createUser(request);
  const ticket = await clerkClient.signInTokens.createSignInToken({
    userId: result.id,
    expiresInSeconds: 60 * 60,
  });

  return { userId: result.id, ticket: ticket.token };
}
