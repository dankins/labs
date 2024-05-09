import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
  TextInput,
} from "@danklabs/pattern-library/core";
import { setName } from "./actions";

export function Payment({
  active,
  stripeCustomerId,
  subscriptionId,
  clientSecret,
  returnUrl,
}: {
  active: boolean;
  stripeCustomerId: string;
  subscriptionId: string;
  clientSecret: string;
  returnUrl: string;
}) {
  const options = { clientSecret };

  if (!active) {
    return <div>payment (not active)</div>;
  }
  if (!stripeCustomerId) {
    return <div>error: no customer id</div>;
  }

  if (!clientSecret) {
    return <Spinner />;
  }

  return (
    <StripeProvider key={clientSecret} options={options}>
      <PaymentForm returnUrl={returnUrl} subscriptionId={subscriptionId} />
    </StripeProvider>
  );
}

export function PaymentForm({
  subscriptionId,
  returnUrl,
}: {
  subscriptionId: string;
  returnUrl: string;
}) {
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [error, setError] = useState<string>();
  const stripe = useStripe();
  const elements = useElements();
  const sp = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // let successURL: URL;
  // if (typeof window !== "undefined" && window.location.href) {
  //   successURL = new URL(window.location.href);
  //   successURL.searchParams.set("success", "true");
  //   successURL.searchParams.set("subscriptionId", subscriptionId);
  // }

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
    try {
      const isValid = formRef.current?.checkValidity();
      const formData = new FormData(formRef.current!);
      await setName(formData);
    } catch (err) {
      console.error("error", err);
      setLoading(false);
      setError("Email address already exists");
      return;
    }
    let successURL: string = "";
    if (typeof window !== "undefined" && window.location.href) {
      const currentUrl = new URL(window.location.href);
      successURL = `${currentUrl.origin}${returnUrl}`;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successURL,
      },
    });
    if (error) {
      setError(error.message);
    }
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
      <form ref={formRef} className="mb-4">
        <TextInput name="email" label="Email Address" />
        <div className="flex flex-row items-center gap-2">
          <TextInput name="firstName" label="First Name" />
          <TextInput name="lastName" label="Last Name" />
        </div>
      </form>
      <PaymentElement
        options={paymentElementOptions}
        onChange={handlePaymentChange}
      />
      <div className="my-5">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!formComplete || !stripe || !elements || loading}
        >
          Activate Membership
        </PrimaryButton>
      </div>
      {error && <Paragraph1 className="text-red-500">{error}</Paragraph1>}
    </>
  );
}
