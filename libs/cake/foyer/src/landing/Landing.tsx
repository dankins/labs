import Link from "next/link";

import { getPage } from "@danklabs/cake/cms";
import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import {
  TextInput,
  Button,
  TicketIcon,
  EmailIcon,
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
    <FeatureImageContainer
      image={page.heroImage!}
      overlay={<div className="w-full h-full absolute top-0 bg-black/40"></div>}
    >
      {validated ? (
        <InvitationEmail
          code={code}
          error={error}
          jwtEmail={jwtEmail}
          cookieEmail={cookieEmail}
        />
      ) : (
        <InvitationStart code={code} error={error} />
      )}
    </FeatureImageContainer>
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
        <h1 className="text-[#FFF6DA] text-6xl font-fancy">Oh, Cake.</h1>
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
          action={submitInviteCode}
          className="flex flex-row items-end gap-2"
        >
          <TextInput
            name="code"
            placeholder="Enter Invitation Code"
            label="Invitation Code"
            icon={<TicketIcon className="fill-white strokee-white text-xl" />}
            defaultValue={code && code.length > 0 ? code : undefined}
            className="bg-neutral text-neutral-content"
          />
          <Button type="submit" background="white">
            Submit
          </Button>
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
  code,
  error,
  cookieEmail,
  jwtEmail,
}: {
  code: string | string[] | null | undefined;
  error: string | string[] | undefined;
  cookieEmail?: string;
  jwtEmail?: string;
}) {
  return (
    <div className="h-full flex flex-col px-5">
      {/** WELCOME MESSAGE */}
      <div className="mb-5 flex flex-col justify-center items-center gap-4 pt-[50px]">
        <h1 className="text-[#FFF6DA] text-6xl font-fancy">You’re in!</h1>
        <span className="text-base font-normal leading-6">
          Almost there, we’ll need an email address to setup your account.
        </span>
      </div>
      {/** Email */}
      <div>
        <form action={submitEmail} className="flex flex-row items-end gap-2">
          <TextInput
            name="email"
            placeholder="Enter Email Address"
            label="Email Address"
            icon={<EmailIcon className="fill-white strokee-white text-xl" />}
            className="bg-neutral text-neutral-content"
          />
          <Button type="submit" background="white">
            Continue
          </Button>
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
            href="/signin"
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
