"use client";
import { useState } from "react";

import { z } from "zod";
import { completeAccountStepAction } from "./action";
import { Signup } from "@danklabs/cake/auth";
import { PrimaryButton } from "@danklabs/pattern-library/core";

export const nameSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
});
export type Name = z.infer<typeof nameSchema>;

export const addressSchema = z.object({
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
});
export type Address = z.infer<typeof addressSchema>;

export const contactSchema = z.object({
  email: z
    .string()
    .transform((value) => value === "on")
    .optional(),
  text: z
    .string()
    .transform((value) => value === "on")
    .optional(),
});
export type Contact = z.infer<typeof contactSchema>;

type NameState = {
  step: "name";
};
type AddressState = {
  step: "address";
  name: Name;
};
type CreateAccountState = {
  step: "createAccount";
  name: Name;
  address: Address;
};
type ContactMethodState = {
  step: "contact";
  name: Name;
  address: Address;
};

type State = NameState | AddressState | CreateAccountState | ContactMethodState;

export function AccountStep({ email }: { email: string }) {
  const [state, setState] = useState<State>({ step: "name" });

  function handleAccountCreated() {
    if (state.step !== "createAccount") {
      throw new Error("invalid state");
    }
    setState({
      step: "contact",
      name: state.name,
      address: state.address,
    });
  }

  return (
    <div className="p-4 max-w-[400px]">
      <Signup
        onSignUpSuccess={handleAccountCreated}
        alreadyLoggedInButton={
          <PrimaryButton href={`/invitation?step=checkout`}>
            Continue
          </PrimaryButton>
        }
        socialRedirectUrl="/invitation?step=account"
        defaultEmail={email}
      />
    </div>
  );
}
