import { Heading4, Spinner, Text } from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";
import { SearchParams } from "@danklabs/utils";
import { invitations, stripe } from "@danklabs/cake/services/admin-service";
import { ErrorScreen } from "../error/ErrorScreen";
import { Suspense } from "react";
import { AccountCreation } from "./AccountCreation";
import { getCart, getCartIfAvailable } from "@danklabs/cake/payments";

export async function AccountStep({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const paymentIntent = searchParams?.payment_intent;

  return (
    <Suspense fallback={<Loading />}>
      <Component paymentIntent={paymentIntent} />
    </Suspense>
  );
}

function Loading() {
  return (
    <FoyerContainer checkoutShortcut={false}>
      <div>
        <Spinner />
      </div>
    </FoyerContainer>
  );
}

async function Component({
  paymentIntent,
}: {
  paymentIntent?: string | string[];
}) {
  const cart = getCartIfAvailable();
  if (!cart) {
    return <ErrorScreen error="NO_CART_AVAILABLE" />;
  }
  if (!cart.code) {
    return <ErrorScreen error="NO_INVITATION_AVAILABLE" />;
  }

  if (paymentIntent) {
    const pi = await stripe.payments.getPaymentIntent(paymentIntent as string);
    if (!pi) {
      return <ErrorScreen error="INVALID_PAYMENT_INTENT" />;
    }

    if (pi.status !== "succeeded") {
      return <ErrorScreen error="PAYMENT_FAILED" />;
    }
  } else {
    const customer = await stripe.payments.getCustomer(cart.id);
    const subcription = await stripe.payments.getSubscriptionByCustomerId(
      customer.id
    );
    if (!subcription) {
      return <ErrorScreen error="NO_SUBSCRIPTION" />;
    }
  }

  const invitation = await invitations.getByCode.cached(cart.code);
  if (!invitation) {
    return <ErrorScreen error="NO_INVITATION_AVAILABLE" />;
  }
  if (!cart.firstName || !cart.lastName) {
    return <ErrorScreen error="NO_NAME" />;
  }

  return (
    <FoyerContainer checkoutShortcut={false}>
      <AccountCreation
        providedEmail={cart.email}
        firstName={cart.firstName}
        lastName={cart.lastName}
      />
    </FoyerContainer>
  );
}

// http://localhost:4300/invitation?
// step = post - checkout &
// payment_intent = pi_3PEX8NHnJcBv7Ja00XbK25Ln
// &payment_intent_client_secret=pi_3PEX8NHnJcBv7Ja00XbK25Ln_secret_Q4fSfBI1eILqUjtC0i8h0VUwG
//&redirect_status=succeeded
