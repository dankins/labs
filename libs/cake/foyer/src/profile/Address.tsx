import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  EmailIcon,
  PrimaryButton,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";

export function Address({
  action,
}: {
  action(formDat: FormData): Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);

  function checkValidity() {
    if (formRef.current) {
      const newIsValid = formRef.current.checkValidity();
      if (newIsValid != isValid) {
        setIsValid(newIsValid);
      }
    }
  }

  return (
    <form
      className="w-full"
      ref={formRef}
      action={action}
      onChange={checkValidity}
    >
      <AddressForm isValid={isValid} />
    </form>
  );
}

export function AddressForm({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-normal text-primary">Gifts are nice</h1>
        <p>We like to send our members gifts. What address should we use?</p>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <TextInput
          name="address1"
          label="Address Line 1"
          icon={<UserIcon />}
          required
        />
        <TextInput name="address2" label="Address Line 2" icon={<UserIcon />} />
        <TextInput name="city" label="City" icon={<UserIcon />} required />
        <TextInput name="state" label="State" icon={<UserIcon />} required />
        <TextInput
          name="postalCode"
          label="Zip Code"
          icon={<UserIcon />}
          required
        />
      </div>
      <PrimaryButton
        className="mt-4"
        disabled={!isValid || pending}
        type="submit"
      >
        Continue
      </PrimaryButton>
    </>
  );
}
