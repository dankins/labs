"use client";
import React, { useEffect, useMemo, useState } from "react";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@danklabs/pattern-library/core";
import { StripeProvider } from "./StripeProvider";

export type CheckoutProps = {
  customerId: string;
  priceId: string;
  createSubscription(
    priceId: string,
    customerId: string
  ): Promise<{ subscriptionId: string; clientSecret: string }>;
};
export function Checkout({
  customerId,
  priceId,
  createSubscription,
}: CheckoutProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(
    sp.get("payment_intent_client_secret")
  );

  useEffect(() => {
    // don't run if there is no customer object yet
    if (!customerId) {
      return;
    }

    // if there is already a payment intent then we can return early
    if (sp.get("payment_intent_client_secret")) {
      setClientSecret(sp.get("payment_intent_client_secret")!);
      return;
    }

    createSubscription(priceId, customerId).then((data) => {
      console.log("creating subscription yo", data);
      setClientSecret(data.clientSecret);
      // router.replace()
    });
  }, [customerId]);

  const options = useMemo(() => {
    if (clientSecret) {
      return { clientSecret };
    }
    return {};
  }, [clientSecret]);

  if (!clientSecret) {
    return <div>loading</div>;
  }

  if (sp.get("success") && sp.get("success") === "true") {
    return <CheckoutSuccess />;
  }

  return (
    <StripeProvider options={options}>
      <CheckoutForm />
    </StripeProvider>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  let successURL: URL;
  if (typeof window !== "undefined" && window.location.href) {
    successURL = new URL(window.location.href);
    successURL.searchParams.set("success", "true");
  }

  async function completeCheckoutAction(e: any) {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: successURL.href,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  return (
    <>
      <PaymentElement />
      <Button disabled={isLoading} onClick={completeCheckoutAction}>
        Submit
      </Button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </>
  );
}

export function CheckoutSuccess() {
  return <div>success!!</div>;
}
