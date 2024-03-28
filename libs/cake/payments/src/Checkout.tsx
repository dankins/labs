import { CheckoutClient } from "./CheckoutClient";

import {
  checkSubscriptionStatus,
  createSubscription,
  createAccount,
} from "./actions";

export type CheckoutProps = {
  cartId: string;
  priceId: string;
  stripeCustomerId: string;
  couponId?: string;
  metadata?: any;
};

export function Checkout({
  cartId,
  priceId,
  couponId,
  stripeCustomerId,
  metadata,
}: CheckoutProps) {
  return (
    <CheckoutClient
      stripeCustomerId={stripeCustomerId}
      createSubscriptionAction={createSubscription.bind(
        undefined,
        cartId,
        priceId,
        couponId,
        metadata
      )}
      checkSubscriptionStatus={checkSubscriptionStatus}
      createAccount={createAccount}
    />
  );
}
