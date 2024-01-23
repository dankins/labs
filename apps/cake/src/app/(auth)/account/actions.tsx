"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { db, invitations } from "@danklabs/cake/db";
import {
  MemberInvitationEmail,
  MemberInvitationEmailSubject,
} from "@danklabs/cake/emails";

const resend = new Resend(process.env["RESEND_API_KEY"]);

export async function activateInvitationAction(id: string): Promise<void> {
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.id, id),
  });
  if (!invitation) {
    throw new Error("not found");
  }

  const adverb = faker.word.adverb({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });
  const adjective = faker.word.adjective({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });
  const noun = faker.word.noun({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });

  const code = `${adverb}-${adjective}-${noun}`;
  const expiration = dayjs().add(7, "day").toDate();

  await db
    .update(invitations)
    .set({ code, expiration })
    .where(eq(invitations.id, id));

  revalidatePath("/members/invitations");
}

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
