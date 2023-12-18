"use client";
import {
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Container } from "../brand-selection/Container";
import {
  AddressParam,
  StripeAddressElementChangeEvent,
  StripeAddressElementOptions,
} from "@stripe/stripe-js";
import { Button } from "@danklabs/pattern-library/core";
import { useRef, useState } from "react";
import { StripeProvider, createCustomer } from "@danklabs/cake/payments";
import { useQueryStringUpdater } from "../util/searchParams";

export function Address() {
  return (
    <Container>
      <StripeProvider options={{}}>
        <AddressComponent />
      </StripeProvider>
    </Container>
  );
}

function AddressComponent() {
  const updateQueryString = useQueryStringUpdater();
  const emailRef = useRef<HTMLInputElement>(null);
  const elements = useElements();
  const address = elements?.getElement("address");
  const [complete, setComplete] = useState(false);

  function handleAddressChange(e: StripeAddressElementChangeEvent) {
    if (e.complete !== complete) {
      setComplete(e.complete);
    }
  }

  async function handleSubmit() {
    if (!emailRef.current) {
      throw new Error("invalid input");
    }
    const email = emailRef.current.value;

    const address = await elements?.getElement("address")?.getValue();
    if (!address || !address?.complete) {
      throw new Error("invalid address");
    }

    address.value.name;

    const result = await createCustomer(
      email,
      address.value.name,
      address.value.address as AddressParam
    );
    console.log("created customer", result);

    updateQueryString("customerId", result.customerId);
    updateQueryString("step", "payment");
  }

  const addressOptions: StripeAddressElementOptions = {
    mode: "billing",
  };

  return (
    <>
      <h1>Address Yo</h1>
      <input type="email" placeholder="Email Address" ref={emailRef} />
      <AddressElement options={addressOptions} onChange={handleAddressChange} />
      <Button disabled={!complete} onClick={handleSubmit}>
        Continue
      </Button>
    </>
  );
}
