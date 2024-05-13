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
      if (result.status === "complete") {
        router.push("/invitation?step=post-checkout");
      }
      setWorking(false);
    }
  }, 3000);

  return (
    <div>
      <Heading4>Success!</Heading4>
      <Paragraph3>Please wait while we set up your account...</Paragraph3>
      <Spinner />
    </div>
  );
}
