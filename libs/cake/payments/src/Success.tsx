"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useInterval } from "usehooks-ts";

export function Success({
  checkSubscriptionStatus,
}: {
  checkSubscriptionStatus(
    subscriptionId: string
  ): Promise<{ status: "complete" | "incomplete" | "pending" }>;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const subscriptionId = sp.get("subscriptionId");
  useInterval(async () => {
    if (subscriptionId) {
      const result = await checkSubscriptionStatus(subscriptionId);
      console.log("result", result);
      if (result.status === "complete") {
        router.push("/collection");
      }
    }
  }, 3000);

  // payment_intent_client_secret, payment_intent, redirect_status=succeeded, success=true

  return (
    <div>
      <h1>Success!</h1>
    </div>
  );
}
