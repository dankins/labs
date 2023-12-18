import {
  Checkout,
  createCustomer,
  createSubscription,
} from "@danklabs/cake/payments";

import { Container } from "../brand-selection/Container";

const SUBSCRIPTION_PRICE_ID = "price_1OMByvFp1nXP3WhKTbP8y1CW";

export function Payment({ customerId }: { customerId?: string }) {
  if (!customerId) {
    return (
      <Container>
        <h1>Error loading state: no customerId present</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Payment Yo</h1>
      <Checkout
        customerId={customerId}
        priceId={SUBSCRIPTION_PRICE_ID}
        createSubscription={createSubscription}
      />
    </Container>
  );
}
