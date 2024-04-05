"use server";
import { z } from "zod";

import { invitations } from "@danklabs/cake/services/admin-service";
import { validateFormData } from "@danklabs/utils";

import { redirect } from "next/navigation";

export async function cancelInviteAction(iam: string, id: string) {
  await invitations.cancelInvite(iam, id);
  redirect("/account/invites");
}

export async function assignInviteAction(
  inviteId: string,
  formData: FormData
): ReturnType<typeof invitations.assignInvite> {
  console.log("createInviteAction", inviteId, formData);
  const data = validateFormData(
    formData,
    z.object({
      name: z.string(),
    })
  );

  await invitations.assignInvite(inviteId, data.name);
  redirect("/account/invites?action=share&invitationId=" + inviteId);
}

export async function emailInviteAction(
  senderMemberId: string,
  invitationId: string,
  recipientName: string,
  formData: FormData
): Promise<void> {
  const data = validateFormData(
    formData,
    z.object({
      email: z.string(),
      message: z.string(),
    })
  );
  await invitations.emailInvite(
    senderMemberId,
    invitationId,
    recipientName,
    data.email,
    data.message
  );
  console.log("email sent");
}
