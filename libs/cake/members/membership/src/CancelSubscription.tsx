import { ConfirmationButton } from "@danklabs/pattern-library/core";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export function CancelSubscription({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  async function cancelSubscriptionAction(subscriptionId: string) {
    "use server";
    const result = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    console.log("subscription cancel result", result);
    revalidatePath("/account/membership");
    return true;
  }
  return (
    <div>
      <ConfirmationButton
        action={cancelSubscriptionAction.bind(undefined, subscriptionId)}
        confirmMessage={
          "Are you sure you want to cancel your subscription? This cannot be undone."
        }
        confirmCta={"Yes, Cancel"}
        rejectCta={"No, Keep"}
      >
        Cancel Subscription
      </ConfirmationButton>
    </div>
  );
}
