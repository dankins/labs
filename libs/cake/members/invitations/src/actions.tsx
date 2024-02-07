"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { render } from "@react-email/render";

import {
  assignInvite,
  cancelInvite,
  getMemberInvitation,
} from "@danklabs/cake/services/admin-service";
import { validateFormData } from "@danklabs/utils";

import {
  MemberInvitationEmail,
  MemberInvitationEmailSubject,
} from "@danklabs/cake/emails";

const resend = new Resend(process.env["RESEND_API_KEY"]);

export async function cancelInviteAction(id: string) {
  await cancelInvite(id);
  revalidatePath("/account");
}

export async function assignInviteAction(
  inviteId: string,
  formData: FormData
): ReturnType<typeof assignInvite> {
  console.log("createInviteAction", inviteId, formData);
  const data = validateFormData(
    formData,
    z.object({
      name: z.string(),
    })
  );

  const invite = await assignInvite(inviteId, data.name);
  revalidatePath("/account");
  return invite;
}

export async function emailInviteAction(
  inviteId: string,
  inviteCode: string,
  formData: FormData
): Promise<boolean> {
  console.log("emailInviteAction");
  const data = validateFormData(
    formData,
    z.object({
      email: z.string(),
      message: z.string(),
    })
  );
  console.log("emailInviteAction", inviteId, data);

  const sendToEmail = data.email;
  const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}invite?code=${inviteCode}`;
  const inviterMessage = data.message.replace(inviteLink, "");
  const memberName = "FixMe";

  const emailHtml = render(
    <MemberInvitationEmail
      inviterMessage={inviterMessage}
      memberName={memberName}
      inviteLink={inviteLink}
    />
  );

  console.log("sending email", {
    memberName,
    sendToEmail,
    inviteLink,
    inviterMessage,
  });
  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: sendToEmail,
    subject: MemberInvitationEmailSubject(memberName),
    html: emailHtml,
  });

  return typeof response.error === "undefined";
}
