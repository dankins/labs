import {
  getPaymentMethod,
  getStripeMembership,
} from "@danklabs/cake/services/admin-service";
import dayjs from "dayjs";
import { Suspense } from "react";

export async function SubscriptionInfo({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}

async function Component({ iam }: { iam: string }) {
  const subscription = await getStripeMembership(iam);

  if (!subscription) {
    return <div>No Subscription Info</div>;
  }

  return (
    <div>
      <h1>
        Subscription renews{" "}
        {dayjs.unix(subscription.current_period_end).format()}
      </h1>
      <PaymentMethod
        paymentMethodId={subscription.default_payment_method as string}
      />
    </div>
  );
}

export async function PaymentMethod({
  paymentMethodId,
}: {
  paymentMethodId: string;
}) {
  const paymentMethod = await getPaymentMethod(paymentMethodId);

  return <div>Credit card last 4: {paymentMethod.card?.last4}</div>;
}
