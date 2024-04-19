import z from "zod";
import dayjs from "dayjs";

import { invitations } from "@danklabs/cake/services/admin-service";
import { ErrorScreen } from "./error/ErrorScreen";
import { Welcome } from "./welcome/Welcome";
import { MembershipCheckout } from "./checkout/MembershipCheckout";
import { Landing } from "./landing/Landing";
import { getCartIfAvailable } from "./cookie";
import { AccountStep } from "./account/AccountStep";

type SearchParams = { [key: string]: string | string[] | undefined };

const Step = z.enum([
  "landing",
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
  const codeSearchParam =
    typeof searchParams?.code === "string" ? searchParams.code : undefined;
  const errorSearchParam =
    typeof searchParams?.error === "string" ? searchParams.error : undefined;
  const stepSearchParam =
    typeof searchParams?.step === "string" ? searchParams.step : undefined;
  const validatedSearchParam =
    typeof searchParams?.validated === "string" ? true : undefined;
  const detailSearchParam =
    typeof searchParams?.detail === "string" ? searchParams.detail : undefined;

  // No cart yet, so we must go to the landing page
  if (!cart) {
    return <Landing code={codeSearchParam} error={errorSearchParam} />;
  }

  // Landing page
  if (!stepSearchParam) {
    return (
      <Landing
        code={codeSearchParam || cart.code}
        error={errorSearchParam}
        validated={validatedSearchParam}
        cookieEmail={cart.email}
      />
    );
  }

  const code = cart.code;
  const invitation = await invitations.getByCode.cached(code);

  if (!invitation) {
    return <ErrorScreen error="INVALID_INVITE_CODE" />;
  }
  if (dayjs(invitation.expiration).isBefore(dayjs())) {
    return <ErrorScreen error="EXPIRED_INVITE_CODE" />;
  }

  let step: Step;
  try {
    step = Step.parse(stepSearchParam);
  } catch (err) {
    return <ErrorScreen error={"INVALID_STATE"} />;
  }

  switch (step) {
    case "welcome":
      return <Welcome />;
    case "account":
      if (!cart.email) {
        return <ErrorScreen error={"INVALID_STATE"} />;
      }
      return <AccountStep email={cart.email} />;
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
