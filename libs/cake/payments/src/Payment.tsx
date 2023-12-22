import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { StripeProvider } from "./StripeProvider";
import {
  StripePaymentElementChangeEvent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { Button } from "@danklabs/pattern-library/core";

export function Payment({
  active,
  stripeCustomerId,
  createSubscriptionAction,
}: {
  active: boolean;
  stripeCustomerId?: string;
  createSubscriptionAction(
    customerId: string
  ): Promise<{ subscriptionId: string; clientSecret: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  useEffect(() => {
    // don't run if there is no customer object yet
    if (!stripeCustomerId) {
      return;
    }

    // if there is already a payment intent then we can return early
    if (sp.get("payment_intent_client_secret")) {
      setClientSecret(sp.get("payment_intent_client_secret")!);
      return;
    }

    createSubscriptionAction(stripeCustomerId).then((data) => {
      setClientSecret(data.clientSecret);
      const current = new URLSearchParams(Array.from(sp.entries()));
      current.set("subscriptionId", data.subscriptionId);
      let search = current.toString();
      search = search ? `?${search}` : "";
      router.push(`${pathname}${search}`);
    });
  }, [stripeCustomerId]);

  const options = useMemo(() => {
    if (clientSecret) {
      return { clientSecret };
    }
    return {};
  }, [clientSecret]);

  if (!active) {
    return <div>payment (not active)</div>;
  }
  if (!stripeCustomerId) {
    return <div>error: no customer id</div>;
  }

  if (!clientSecret) {
    return <div>loading</div>;
  }

  return (
    <StripeProvider key={clientSecret} options={options}>
      <PaymentForm />
    </StripeProvider>
  );
}

export function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  let successURL: URL;
  if (typeof window !== "undefined" && window.location.href) {
    successURL = new URL(window.location.href);
    successURL.searchParams.set("success", "true");
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  async function handleSubmit() {
    console.log("submit payment");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successURL.href,
      },
    });
    setLoading(false);
  }

  function handlePaymentChange(e: StripePaymentElementChangeEvent) {
    console.log("payment change", e);
    if (e.complete !== formComplete) {
      setFormComplete(e.complete);
    }
  }

  return (
    <>
      <PaymentElement
        options={paymentElementOptions}
        onChange={handlePaymentChange}
      />
      <div className="my-5">
        <Button
          onClick={handleSubmit}
          disabled={!formComplete || !stripe || !elements || loading}
        >
          Purchase Membership
        </Button>
      </div>
    </>
  );
}
