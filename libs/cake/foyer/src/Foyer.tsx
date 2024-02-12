import z from "zod";
import dayjs from "dayjs";
import { Invitation, db, invitations } from "@danklabs/cake/db";

import { BrandSelection } from "./brand-selection/BrandSelection";
import { ErrorScreen } from "./error/ErrorScreen";
import { eq } from "drizzle-orm";
import { Centered } from "@danklabs/pattern-library/core";
import { Welcome } from "./welcome/Welcome";
import { MembershipCheckout } from "./checkout/MembershipCheckout";
import { Summary } from "./checkout/Summary";
import { CreateAccount } from "./account/CreateAccount";
import { Landing } from "./landing/Landing";
import { CART_COOKIE_NAME, CartCookie, getCartIfAvailable } from "./cookie";

type SearchParams = { [key: string]: string | string[] | undefined };

const Step = z.enum([
  "landing",
  "welcome",
  "brand_selection",
  "summary",
  "account",
  "checkout",
  "error",
]);
type Step = z.infer<typeof Step>;

type LobbyState = {
  invitation?: Invitation;
  step: Step;
  customerId?: string;
  error?: string;
  cart?: CartCookie;
};

export async function Foyer({ searchParams }: { searchParams?: SearchParams }) {
  return (
    <Centered>
      <FoyerView searchParams={searchParams} />
    </Centered>
  );
}

export async function FoyerView({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
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
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.code, code),
  });

  if (!invitation) {
    return <ErrorScreen error="INVALID_INVITE_CODE" />;
  }
  if (dayjs(invitation.expiration).isBefore(dayjs())) {
    return <ErrorScreen error="EXPIRED_INVITE_CODE" />;
  }

  if (stepSearchParam === "welcome") {
    return <Welcome />;
  } else if (stepSearchParam === "brand_selection") {
    return <BrandSelection detail={detailSearchParam} />;
  } else if (stepSearchParam === "summary") {
    return <Summary />;
  } else if (stepSearchParam === "account") {
    return <CreateAccount />;
  } else if (stepSearchParam === "checkout") {
    return <MembershipCheckout invitation={invitation} />;
  }

  return <ErrorScreen error={"INVALID_STATE"} />;

  // try {
  //   const step = Step.parse(searchParam?.step);

  //   return {
  //     step,
  //     invitation,
  //     customerId: cart?.stripeCustomerId,
  //   };
  // } catch (err) {
  //   return {
  //     step: "landing",
  //     invitation,
  //   };
  // }
  // switch (step) {
  //   case "landing":
  //     return (
  //       <Landing
  //         code={searchParams?.code || state.cart?.code}
  //         error={searchParams?.error}
  //         validated={searchParams?.validated}
  //       />
  //     );
  //   case "welcome":
  //     return <Welcome />;
  //   case "brand_selection":
  //     return <BrandSelection />;
  //   case "summary":
  //     return <Summary />;
  //   case "account":
  //     return <CreateAccount />;
  //   case "checkout":
  //     return <MembershipCheckout invitation={state.invitation!} />;
  //   case "error":
  //     return <ErrorScreen error={error} />;
  // }

  // const _exhaustive: never = step;
  // throw new Error("unrecognized status");
}

function normalize(input: string | string[] | undefined): string | undefined {
  if (!input) {
    return;
  } else if (Array.isArray(input)) {
    return input.join(",");
  }
  return input;
}
