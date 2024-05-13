"use server";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { invitations } from "@danklabs/cake/services/admin-service";
import { isPostgresError, isZodError, validateFormData } from "@danklabs/utils";

import { redirect } from "next/navigation";
import { FormState } from "@danklabs/pattern-library/core";
import { auth } from "@clerk/nextjs/server";

export async function shareInviteAction(
  inviteId: string,
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("shareInviteAction", inviteId, previousState, formData);
  let data: { name: string } | undefined;
  try {
    data = validateFormData(
      formData,
      zfd.formData({
        name: zfd.text(),
      })
    );
  } catch (err) {
    if (err === isZodError(err)) {
      return { status: "error", message: "Error validating input" };
    }
    console.error("Error sharing invite", err);
    return { status: "error", message: "Unknown error occurred" };
  }

  try {
    await invitations.assignInvite(inviteId, data.name);
  } catch (err) {
    console.error("Error creating offer", err);
    if (err === isPostgresError) {
      return { status: "error", message: "Error sharing invite" };
    }
    return { status: "error", message: "Unknown error occurred" };
  }

  return redirect(
    `/account/invites?action=share-invite&inviteId=${inviteId}&screen=share`
  );
}

export async function cancelInviteAction(
  inviteId: string,
  returnHref: string,
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId: iam } = auth().protect();
  await invitations.cancelInvite(iam, inviteId);
  return redirect(returnHref);
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
