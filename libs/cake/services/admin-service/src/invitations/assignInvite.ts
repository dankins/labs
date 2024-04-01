import {
  Invitation,
  db,
  invitations as invitationsTable,
} from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { invitations } from "@danklabs/cake/services/admin-service";
import { member as memberAPI } from "../members/member";
import { trackInvitationActivated } from "@danklabs/cake/events";
import { generate } from "langchain/dist/util/fast-json-patch";

export function generateInviteCode(prefix?: string) {
  const adverb = faker.word.adverb({
    length: { min: 5, max: 12 },
    strategy: "longest",
  });
  const adjective = faker.word.adjective({
    length: { min: 5, max: 12 },
    strategy: "longest",
  });
  const noun = faker.word.noun({
    length: { min: 5, max: 12 },
    strategy: "longest",
  });

  return `${prefix ? `${prefix}-` : ""}${adverb}-${adjective}-${noun}`;
}

export async function assignInvite(
  inviteId: string,
  name: string
): Promise<{
  id: string;
  recipientName: string;
  code: string;
  expiration: Date;
}> {
  const newCode = generateInviteCode();
  const newExpiration = dayjs().add(7, "day").toDate();

  const invitation = await db.query.invitations.findFirst({
    where: eq(invitationsTable.id, inviteId),
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

  const { id, code, expiration, recipientName } = result[0];
  console.log("assigned invite", inviteId, {
    id,
    code,
    expiration,
    recipientName,
  });

  const member = await memberAPI.getById(invitation.memberId!);

  trackInvitationActivated(member.iam, {
    email: member.email,
    invitationId: inviteId,
    inviteUrl: `${process.env["NEXT_PUBLIC_SITE_URL"]}invitation?code=${invitation.code}`,
    inviteCode: newCode,
    expirationDate: newExpiration.toISOString(),
    recipientName: name,
  });

  invitations.getMemberInvitations.clearCache(member.iam);
  invitations.getInvitation.clearCache(invitation.id);

  return {
    id,
    code: code!,
    expiration: expiration!,
    recipientName: recipientName!,
  };
}
