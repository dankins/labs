"use server";
import z from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  AddressParam,
  StripeAddressElementChangeEvent,
} from "@stripe/stripe-js";
import Stripe from "stripe";
import { SubscriptionReturnType } from "./types";
import { v4 as uuid } from "uuid";
import { members } from "@danklabs/cake/services/admin-service";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

// https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=elements#create-customer
export async function createSubscription(
  cartId: string,
  priceId: string,
  coupon: string | undefined,
  metadata: any,
  customerId: string
): Promise<SubscriptionReturnType> {
  console.log("creating subscription", {
    priceId,
    metadata,
    coupon,
    customerId,
    cartId,
  });

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    expand: ["data.latest_invoice.payment_intent"],
    // additional filters can be applied if necessary to find the specific subscription
  });

  let subscription: Stripe.Subscription | undefined;
  if (subscriptions.data.length > 0) {
    subscription = subscriptions.data[0];
  }

  if (!subscription) {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    subscription = await stripe.subscriptions.create(
      {
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
        coupon,
      },
      {
        idempotencyKey: uuid(),
      }
    );
  }

  console.log("this is the subscription", subscription);
  if (!subscription) {
    throw new Error("no subscription");
  } else if (!subscription.latest_invoice) {
    throw new Error("invoice not provided on subscription");
  } else if (typeof subscription.latest_invoice === "string") {
    throw new Error("latest_invoice object not available");
  }

  const invoice = subscription.latest_invoice as Stripe.Invoice;

  // if (!invoice.payment_intent) {
  //   throw new Error("payment_intent object not available");
  // } else if (typeof invoice.payment_intent === "string") {
  //   throw new Error("payment_intent object not available");
  // } else if (!invoice.payment_intent!.client_secret) {
  //   throw new Error("no client secret");
  // }

  const clientSecret = (invoice.payment_intent as Stripe.PaymentIntent)
    ?.client_secret;

  return {
    subscriptionId: subscription.id,
    invoiceStatus: invoice.status,
    clientSecret: clientSecret,
    total: subscription.latest_invoice.total,
    total_discount_amounts: subscription.latest_invoice
      .total_discount_amounts as { discount: string; amount: number }[],
    total_excluding_tax: subscription.latest_invoice.total_excluding_tax!,
    total_tax_amounts: subscription.latest_invoice.total_tax_amounts.map(
      (t) => t.amount
    ),
  };
}

export async function createStripeCustomer(
  customerCreatedCallback: (id: string) => void,
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
    const member = await members.member.get(userAuth.userId);
    console.log("subscription is active", member.iam, subscriptionId);

    if (member.stripeCustomerId !== subscriptionId) {
      await members.member.updateMembershipStatus(
        member.iam,
        subscriptionId,
        "active"
      );
      console.log("updated user membership status");
      return { status: "complete" };
    }
    if (member.membershipStatus === "active") {
      console.log("status is already complete, not doing anything");
      return { status: "complete" };
    }
  }

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

  if (users.data.length > 0) {
    return { error: "ACCOUNT_EXISTS" };
  }
  const result = await clerkClient.users.createUser(request);
  const ticket = await clerkClient.signInTokens.createSignInToken({
    userId: result.id,
    expiresInSeconds: 60 * 60,
  });

  return { userId: result.id, ticket: ticket.token };
}
