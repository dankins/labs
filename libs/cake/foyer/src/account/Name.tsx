import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  EmailIcon,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";

export function Name({
  email,
  action,
}: {
  email: string;
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
      <NameForm isValid={isValid} email={email} />
    </form>
  );
}

export function NameForm({
  isValid,
  email,
}: {
  isValid: boolean;
  email: string;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <h1 className="text-xl font-normal text-primary">Cake is personal</h1>
        <p>Tell us a bit about yourself</p>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <TextInput
          name="email"
          label="Email"
          icon={<EmailIcon />}
          defaultValue={email}
          disabled
        />

        <TextInput
          name="firstname"
          label="First Name"
          icon={<UserIcon />}
          required
        />
        <TextInput
          name="lastname"
          label="Last Name"
          icon={<UserIcon />}
          required
        />
        <TextInput
          name="phone"
          label="Phone Number (optional)"
          icon={<UserIcon />}
        />
      </div>
      <Button className="mt-4" disabled={!isValid || pending} type="submit">
        Continue
      </Button>
    </>
  );
}
