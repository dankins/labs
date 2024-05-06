import { db, invitations, members as membersModel } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { getInvitation } from "./getInvitation";
import { members } from "../members";
import { admin } from "../admin";

export async function incrementRedemptions(invitationId: string) {
  const invitation = await getInvitation.nocache(invitationId);
  if (!invitation) {
    throw new Error("invitation not found");
  }
  let accepted = invitation.maxRedemptions === 1 ? new Date() : undefined;
  await db
    .update(invitations)
    .set({ accepted, redemptions: (invitation.redemptions || 0) + 1 })
    .where(eq(invitations.id, invitationId));

  getInvitation.clearCache(invitationId);

  if (invitation.memberId) {
    const member = await db.query.members.findFirst({
      where: eq(membersModel.id, invitation.memberId),
    });
    if (!member) {
      throw new Error("member not found");
    }
    members.member.invitations.clearInvitationsCache(member.iam);
  }

  if (invitation.campaignId) {
    admin.invitations.getCampaigns_clearCache();
  }
}
