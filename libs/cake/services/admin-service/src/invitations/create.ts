import { db, invitations } from "@danklabs/cake/db";
import { members } from "../members";

const NEW_MEMBER_INVITATIONS = 2;
const NEW_MEMBER_MAX_REDEMPTIONS = 1;

export async function create(memberId: string, amount?: number) {
  type NewInvitation = typeof invitations.$inferInsert;
  const newInvitatations: NewInvitation[] = new Array(
    amount || NEW_MEMBER_INVITATIONS
  ).fill({
    memberId,
    redemptions: 0,
    maxRedemptions: NEW_MEMBER_MAX_REDEMPTIONS,
  });
  console.log(
    "Creating invitations for member",
    memberId,
    amount,
    newInvitatations
  );
  await db.insert(invitations).values(newInvitatations);

  members.member.invitations.clearInvitationsCache(memberId);
}
