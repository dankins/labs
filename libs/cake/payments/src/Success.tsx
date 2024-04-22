"use client";
import { Heading4, Paragraph3, Spinner } from "@danklabs/pattern-library/core";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export function Success({
  checkSubscriptionStatus,
}: {
  checkSubscriptionStatus(
    subscriptionId: string
  ): Promise<{ status: "complete" | "incomplete" | "pending" }>;
}) {
  const [working, setWorking] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const subscriptionId = sp.get("subscriptionId");
  useInterval(async () => {
    if (subscriptionId && !working) {
      setWorking(true);
      const result = await checkSubscriptionStatus(subscriptionId);
      console.log("result", result);
      if (result.status === "complete") {
        router.push("/collection");
      }
      setWorking(false);
    }
  }, 3000);

  // payment_intent_client_secret, payment_intent, redirect_status=succeeded, success=true

  return (
    <div>
      <Heading4>Success!</Heading4>
      <Paragraph3>Please wait while we set up your account...</Paragraph3>
      <Spinner />
    </div>
  );
}
