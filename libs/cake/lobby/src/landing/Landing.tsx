import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

import { getPage } from "@danklabs/cake/cms";
import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import {
  TextInput,
  Button,
  TicketIcon,
  EmailIcon,
} from "@danklabs/pattern-library/core";
import { validateFormData } from "@danklabs/utils";
import { z } from "zod";
import { db, invitations } from "@danklabs/cake/db";
import {
  CART_COOKIE_NAME,
  CartCookie,
  cartExists,
  getCart,
  setEmail,
  startCookie,
} from "../cookie";

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
      image={page.heroImage}
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
  async function submitInviteCode(
    formData: FormData
  ): Promise<"valid" | "invalid" | "expired"> {
    "use server";
    console.log("submit invite code");
    const data = validateFormData(formData, z.object({ code: z.string() }));
    const invitation = await db.query.invitations.findFirst({
      where: eq(invitations.code, data.code),
    });

    if (!invitation) {
      redirect(`/invitation?code=${data.code}&error=invalid`);
      return "invalid";
    }
    if (dayjs(invitation.expiration).isBefore(dayjs())) {
      redirect(`/invitation?code=${data.code}&error=expired`);
      return "expired";
    }

    if (cartExists()) {
      const cartCookie = getCart();
      // start with a fresh cart if the code is not the same as the one in the cookie
      if (invitation && invitation.code !== cartCookie.code) {
        startCookie(invitation.code!);
      }
    } else {
      startCookie(invitation.code!);
    }

    redirect(`/invitation?code=${data.code}&validated=true`);
    return "valid";
  }

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
  async function submitEmail(formData: FormData): Promise<void> {
    "use server";
    const data = validateFormData(
      formData,
      z.object({ email: z.string().email() })
    );
    setEmail(data.email);

    redirect(`/invitation?step=welcome`);
  }

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
            defaultValue={jwtEmail || cookieEmail}
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
