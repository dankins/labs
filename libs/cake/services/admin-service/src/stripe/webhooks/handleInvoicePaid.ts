import { Stripe } from "stripe";
import { activateMembership } from "../../members/member/activateMembership";
import dayjs from "dayjs";

export async function handleInvoicePaid(event: Stripe.InvoicePaidEvent) {
  console.log("invoice paid", event, event.data.object.subscription);
  const subscriptionId = event.data.object.subscription as string;
  if (!subscriptionId) {
    throw new Error("received invoice paid event with no subscription id");
  }

  // retrieve the metadata from the subscription
  const subscriptionMetadata = event.data.object.subscription_details?.metadata;
  if (!subscriptionMetadata) {
    console.error("received invoice paid event with no subscription metadata");
    return;
  }

  // get the invitation from the database
  const memberIam = subscriptionMetadata["userId"];

  const renewalDate = determineRenewalDate(event);

  await activateMembership(memberIam, subscriptionId, renewalDate);
}

function determineRenewalDate(event: Stripe.InvoicePaidEvent): Date {
  try {
    const periodEndUnix = event.data.object.lines.data[0].period.end;
    return dayjs.unix(periodEndUnix).toDate();
  } catch (err) {
    console.error("could not determine renewal date", err);
    return dayjs().add(1, "year").toDate();
  }
}
