import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function getStripeMembership(iam: string) {
  const user = await clerkClient.users.getUser(iam);

  const subscriptionId = user?.privateMetadata["subscriptionId"] as
    | string
    | undefined;

  if (!subscriptionId) {
    return undefined;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}
