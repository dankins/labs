import z from "zod";
import dayjs from "dayjs";

import { invitations } from "@danklabs/cake/services/admin-service";
import { ErrorScreen } from "./error/ErrorScreen";
import { MembershipCheckout } from "./checkout/MembershipCheckout";
import { getCartIfAvailable } from "@danklabs/cake/payments";
import { AccountStep } from "./account/AccountStep";
import { AuthenticateInvite } from "./landing/AuthenticateInvite";
import { VerifyOwnership } from "./landing/VerifyOwnership";
import { decodeI } from "./util/decodeI";
import { AddressStep } from "./account/AddressStep";
import { ContactStep } from "./account/ContactStep";
import { WelcomeStep } from "./welcome/WelcomeStep";
import { SearchParams } from "@danklabs/utils";
import { ProfileStep } from "./account/ProfileStep";

const Step = z.enum([
  "authenticate-invite",
  "verify-ownership",
  "welcome",
  "checkout",
  "account",
  "profile",
  "address",
  "contact",
  "error",
]);
type Step = z.infer<typeof Step>;

export async function Foyer({ searchParams }: { searchParams?: SearchParams }) {
  const cart = getCartIfAvailable();

  let inviteCode: string | undefined = cart?.code;
  if (!inviteCode && typeof searchParams?.i === "string") {
    [inviteCode] = decodeI(searchParams.i);
  }
  if (!inviteCode) {
    return <ErrorScreen error="NO_CODE" />;
  }

  const invitation = await invitations.getByCode.cached(inviteCode);
  if (!invitation) {
    return <ErrorScreen error="INVALID_INVITE_CODE" />;
  }
  if (dayjs(invitation.expiration).isBefore(dayjs())) {
    return <ErrorScreen error="EXPIRED_INVITE_CODE" />;
  }

  let step: Step;
  try {
    step = Step.parse(searchParams?.step || "authenticate-invite");
  } catch (err) {
    return <ErrorScreen error={"INVALID_STATE"} />;
  }

  switch (step) {
    case "authenticate-invite":
      return <AuthenticateInvite i={searchParams?.i as string} cart={cart} />;
    case "verify-ownership":
      return <VerifyOwnership i={searchParams?.i as string} cart={cart} />;
    case "welcome":
      return <WelcomeStep />;
    case "checkout":
      return (
        <MembershipCheckout
          invitation={invitation}
          searchParams={searchParams || {}}
        />
      );
    case "account":
      return <AccountStep searchParams={searchParams} />;
    case "profile":
      return <ProfileStep />;
    case "address":
      return <AddressStep />;
    case "contact":
      return <ContactStep />;
    default:
      return <ErrorScreen error={"INVALID_STATE"} />;
  }
}
