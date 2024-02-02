import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useInterval } from "usehooks-ts";

export function Success({
  checkSubscriptionStatus,
}: {
  checkSubscriptionStatus(
    subscriptionId: string
  ): Promise<{ status: "complete" | "incomplete" | "pending" }>;
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["invitation-cart"]);
  const sp = useSearchParams();
  const router = useRouter();
  const subscriptionId = sp.get("subscriptionId");
  useInterval(async () => {
    if (subscriptionId) {
      const result = await checkSubscriptionStatus(subscriptionId);
      console.log("result", result);
      if (result.status === "complete") {
        router.push("/");
      }
    }
  }, 3000);

  useEffect(() => {
    removeCookie("invitation-cart");
  }, []);

  // payment_intent_client_secret, payment_intent, redirect_status=succeeded, success=true

  return (
    <div>
      <h1>Success!</h1>
    </div>
  );
}
