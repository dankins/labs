import { db, invitations, members as membersModel } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { getInvitation } from "./getInvitation";
import { members } from "../members";

export async function incrementRedemptions(invitationId: string) {
  const invitation = await getInvitation.nocache(invitationId);
  if (!invitation) {
    throw new Error("invitation not found");
  }
  if (!invitation.memberId) {
    throw new Error("invitation does not have a memberId");
  }
  await db
    .update(invitations)
    .set({ redemptions: (invitation.redemptions || 0) + 1 })
    .where(eq(invitations.id, invitationId));

  const member = await db.query.members.findFirst({
    where: eq(membersModel.id, invitation.memberId),
  });
  if (!member) {
    throw new Error("member not found");
  }

  getInvitation.clearCache(invitationId);
  members.member.invitations.clearInvitationsCache(member.iam);
}
