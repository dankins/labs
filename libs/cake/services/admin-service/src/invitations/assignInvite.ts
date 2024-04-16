import {
  Invitation,
  db,
  invitations as invitationsTable,
} from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import {
  admin,
  invitations,
  members,
} from "@danklabs/cake/services/admin-service";
import { member as memberAPI } from "../members/member";
import { trackInvitationActivated } from "@danklabs/cake/events";
import { generateInviteCode } from "./generateInviteCode";

export async function assignInvite(
  inviteId: string,
  name: string,
  code?: string
): Promise<void> {
  const newCode = code || generateInviteCode();
  const newExpiration = dayjs().add(7, "day").toDate();

  const invitation = await db.query.invitations.findFirst({
    where: eq(invitationsTable.id, inviteId),
    with: {
      campaign: true,
    },
  });
  if (!invitation) {
    throw new Error("invitation not found");
  }

  const result = await db
    .update(invitationsTable)
    .set({
      code: newCode,
      expiration: newExpiration,
      recipientName: name,
      updatedAt: new Date(),
    })
    .where(eq(invitationsTable.id, inviteId))
    .returning();

  if (result.length !== 1) {
    console.log("unable to update record", result, inviteId);
    throw new Error("unable to update record");
  }

  if (invitation.memberId) {
    const member = await memberAPI.getById(invitation.memberId!);

    trackInvitationActivated(member.iam, {
      email: member.email,
      invitationId: inviteId,
      inviteUrl: `${process.env["NEXT_PUBLIC_SITE_URL"]}invitation?code=${invitation.code}`,
      inviteCode: newCode,
      expirationDate: newExpiration.toISOString(),
      recipientName: name,
    });

    members.member.invitations.clearInvitationsCache(member.iam);
  }

  invitations.getInvitation.clearCache(invitation.id);
  if (invitation.tranche && invitation.campaign?.slug) {
    admin.invitations.clearTrancheCache(
      invitation.campaign.slug,
      invitation.tranche
    );
  }
}
