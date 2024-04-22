import Link from "next/link";

import { getPage } from "@danklabs/cake/services/admin-service";
import {
  TextInput,
  TicketIcon,
  EmailIcon,
  SecondaryButton,
  Heading1,
  Paragraph1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { submitEmail, submitInviteCode } from "./actions";
import { FoyerContainer } from "../FoyerContainer";
import Image from "next/image";

export async function Landing({
  code,
  error,
  validated,
  jwtEmail,
  cookieEmail,
}: {
  code?: string;
  error?: string;
  validated?: true;
  cookieEmail?: string;
  jwtEmail?: string;
}) {
  const page = await getPage("foyer");

  return (
    <FoyerContainer>
      {validated ? (
        <InvitationEmail
          error={error}
          cookieEmail={cookieEmail}
          jwtEmail={jwtEmail}
        />
      ) : (
        <InvitationStart code={code} error={error} />
      )}
    </FoyerContainer>
  );
}

function InvitationStart({
  code,
  error,
}: {
  code: string | string[] | null | undefined;
  error: string | string[] | undefined;
}) {
  return (
    <div className="max-w-[430px] flex flex-col">
      {/** WELCOME MESSAGE */}
      <div className="mb-5 flex flex-col justify-center items-center pt-[20px] text-center gap-6">
        <Image
          src="/images/foyer/imagestack_entry_betaFPOk.png"
          width={691}
          height={605}
          alt="Cake Vibes"
          className="w-auto h-full max-h-[250px] md:max-h-full"
        />
        <Heading1 className="text-xl lg:text-[30px]">
          CAKE was created for people like us, who are obsessed with brands that
          we feel are truly special.
        </Heading1>

        <p className="text-xl lg:text-2xl font-apris">
          Enter your invitation code to begin.
        </p>

        <form
          key="code-form"
          action={submitInviteCode}
          className="mb-4 w-full flex flex-col items-end gap-2"
        >
          <TextInput
            id="code-input"
            key="code"
            name="code"
            placeholder="Enter Invitation Code"
            icon={<TicketIcon />}
            defaultValue={code && code.length > 0 ? code : undefined}
            inputSize="xl"
          />

          <PrimaryButton type="submit" className="my-1 w-full uppercase">
            Become a Member
          </PrimaryButton>
        </form>
        {error && error === "invalid" && (
          <div className="mt-5">
            <span className="text-red-500">Invalid invite code</span>
          </div>
        )}
        {error && error === "expired" && (
          <div className="mt-5">
            <span className="text-red-500">Invitation has expired</span>
          </div>
        )}
      </div>
      {/** INVITE CODE */}
      <div>
        <div className="mt-4 text-neutral-content/70">
          Already a member?{" "}
          <Link
            href="/sign-in"
            prefetch={false}
            className="underline text-primary"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

function InvitationEmail({
  error,
  cookieEmail,
  jwtEmail,
}: {
  error: string | string[] | undefined;
  cookieEmail?: string;
  jwtEmail?: string;
}) {
  return (
    <div className="max-w-[430px] flex flex-col">
      {/** WELCOME MESSAGE */}
      <div className="mb-5 flex flex-col justify-center items-center pt-[50px] text-center gap-6">
        <Heading1 className="text-xl lg:text-[30px]">You're in!</Heading1>

        <p className="text-xl lg:text-2xl font-apris">
          Almost there, we’ll need an email address to setup your account.
        </p>

        <form
          key="email-form"
          id="email-form"
          action={submitEmail}
          className="mb-4 w-full flex flex-col items-end gap-2"
        >
          <TextInput
            name="email"
            placeholder="Enter Email Address"
            icon={<EmailIcon />}
            defaultValue={cookieEmail || jwtEmail}
            inputSize="lg"
          />

          <PrimaryButton type="submit" className="my-1 w-full uppercase">
            Continue
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
