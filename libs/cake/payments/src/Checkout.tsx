import { Suspense } from "react";
import { CheckoutClient } from "./CheckoutClient";

import { checkSubscriptionStatus, createSubscription } from "./actions";
import {
  Paragraph1,
  PrimaryButton,
  Spinner,
} from "@danklabs/pattern-library/core";
import { Success } from "./Success";
import { LogoMark } from "@danklabs/cake/pattern-library/core";

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

  console.log("render checkout", result);

  if (result.invoiceStatus === "paid") {
    return (
      <>
        <Summary totalPrice={result.total} />
        <div className="mt-8 flex flex-col gap-4 items-center justify-center text-center">
          <Paragraph1 className="text-lg">
            Good news! Your subscription has been fully comped and will be free
            of charge!
          </Paragraph1>
          <PrimaryButton
            href={`/invitation?step=checkout&redirect_status=succeeded&subscriptionId=${result.subscriptionId}`}
          >
            Continue
          </PrimaryButton>
        </div>
      </>
    );
  }

  if (!result.clientSecret) {
    throw new Error("invalid state - no client secret");
  }

  return (
    <>
      <Summary totalPrice={result.total} />

      <div className="mt-8">
        <CheckoutClient
          clientSecret={result.clientSecret}
          stripeCustomerId={stripeCustomerId}
          subscriptionId={result.subscriptionId}
        />
      </div>
    </>
  );
}

function Summary({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="flex flex-row gap-3 border border-[#E4D6C8] p-3">
      <div className="p-3 h-12 w-12 rounded-full bg-dark ">
        <LogoMark className="h-6 w-6" />
      </div>
      <div className="flex flex-col grow">
        <div className="uppercase font-supreme text-xl">Cake Membership</div>
        <div className="font-apris text-lg">12 month Membership</div>
      </div>
      <div className="flex flex-col items-end font-apris">
        <div>${(totalPrice / 100).toLocaleString()}/yr.</div>
        <div className="text-secondary">FREE</div>
      </div>
    </div>
  );
}
