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

export type CheckoutProps = {
  priceId: string;
  userId?: string;
  userEmailAddress?: string;
  createStripeCustomerAction(
    address: StripeAddressElementChangeEvent["value"]
  ): Promise<{ customerId: string }>;
  createSubscriptionAction(
    customerId: string
  ): Promise<{ subscriptionId: string; clientSecret: string }>;
  checkSubscriptionStatus(subscriptionId: string): Promise<{
    status: "incomplete" | "pending" | "complete";
  }>;
};

export type StripeCustomer = {
  stripeCustomerId: string;
  billingAddress: StripeAddressElementChangeEvent["value"];
};

export function CheckoutClient({
  userId,
  userEmailAddress,
  createStripeCustomerAction,
  createSubscriptionAction,
  checkSubscriptionStatus,
}: CheckoutProps) {
  const sp = useSearchParams();
  const [stripeCustomer, setStripeCustomer] = useState<StripeCustomer>();
  let active: "account" | "billing" | "shipping" | "payment" | "success" =
    "account";

  async function handleAddressSubmit(
    address: StripeAddressElementChangeEvent["value"]
  ) {
    const result = await createStripeCustomerAction(address);
    console.log("created customer", result, result.customerId);
    setStripeCustomer({
      stripeCustomerId: result.customerId,
      billingAddress: address,
    });
  }

  if (!userId || !userEmailAddress) {
    active = "account";
  } else if (!stripeCustomer) {
    active = "billing";
  } else {
    active = "payment";
  }

  if (sp.get("redirect_status") && sp.get("redirect_status") === "succeeded") {
    return <Success checkSubscriptionStatus={checkSubscriptionStatus} />;
  }

  return (
    <StripeProvider options={{}}>
      <CheckoutSection>
        <Account
          active={active === "account"}
          userId={userId}
          userEmailAddress={userEmailAddress}
        />
      </CheckoutSection>
      <CheckoutSection>
        <Address
          mode={"billing"}
          active={active === "billing"}
          emailAddress={userEmailAddress}
          stripeCustomer={stripeCustomer}
          onSubmit={handleAddressSubmit}
        />
      </CheckoutSection>
      <CheckoutSection>
        <Payment
          active={active === "payment"}
          stripeCustomerId={stripeCustomer?.stripeCustomerId}
          createSubscriptionAction={createSubscriptionAction}
        />
      </CheckoutSection>
    </StripeProvider>
  );
}
