"use client";
import {
  Checkbox,
  CopyIcon,
  EmailIcon,
  FormAction,
  Heading4,
  Paragraph,
  PrimaryButton,
  TextArea,
  TextInput,
} from "@danklabs/pattern-library/core";
import { CopyButton, useToast } from "@danklabs/pattern-library/motion";
import { ShareButton } from "../ShareButton";
import { useMemo, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { isWebShareAvailable } from "@danklabs/utils";

export function ShareScreen({
  inviteCode,
  recipientName,
  emailInviteAction,
}: {
  inviteCode: string;
  recipientName: string;
  emailInviteAction(formData: FormData): Promise<void>;
}) {
  const { addToast } = useToast();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const link = `${process.env.NEXT_PUBLIC_SITE_URL}invitation?code=${inviteCode}`;
  const canShare = useMemo(isWebShareAvailable, []);
  const defaultMessage = `${recipientName}, join me on Cake, an invite only opportunity to gain the benefits and rewards from some of the worlds greatest brands! 
Hurry, the invite expires in 48 hours!
    
${link}
    `;

  async function handleSubmit(formData: FormData) {
    const start = new Date().getUTCMilliseconds();
    console.log("starting email send");
    await emailInviteAction(formData);
    const end = new Date().getUTCMilliseconds();
    console.log("email sent", end - start);
    addToast("Email sent successfully!");
    redirect("/account/invites");
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      <Heading4 key="title">Share Invite</Heading4>
      <Paragraph>
        Almost done! Personalize your invite or just select share invite to
        send!
      </Paragraph>
      <form action={handleSubmit}>
        <div className="my-3 w-full">
          <TextArea
            ref={ref}
            rows={7}
            name="message"
            label="YOUR MESSAGE"
            defaultValue={defaultMessage}
          />
        </div>
        <div className="grow" />
        <div>
          <Checkbox
            label="Invite by email"
            helperText="Have Cake email my Invite."
            onChange={() => setEmailChecked(!emailChecked)}
            className="my-4"
          />
        </div>
        {emailChecked && (
          <div className="my-4 flex flex-col gap-6">
            <TextInput
              icon={<EmailIcon />}
              name="email"
              label="Email Address"
            />
            <div>
              <PrimaryButton type="submit">Email Invite</PrimaryButton>
            </div>
          </div>
        )}
      </form>

      {!emailChecked && (
        <div>
          {canShare ? (
            <ShareButton
              title={"Join me on Cake!"}
              url={link}
              text={() => ref.current?.value.replace(link, "") || ""}
            />
          ) : (
            <CopyButton
              text={() => ref.current?.value || ""}
              icon={<CopyIcon />}
              iconPosition="right"
            >
              Copy Invitation
            </CopyButton>
          )}
        </div>
      )}
    </div>
  );
}
