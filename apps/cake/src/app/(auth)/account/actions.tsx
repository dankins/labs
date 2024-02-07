"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { render } from "@react-email/render";

import { db, invitations } from "@danklabs/cake/db";
import {
  MemberInvitationEmail,
  MemberInvitationEmailSubject,
} from "@danklabs/cake/emails";

const resend = new Resend(process.env["RESEND_API_KEY"]);

export async function sendInvitationEmail(
  memberName: string,
  sendToEmail: string,
  inviteLink: string,
  inviterMessage: string
): Promise<void> {
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
  console.log("email sent", response);
}
