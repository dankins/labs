import { db, invitations } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { cachedGetMember } from "../members";
import {
  trackSendInvitationEmailRecipient,
  trackSendInvitationEmailInviter,
} from "@danklabs/cake/events";

export async function emailInvite(
  inviterMemberId: string,
  invitationId: string,
  recipientEmail: string,
  recipientName: string,
  message?: string
) {
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.id, invitationId),
  });
  if (!invitation) {
    throw new Error("Invitation not found");
  }
  console.log("emailInviteAction", {
    invitation,
    invitationId,
    recipientEmail,
    message,
  });
  if (!invitation.code || !invitation.expiration) {
    throw new Error("Invitation code or expiration date not set");
  }

  const inviteUrl = `${process.env["NEXT_PUBLIC_SITE_URL"]}invitation?code=${invitation.code}`;
  const inviterMessage = message?.replace(inviteUrl, "");

  const inviter = await cachedGetMember(inviterMemberId);

  let brands: string[] = [];
  Object.keys(inviter.passes).forEach((key) => {
    brands.push(inviter.passes[key].brand.slug);
  });

  trackSendInvitationEmailRecipient({
    email: recipientEmail,
    invitationId: invitation.id,
    inviterFirstName: inviter.firstName,
    inviterMessage: message,
    inviterBrands: brands,
    inviteUrl,
    inviteCode: invitation.code,
    expirationDate: invitation.expiration?.toISOString(),
    recipientName,
  });
  trackSendInvitationEmailInviter(inviterMemberId, {
    email: inviter.email,
    invitationId: invitation.id,
    inviterMessage: inviterMessage,
    inviteUrl,
    inviteCode: invitation.code,
    expirationDate: invitation.expiration?.toISOString(),
    recipientEmail,
    recipientName,
  });

  return true;
}