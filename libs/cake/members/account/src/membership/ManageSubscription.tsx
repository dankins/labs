import { auth, currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import Stripe from "stripe";
import { CancelSubscription } from "./CancelSubscription";
import { ResumeSubscription } from "./ResumeSubscription";
import { members } from "@danklabs/cake/services/admin-service";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

type StripeSubscription = Awaited<
  ReturnType<typeof stripe.subscriptions.retrieve>
>;

export async function ManageSubscription() {
  const { userId } = auth().protect();
  const member = await members.member.get(userId);
  const subscriptionId = member.stripeSubscriptionId;
  if (!subscriptionId) {
    throw new Error("no subscription id");
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (subscription.cancel_at_period_end) {
    return <PausedSubscription subscription={subscription} />;
  }
  if (subscription.canceled_at) {
    return <CancelledSubscription subscription={subscription} />;
  }
  return <ActiveSubscription subscription={subscription} />;
}

export async function PaymentMethod({
  paymentMethodId,
}: {
  paymentMethodId: string;
}) {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  return <div>paymentMethod: {paymentMethod.card?.last4}</div>;
}

async function ActiveSubscription({
  subscription,
}: {
  subscription: StripeSubscription;
}) {
  return (
    <div>
      <h1>
        Subscription renews{" "}
        {dayjs.unix(subscription.current_period_end).format()}
      </h1>
      <PaymentMethod
        paymentMethodId={subscription.default_payment_method as string}
      />
      <CancelSubscription subscriptionId={subscription.id} />
    </div>
  );
}

async function PausedSubscription({
  subscription,
}: {
  subscription: StripeSubscription;
}) {
  return (
    <div>
      <h1>
        Your subscription is currently set to cancel on{" "}
        {dayjs.unix(subscription.cancel_at!).format()}
      </h1>
      <PaymentMethod
        paymentMethodId={subscription.default_payment_method as string}
      />
      <ResumeSubscription subscriptionId={subscription.id} />
    </div>
  );
}

async function CancelledSubscription({
  subscription,
}: {
  subscription: StripeSubscription;
}) {
  return (
    <div>
      <h1>
        Your subscription was cancelled on{" "}
        {dayjs.unix(subscription.cancel_at!).format()}
      </h1>
    </div>
  );
}
