import { CheckoutClient } from "./CheckoutClient";

import {
  checkSubscriptionStatus,
  createStripeCustomer,
  createSubscription,
} from "./actions";

export type CheckoutProps = {
  priceId: string;
  userId?: string;
  userEmailAddress?: string;
  metadata?: any;
};

export function Checkout({
  priceId,
  userId,
  metadata,
  userEmailAddress,
}: CheckoutProps) {
  return (
    <CheckoutClient
      priceId={priceId}
      userId={userId}
      userEmailAddress={userEmailAddress}
      createStripeCustomerAction={createStripeCustomer.bind(
        undefined,
        userEmailAddress
      )}
      createSubscriptionAction={createSubscription.bind(
        undefined,
        priceId,
        metadata
      )}
      checkSubscriptionStatus={checkSubscriptionStatus}
    />
  );
}
