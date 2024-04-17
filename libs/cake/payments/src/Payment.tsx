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
import {
  Button,
  Paragraph1,
  PrimaryButton,
  Spinner,
} from "@danklabs/pattern-library/core";

export function Payment({
  active,
  stripeCustomerId,
  subscriptionId,
  invoiceStatus,
  clientSecret,
}: {
  active: boolean;
  stripeCustomerId: string;
  subscriptionId: string;
  invoiceStatus: string | null;
  clientSecret: string;
}) {
  const options = { clientSecret };

  if (!active) {
    return <div>payment (not active)</div>;
  }
  if (!stripeCustomerId) {
    return <div>error: no customer id</div>;
  }

  if (invoiceStatus === "paid") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <Paragraph1 className="text-lg">
          Good news! Your subscription has been fully comped and will be free of
          charge!
        </Paragraph1>
        <PrimaryButton
          href={`/invitation?step=checkout&redirect_status=succeeded&subscriptionId=${subscriptionId}`}
        >
          Continue
        </PrimaryButton>
      </div>
    );
  }

  if (!clientSecret) {
    return <Spinner />;
  }

  return (
    <StripeProvider key={clientSecret} options={options}>
      <PaymentForm subscriptionId={subscriptionId} />
    </StripeProvider>
  );
}

export function PaymentForm({ subscriptionId }: { subscriptionId: string }) {
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const sp = useSearchParams();
  let active = "payment";

  let successURL: URL;
  if (typeof window !== "undefined" && window.location.href) {
    successURL = new URL(window.location.href);
    successURL.searchParams.set("success", "true");
    successURL.searchParams.set("subscriptionId", subscriptionId);
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
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!formComplete || !stripe || !elements || loading}
        >
          Purchase Membership
        </PrimaryButton>
      </div>
    </>
  );
}
