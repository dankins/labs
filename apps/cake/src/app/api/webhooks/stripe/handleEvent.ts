import { Stripe } from "stripe";

export async function handleEvent(event: Stripe.Event) {
  // Successfully constructed event
  switch (event.type) {
    case "payment_intent.created":
      return handlePaymentIntentCreate(event);
    case "payment_intent.succeeded":
      return handlePaymentIntentSucceeded(event);
    case "charge.succeeded":
      return handleChargeSucceeded(event);

    default:
      console.log(
        "Unhandled event:",
        event.type,
        event.id,
        JSON.stringify(event)
      );
      return;
  }
}

function handlePaymentIntentCreate(event: Stripe.Event) {
  return;
}

function handlePaymentIntentSucceeded(event: Stripe.Event) {
  console.log("stripe > payment_intent.succeeded", event);
}
function handleChargeSucceeded(event: Stripe.Event) {
  console.log("stripe > charge.succeeded", event);
}
