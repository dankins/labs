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
} from "@danklabs/pattern-library/core";
import { SubscriptionReturnType } from "./types";

export function Payment({
  active,
  stripeCustomerId,
  createSubscriptionAction,
}: {
  active: boolean;
  stripeCustomerId?: string;
  createSubscriptionAction(customerId: string): Promise<SubscriptionReturnType>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [subscriptionData, setSubscriptionData] = useState<
    SubscriptionReturnType | undefined
  >();
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
      console.log("setting subscription data", data);
      setSubscriptionData(data);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
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

  if (subscriptionData && subscriptionData.invoiceStatus === "paid") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <Paragraph1 className="text-lg">
          Good news! Your subscription has been fully comped and will be free of
          charge!
        </Paragraph1>
        <PrimaryButton
          href={`/invitation?step=checkout&redirect_status=succeeded&subscriptionId=${subscriptionData.subscriptionId}`}
        >
          Continue
        </PrimaryButton>
      </div>
    );
  }

  if (!clientSecret) {
    return <div>loading {JSON.stringify(subscriptionData, null, 2)}</div>;
  }

  return (
    <StripeProvider key={clientSecret} options={options}>
      <CartSummary subscriptionData={subscriptionData} />
      <PaymentForm />
    </StripeProvider>
  );
}

export function CartSummary({
  subscriptionData,
}: {
  subscriptionData?: SubscriptionReturnType;
}) {
  if (!subscriptionData) {
    return <></>;
  }
  return (
    <div>
      <div>Total: {subscriptionData.total}</div>
      <div>Total excluding tax: {subscriptionData.total_excluding_tax}</div>
      <div>
        Total excluding tax:{" "}
        {subscriptionData.total_discount_amounts?.map(
          (d) => `${d.discount} -> ${d.amount}`
        )}
      </div>
      <div>
        Total Tax:
        {subscriptionData.total_tax_amounts.map((tax) => tax.toLocaleString())}
      </div>
      <div>
        Total:
        {subscriptionData.total.toLocaleString()}
      </div>
      <div></div>
    </div>
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
