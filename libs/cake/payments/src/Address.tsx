import { Button } from "@danklabs/pattern-library/core";
import { useElements, AddressElement } from "@stripe/react-stripe-js";
import {
  StripeAddressElementChangeEvent,
  AddressParam,
  StripeAddressElementOptions,
} from "@stripe/stripe-js";
import { useState } from "react";
import { StripeCustomer } from "./CheckoutClient";

export type AddressProps = {
  mode: "shipping" | "billing";
  active?: boolean;
  emailAddress?: string;
  stripeCustomer?: StripeCustomer;
  onSubmit(address: StripeAddressElementChangeEvent["value"]): void;
};

export function Address({
  mode,
  active,
  emailAddress,
  stripeCustomer,
  onSubmit,
}: AddressProps) {
  // const updateQueryString = useQueryStringUpdater();
  const elements = useElements();
  const [complete, setComplete] = useState(false);

  function handleAddressChange(e: StripeAddressElementChangeEvent) {
    if (e.complete !== complete) {
      setComplete(e.complete);
    }
  }

  async function handleSubmit() {
    const address = await elements?.getElement("address")?.getValue();
    if (!address || !address?.complete) {
      throw new Error("invalid address");
    }
    onSubmit(address.value);
  }

  if (stripeCustomer) {
    return (
      <div>
        <h1 className="capitalize">{mode} Address</h1>
        <div>
          <div>{stripeCustomer.billingAddress.name}</div>
          <div>{stripeCustomer.billingAddress.address.line1}</div>
          {stripeCustomer.billingAddress.address.line2 && (
            <div>{stripeCustomer.billingAddress.address.line2}</div>
          )}
          <div>
            {stripeCustomer.billingAddress.address.city},
            {stripeCustomer.billingAddress.address.state}{" "}
            {stripeCustomer.billingAddress.address.postal_code}{" "}
          </div>
          <div>{stripeCustomer.billingAddress.address.country}</div>
        </div>
      </div>
    );
  }

  if (!active) {
    return (
      <div>
        <h1 className="capitalize">{mode} Address</h1>
        <div>Not active</div>
      </div>
    );
  }
  if (!emailAddress) {
    return <div>no email address</div>;
  }

  const addressOptions: StripeAddressElementOptions = {
    mode,
  };

  return (
    <>
      <h1 className="capitalize">{mode} Address</h1>
      <div className="flex flex-col gap-3 py-5">
        <AddressElement
          options={addressOptions}
          onChange={handleAddressChange}
        />
      </div>

      <Button disabled={!complete} onClick={handleSubmit}>
        Continue
      </Button>
    </>
  );
}
