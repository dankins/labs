"use client";
import { useState } from "react";

import { Address } from "./Address";
import { Name } from "./Name";
import { ContactMethod } from "./ContactMethod";
import { CreateAccount } from "./CreateAccount";
import { validateFormData } from "@danklabs/utils";
import { z } from "zod";
import { completeAccountStepAction } from "./action";

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

  async function updateName(formData: FormData) {
    const data = validateFormData(formData, nameSchema);

    console.log("name submitted", data);
    setState({
      step: "address",
      name: data,
    });
  }

  async function updateAddress(formData: FormData) {
    if (state.step !== "address") {
      throw new Error("invalid state");
    }
    const address = validateFormData(formData, addressSchema);

    console.log("address submitted", address);
    setState({
      step: "createAccount",
      name: state.name,
      address,
    });
  }

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

  async function updateContactMethod(formData: FormData) {
    if (state.step !== "contact") {
      throw new Error("invalid state");
    }
    const contact = validateFormData(formData, contactSchema);

    console.log("contact submitted", contact);
    await completeAccountStepAction(email, state.name, state.address, contact);
  }

  let component;
  switch (state.step) {
    case "name":
      component = (
        <>
          <Name email={email} action={updateName} />
        </>
      );
      break;
    case "address":
      component = (
        <>
          <Address action={updateAddress} />
        </>
      );
      break;
    case "createAccount":
      component = (
        <>
          <CreateAccount
            email={email}
            firstName={state.name.firstname}
            lastName={state.name.lastname}
            onComplete={handleAccountCreated}
          />
        </>
      );
      break;
    case "contact":
      component = (
        <>
          <ContactMethod email={email} action={updateContactMethod} />
        </>
      );
      break;
  }

  return <div className="p-4">{component}</div>;
}
