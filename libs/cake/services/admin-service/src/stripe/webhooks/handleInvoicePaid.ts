import { Invitation, db, members as membersTable } from "@danklabs/cake/db";
import { invitations, members } from "@danklabs/cake/services/admin-service";
import { Stripe } from "stripe";
import { eq } from "drizzle-orm";
import {
  TrackCheckoutComplete,
  trackCheckoutComplete,
} from "@danklabs/cake/events";
import dayjs from "dayjs";

export async function handleInvoicePaid(event: Stripe.InvoicePaidEvent) {
  console.log("invoice paid", event, event.data.object.subscription);
  const subscriptionId = (event.data.object.subscription as Stripe.Subscription)
    .id;
  const member = await members.member.getBySubscriptionId(subscriptionId);
  if (!member) {
    console.error(
      "could not find member associated with subscription",
      subscriptionId
    );
    throw new Error("could not find member associated with subscription");
  }
  // retrieve the invitationId from the subscription
  const subscriptionMetadata = event.data.object.subscription_details?.metadata;
  if (!subscriptionMetadata) {
    console.error("received invoice paid event with no subscription metadata");
    return;
  }

  // get the invitation from the database
  const invitationId = subscriptionMetadata["invitationId"];

  const invitation = await invitations.getInvitation.cached(invitationId);

  // something went wrong if we couldn't find the invitation
  if (!invitation) {
    console.error("could not find invitation for subscription", invitationId);
    return;
  }

  // increment the number of redemptions on the invite
  await invitations.incrementRedemptions(invitation.id);

  // create invitations for the member
  await invitations.create(member.id);

  const renewalDate = determineRenewalDate(event);
  await trackEvent(member.iam, member.email, invitation, renewalDate);
}

async function trackEvent(
  iam: string,
  email: string,
  invitation: Invitation,
  renewalDate: Date
) {
  const event: Omit<TrackCheckoutComplete, "name"> = {
    email,
    invitationId: invitation.id,
    renewalDate: renewalDate.toISOString(),
  };
  if (invitation.memberId) {
    const inviter = await members.member.getById(invitation.memberId);
    if (inviter.firstName) {
      event.inviterFirstName = inviter.firstName;
    }
  }

  return trackCheckoutComplete(iam, event);
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
