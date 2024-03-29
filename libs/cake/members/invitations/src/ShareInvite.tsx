import { auth } from "@clerk/nextjs/server";
import { ShareInviteClient } from "./ShareInviteClient";
import { emailInviteAction } from "./actions";
import { invitations } from "@danklabs/cake/services/admin-service";

export async function ShareInvite({ invitationId }: { invitationId: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  const invitation = await invitations.getInvitation.cached(invitationId);

  if (!invitation) {
    throw new Error("Invitation not found");
  }
  if (!invitation.code) {
    throw new Error("invalid invitation state");
  }

  return (
    <ShareInviteClient
      inviteCode={invitation.code}
      recipientName={invitation.recipientName!}
      emailInviteAction={emailInviteAction.bind(
        undefined,
        userId,
        invitationId,
        invitation.recipientName!
      )}
    />
  );
}
