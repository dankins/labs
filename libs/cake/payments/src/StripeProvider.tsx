"use client";
import React, { useEffect, useState } from "react";
import { Stripe, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePublishableKey = process.env["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"]!;

export function StripeProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options: StripeElementsOptions;
}) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    loadStripe(stripePublishableKey)
  );

  return (
    <Elements
      key={options.clientSecret}
      stripe={stripePromise}
      options={options}
    >
      {children}
    </Elements>
  );
}
