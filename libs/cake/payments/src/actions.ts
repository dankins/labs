"use server";
import z from "zod";
import Stripe from "stripe";
import { SubscriptionReturnType } from "./types";
import { v4 as uuid } from "uuid";
import {
  invitations,
  members,
  stripe,
} from "@danklabs/cake/services/admin-service";
import dayjs from "dayjs";
import { deleteCookie, cookieSetName, getCartIfAvailable } from "./cookie";
import { validateFormData } from "@danklabs/utils";
import { zfd } from "zod-form-data";
import { DEFAULT_MAX_COLLECTION_ITEMS } from "libs/cake/services/admin-service/src/members/member/create";

const stripeClient = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

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

  let subscription = await stripe.payments.getSubscriptionByCustomerId(
    customerId
  );
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
    subscription = await stripeClient.subscriptions.create(
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

export async function checkSubscriptionStatus(subscriptionId: string): Promise<{
  status: "incomplete" | "pending" | "complete";
}> {
  const cart = getCartIfAvailable();
  if (!cart) {
    return { status: "incomplete" };
  }

  console.log("checking subscription", subscriptionId);
  const sub = await stripeClient.subscriptions.retrieve(subscriptionId);

  if (sub.status === "active") {
    const renewalDate = dayjs.unix(sub.current_period_end).toDate();
    const email = cart.email;
    if (!email) {
      console.error("cart does not have email");
      return { status: "incomplete" };
    }
    const invitationId = sub.metadata.invitationId;
    const invitation = await invitations.getInvitation.cached(invitationId);
    if (!invitation) {
      console.error("could not locate invitation");
      return { status: "incomplete" };
    }

    const member = await members.member.getOrCreateByEmail(
      email,
      {
        invitationId: invitation.id,
        maxCollectionItems:
          invitation.collectionItemsGranted ||
          invitation.collectionItemsGranted ||
          DEFAULT_MAX_COLLECTION_ITEMS,
      },
      cart.firstName,
      cart.lastName
    );

    await members.member.activateMembership(
      member.iam,
      subscriptionId,
      renewalDate
    );
    console.log("updated user membership status");
    deleteCookie();
    return { status: "complete" };
  }

  return { status: "pending" };
}

export async function setName(formData: FormData) {
  const data = validateFormData(
    formData,
    z.object({ email: zfd.text(), firstName: zfd.text(), lastName: zfd.text() })
  );
  const isEmailTaken = await members.member.emailAddressExists(data.email);

  if (isEmailTaken) {
    throw new Error("email already exists");
  }

  cookieSetName(data.email, data.firstName, data.lastName);
}
