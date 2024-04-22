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
import dayjs from "dayjs";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

// https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=elements#create-customer
export async function createSubscription(
  priceId: string,
  coupon: string | undefined,
  metadata: any,
  customerId: string
): Promise<SubscriptionReturnType> {
  console.log("checking subscription", {
    priceId,
    metadata,
    coupon,
    customerId,
  });

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    expand: ["data.latest_invoice.payment_intent"],
    // additional filters can be applied if necessary to find the specific subscription
  });

  let subscription: Stripe.Subscription | undefined;
  if (subscriptions.data.length > 0) {
    subscription = subscriptions.data[0];
    console.log("found subscription", subscription.id);
  }

  if (!subscription) {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    console.log("creating subscription", {
      priceId,
      metadata,
      coupon,
      customerId,
    });
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

export async function getCustomer(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

export async function checkSubscriptionStatus(subscriptionId: string): Promise<{
  status: "incomplete" | "pending" | "complete";
}> {
  const userAuth = auth();
  if (!userAuth.userId) {
    return { status: "incomplete" };
  }

  console.log("checking subscription", subscriptionId);
  const sub = await stripe.subscriptions.retrieve(subscriptionId);

  if (sub.status === "active") {
    const renewalDate = dayjs.unix(sub.current_period_end).toDate();
    await members.member.activateMembership(
      userAuth.userId,
      subscriptionId,
      renewalDate
    );
    console.log("updated user membership status");
    return { status: "complete" };
  }

  return { status: "pending" };
}
