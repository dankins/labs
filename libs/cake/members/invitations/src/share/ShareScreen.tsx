"use client";
import {
  Checkbox,
  CopyIcon,
  EmailIcon,
  Heading4,
  Paragraph,
  PrimaryButton,
  TextArea,
  TextInput,
} from "@danklabs/pattern-library/core";
import { CopyButton, useToast } from "@danklabs/pattern-library/motion";
import { ShareButton } from "./ShareButton";
import { useMemo, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { isWebShareAvailable } from "@danklabs/utils";
import slugify from "slugify";

export function ShareScreen({
  inviteCode,
  sponsorName,
  recipientName,
  emailInviteAction,
}: {
  inviteCode: string;
  sponsorName: string;
  recipientName: string;
  emailInviteAction(formData: FormData): Promise<void>;
}) {
  const { addToast } = useToast();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const canShare = useMemo(isWebShareAvailable, []);
  const defaultMessage = `Join me on CAKE, the invite only shopping community with the best brands and perks.`;
  const pin = generatePin(inviteCode.substring(inviteCode.length - 4));
  const accessCode = `${slugify(recipientName, { replacement: "" })}-${pin}`;
  const base64Code = btoa(`${inviteCode}|${accessCode}|${sponsorName}`);
  const link = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }invitation?i=${encodeURIComponent(base64Code)}`;
  const accessInfo = `Sponsor: ${sponsorName}
Personal Access Code: ${accessCode}  

This invite is for you only and expires in 72 hours.
  `;

  function copyText() {
    let personalMessage: string | undefined = ref.current?.value || undefined;
    if (personalMessage) {
      return `${personalMessage}

${accessInfo}

${link}`;
    }
    return accessInfo;
  }

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
        Almost done! Personalize your invite or share as is.
      </Paragraph>
      <form action={handleSubmit}>
        <div className="my-3 w-full">
          <TextArea
            ref={ref}
            rows={4}
            name="message"
            label="PERSONAL MESSAGE (OPTIONAL)"
            defaultValue={defaultMessage}
          />
          <TextArea
            rows={5}
            name="accessInfo"
            label="ACCESS INFO"
            value={accessInfo}
            disabled
            helperText="Invitations are non-transferrable and subject to validation"
          />
        </div>
        <div className="grow" />
        <div>
          <Checkbox
            label="Send invite by email"
            helperText="Have CAKE email my Invite."
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
              text={copyText}
            />
          ) : (
            <CopyButton
              text={copyText}
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

// generate a four digit pin number from the invite code
function generatePin(seed: string) {
  const pin = seed
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((acc, c) => acc + c, 0)
    .toString()
    .slice(-4);
  return pin.padStart(4, "0");
}
