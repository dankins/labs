import z from "zod";
import dayjs from "dayjs";

import { invitations } from "@danklabs/cake/services/admin-service";
import { ErrorScreen } from "./error/ErrorScreen";
import { Welcome } from "./welcome/Welcome";
import { MembershipCheckout } from "./checkout/MembershipCheckout";
import { CartCookie, getCartIfAvailable } from "./cookie";
import { AccountStep } from "./account/AccountStep";
import { AuthenticateInvite } from "./landing/AuthenticateInvite";
import { VerifyOwnership } from "./landing/VerifyOwnership";
import { decodeI } from "./util/decodeI";

type SearchParams = { [key: string]: string | string[] | undefined };

const Step = z.enum([
  "authenticate-invite",
  "verify-ownership",
  "welcome",
  // "brand_selection",
  // "summary",
  "account",
  "checkout",
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
      return <Welcome />;
    case "account":
      return <AccountStep />;
    // case "brand_selection":
    //   return <BrandSelection detail={detailSearchParam} />;
    // case "summary":
    //   return <Summary />;
    case "checkout":
      return (
        <MembershipCheckout
          invitation={invitation}
          searchParams={searchParams || {}}
        />
      );
    default:
      return <ErrorScreen error={"INVALID_STATE"} />;
  }
}
