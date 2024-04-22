import { eq } from "drizzle-orm";

import { Invitation, db, members as memberModel } from "@danklabs/cake/db";

import { updateMembershipStatus } from "./updateMembershipStatus";
import {
  TrackCheckoutComplete,
  trackCheckoutComplete,
} from "@danklabs/cake/events";
import { invitations } from "../../invitations";
import Stripe from "stripe";
import { members } from "..";

export async function activateMembership(
  iam: string,
  subscriptionId: string,
  renewalDate: Date
) {
  const memberCached = await members.member.get(iam);

  const memberRecord = await db.query.members.findFirst({
    where: eq(memberModel.iam, iam),
  });
  if (!memberRecord) {
    throw new Error("No member record found for iam");
  }
  if (memberRecord.membershipStatus === "active") {
    console.log("member already active", iam);
    return;
  }

  const invitationId = memberRecord.invitationId;
  if (!invitationId) {
    throw new Error("No invitationId associated with member");
  }

  const invitation = await invitations.getInvitation.cached(invitationId);

  // something went wrong if we couldn't find the invitation
  if (!invitation) {
    console.error("could not find invitation for subscription", invitationId);
    return;
  }

  // increment the number of redemptions on the invite
  await invitations.incrementRedemptions(invitation.id);

  // create invitations for the member
  await invitations.create(
    memberRecord.id,
    invitation.invitationsGranted || undefined
  );

  await trackEvent(
    memberRecord.iam,
    memberCached.email,
    invitation,
    renewalDate
  );

  await updateMembershipStatus(iam, subscriptionId, "active");
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
