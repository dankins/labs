import Link from "next/link";

import { getPage } from "@danklabs/cake/services/admin-service";
import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import {
  TextInput,
  TicketIcon,
  EmailIcon,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { submitEmail, submitInviteCode } from "./actions";

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
    <div className="max-w-[500px]">
      <FeatureImageContainer
        image={page.heroImage!}
        overlay={
          <div className="w-full h-full absolute top-0 bg-neutral/70"></div>
        }
      >
        {validated ? (
          <InvitationEmail
            error={error}
            cookieEmail={cookieEmail}
            jwtEmail={jwtEmail}
          />
        ) : (
          <InvitationStart code={code} error={error} />
        )}
      </FeatureImageContainer>
    </div>
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
    <div className="h-full flex flex-col px-5">
      {/** WELCOME MESSAGE */}
      <div className="mb-5 flex flex-col justify-center items-center gap-4 pt-[50px]">
        <h1 className="text-6xl font-fancy">Oh, Cake.</h1>
        <span className="text-base font-normal leading-6">
          Why do I need an invitation? Like any truly special thing in the
          universe, Cake is not unlimited. Our partners are among the most loved
          brands in the world, so we're just not able to offer Cake Member
          access to every person who wants it.
        </span>
        <span>
          How can I get an invitation? Cake members control the Cake membership.
          Only a Cake member can invite you to join.”
        </span>
        <div></div>
      </div>
      {/** INVITE CODE */}
      <div>
        <form
          key="code-form"
          action={submitInviteCode}
          className="flex flex-row items-end gap-2"
        >
          <TextInput
            id="code-input"
            key="code"
            name="code"
            placeholder="Enter Invitation Code"
            label="Invitation Code"
            icon={<TicketIcon />}
            defaultValue={code && code.length > 0 ? code : undefined}
          />

          <SecondaryButton type="submit">Submit</SecondaryButton>
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
        <div className="mt-4">
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
    <div className="h-full flex flex-col px-5">
      {/** WELCOME MESSAGE */}
      <div className="mb-5 flex flex-col justify-center items-center gap-4 pt-[50px]">
        <h1 className="text-dark text-6xl font-fancy">You’re in!</h1>
        <span className="text-base font-normal leading-6">
          Almost there, we’ll need an email address to setup your account.
        </span>
      </div>
      {/** Email */}
      <div>
        <form
          key="email-form"
          id="email-form"
          action={submitEmail}
          className="flex flex-row items-end gap-2"
        >
          <TextInput
            name="email"
            placeholder="Enter Email Address"
            label="Email Address"
            icon={<EmailIcon />}
            defaultValue={cookieEmail || jwtEmail}
          />

          <SecondaryButton type="submit">Continue</SecondaryButton>
        </form>
        {error && error === "invalid" && (
          <div className="mt-5">
            <span className="text-red-500">Invalid email</span>
          </div>
        )}
        {error && error === "expired" && (
          <div className="mt-5">
            <span className="text-red-500">Invitation has expired</span>
          </div>
        )}
        <div className="mt-4">
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
