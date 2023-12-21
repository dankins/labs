import z from "zod";
import { Invitation, db, invitations } from "@danklabs/cake/db";

import { BrandSelection } from "./brand-selection/BrandSelection";
import { ErrorScreen } from "./error/ErrorScreen";
import { eq } from "drizzle-orm";
import { Centered } from "@danklabs/pattern-library/core";
import { Account } from "./account/Account";
import { Welcome } from "./welcome/Welcome";
import { MembershipCheckout } from "./checkout/MembershipCheckout";

type SearchParams = { [key: string]: string | string[] | undefined };

const Step = z.enum(["welcome", "brand_selection", "checkout", "error"]);
type Step = z.infer<typeof Step>;

type LobbyState = {
  invitation?: Invitation;
  step: Step;
  brandSelection: string[];
  customerId?: string;
  error?: string;
};

export async function Lobby({ searchParams }: { searchParams?: SearchParams }) {
  return (
    <Centered>
      <LobbyView searchParams={searchParams} />
    </Centered>
  );
}

export async function LobbyView({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const state = await determineState(searchParams);
  const { step, error } = state;
  switch (step) {
    case "welcome":
      return <Welcome />;
    case "brand_selection":
      return <BrandSelection selection={state.brandSelection} />;
    case "checkout":
      return <MembershipCheckout invitation={state.invitation!} />;
    case "error":
      return <ErrorScreen error={error} />;
  }

  const _exhaustive: never = step;
  throw new Error("unrecognized status");
}

async function determineState(
  searchParams?: SearchParams
): Promise<LobbyState> {
  // no search params
  if (!searchParams || !searchParams["code"]) {
    return { step: "error", brandSelection: [], error: "NO_INVITE_CODE" };
  }

  const code = searchParams!.code! as string;
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.code, code),
  });

  if (!invitation) {
    return {
      step: "error",
      invitation,
      brandSelection: [],
      error: "INVALID_INVITE_CODE",
    };
  }

  let brandSelection: string[] = [];
  if (searchParams["brands"]) {
    if (typeof searchParams["brands"] === "string") {
      brandSelection = searchParams["brands"].split(",");
    }
  }

  try {
    const step = Step.parse(searchParams["step"]);

    const customerId = normalize(searchParams["customerId"]);

    return { step, brandSelection, invitation, customerId };
  } catch (err) {
    return { step: "welcome", invitation, brandSelection };
  }
}

function normalize(input: string | string[] | undefined): string | undefined {
  if (!input) {
    return;
  } else if (Array.isArray(input)) {
    return input.join(",");
  }
  return input;
}
