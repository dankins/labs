import { eq } from "drizzle-orm";

import { Invitation, db, members as memberModel } from "@danklabs/cake/db";

import { updateMembershipStatus } from "./updateMembershipStatus";
import {
  TrackCheckoutComplete,
  trackCheckoutComplete,
} from "@danklabs/cake/events";
import { invitations } from "../../invitations";
import { members } from "..";
import { addConnection } from "../community/addConnection";

export async function activateMembership(
  iam: string,
  subscriptionId: string,
  renewalDate: Date
) {
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
  await updateMembershipStatus(iam, subscriptionId, "active");

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
    invitation.invitationsGranted ||
      invitation.campaign?.invitationsGranted ||
      undefined
  );
  // add profile connections
  if (invitation.memberId) {
    await addConnectionToInviter(invitation.memberId, memberRecord.id);
  }

  const memberCached = await members.member.get(iam);
  await trackEvent(
    memberRecord.iam,
    memberCached.email,
    invitation,
    renewalDate
  );
  members.member.clearCache(iam);
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

async function addConnectionToInviter(
  inviterMemberId: string,
  newMemberId: string
) {
  const inviter = await members.member.getById(inviterMemberId);
  if (!inviter) {
    console.error("could not find inviter member", inviterMemberId);
    return;
  }
  const newMember = await members.member.getById(newMemberId);
  if (!newMember) {
    console.error("could not find new member", newMemberId);
    return;
  }

  await addConnection(inviter.iam, newMember.profile.username);
  await addConnection(newMember.iam, inviter.profile.username);
}
