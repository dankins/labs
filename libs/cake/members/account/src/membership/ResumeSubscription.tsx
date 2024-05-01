import { ConfirmationButton, FormState } from "@danklabs/pattern-library/core";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export function ResumeSubscription({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  async function resumeSubscriptionAction(
    subscriptionId: string
  ): Promise<FormState> {
    "use server";
    const result = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    console.log("subscription cancel result", result);
    revalidatePath("/account/membership");
    return { status: "success", message: "Subscription resumed" };
  }

  return (
    <div>
      <ConfirmationButton
        action={resumeSubscriptionAction.bind(undefined, subscriptionId)}
        confirmMessage={
          "Are you sure you want to resume your subscription? We will automatically charge your payment method on your previous renewal date."
        }
        confirmCta={"Yes, Resume"}
        rejectCta={"No, Keep"}
      >
        Resume Subscription
      </ConfirmationButton>
    </div>
  );
}
