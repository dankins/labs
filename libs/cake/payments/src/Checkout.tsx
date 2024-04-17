import { Suspense } from "react";
import { CheckoutClient } from "./CheckoutClient";

import { checkSubscriptionStatus, createSubscription } from "./actions";
import { Spinner } from "@danklabs/pattern-library/core";
import { Success } from "./Success";

export type CheckoutProps = {
  priceId: string;
  stripeCustomerId: string;
  couponId?: string;
  metadata?: any;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function Checkout(props: CheckoutProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}

export function Loading() {
  return <Spinner />;
}

export async function Component({
  searchParams,
  priceId,
  couponId,
  metadata,
  stripeCustomerId,
}: CheckoutProps) {
  const result = await createSubscription(
    priceId,
    couponId,
    metadata,
    stripeCustomerId
  );

  if (
    searchParams["redirect_status"] &&
    searchParams["redirect_status"] === "succeeded"
  ) {
    return <Success checkSubscriptionStatus={checkSubscriptionStatus} />;
  }

  console.log("render checkout", result.clientSecret);

  if (!result.clientSecret || !result.invoiceStatus) {
    throw new Error("invalid state - no client secret or invoice");
  }

  return (
    <>
      <div>
        <div>Total: {result.total}</div>
        <div>Total excluding tax: {result.total_excluding_tax}</div>
        <div>
          Total excluding tax:{" "}
          {result.total_discount_amounts?.map(
            (d) => `${d.discount} -> ${d.amount}`
          )}
        </div>
        <div>
          Total Tax:
          {result.total_tax_amounts.map((tax) => tax.toLocaleString())}
        </div>
        <div>
          Total:
          {result.total.toLocaleString()}
        </div>
        <div></div>
      </div>

      <CheckoutClient
        clientSecret={result.clientSecret}
        stripeCustomerId={stripeCustomerId}
        subscriptionId={result.subscriptionId}
        invoiceStatus={result.invoiceStatus}
      />
    </>
  );
}
