"use client";
import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

import { StripeProvider } from "./StripeProvider";
import { Address } from "./Address";
import { CheckoutSection } from "./CheckoutSection";
import { Payment } from "./Payment";
import { Account } from "./Account";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { Success } from "./Success";
import { SubscriptionReturnType } from "./types";

export type CheckoutProps = {
  stripeCustomerId: string;
  createSubscriptionAction(customerId: string): Promise<SubscriptionReturnType>;
  checkSubscriptionStatus(subscriptionId: string): Promise<{
    status: "incomplete" | "pending" | "complete";
  }>;
  createAccount(
    formData: FormData
  ): Promise<
    | { error?: undefined; userId: string; ticket: string }
    | { error: "ACCOUNT_EXISTS" }
  >;
};

export type StripeCustomer = {
  stripeCustomerId: string;
  billingAddress: StripeAddressElementChangeEvent["value"];
};

export function CheckoutClient({
  stripeCustomerId,
  createSubscriptionAction,
  checkSubscriptionStatus,
}: CheckoutProps) {
  const sp = useSearchParams();
  // const [stripeCustomer, setStripeCustomer] = useState<StripeCustomer>();
  let active = "payment";

  if (sp.get("redirect_status") && sp.get("redirect_status") === "succeeded") {
    return <Success checkSubscriptionStatus={checkSubscriptionStatus} />;
  }

  return (
    <StripeProvider
      options={{
        appearance: {
          rules: {
            ".Label": {
              color: "#000",
            },
          },
        },
      }}
    >
      {/* <CheckoutSection>
        <Account
          active={active === "account"}
          userId={userId}
          userEmailAddress={userEmailAddress}
          createAccount={createAccount}
        />
      </CheckoutSection> */}
      {/* <CheckoutSection>
        <Address
          mode={"billing"}
          active={active === "billing"}
          emailAddress={userEmailAddress}
          stripeCustomer={stripeCustomer}
          onSubmit={handleAddressSubmit}
        />
      </CheckoutSection> */}
      <CheckoutSection>
        <Payment
          active={active === "payment"}
          stripeCustomerId={stripeCustomerId}
          createSubscriptionAction={createSubscriptionAction}
        />
      </CheckoutSection>
    </StripeProvider>
  );
}
