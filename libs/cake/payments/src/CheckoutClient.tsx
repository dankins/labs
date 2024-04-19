"use client";

import { StripeProvider } from "./StripeProvider";
import { Payment } from "./Payment";

export type CheckoutProps = {
  stripeCustomerId: string;
  subscriptionId: string;
  invoiceStatus: string;
  clientSecret: string;
};

export function CheckoutClient({
  subscriptionId,
  stripeCustomerId,
  invoiceStatus,
  clientSecret,
}: CheckoutProps) {
  let active = "payment";

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
      <Payment
        active={active === "payment"}
        clientSecret={clientSecret}
        stripeCustomerId={stripeCustomerId}
        subscriptionId={subscriptionId}
        invoiceStatus={invoiceStatus}
      />
    </StripeProvider>
  );
}
