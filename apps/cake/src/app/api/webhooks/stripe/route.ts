import stripeClient, { Stripe } from "stripe";
import { stripe } from "@danklabs/cake/services/admin-service";

const webhookSecret = process.env["STRIPE_WEBHOOK_SIGNING_SECRET"]!;
export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("stripe-signature header not present", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    // On error, log and return the error message
    console.error(`❌ Error message: ${err.message}`, payload);
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  await stripe.webhooks.handleEvent(event);

  return new Response("handled event", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
