import { Button, Checkbox } from "@danklabs/pattern-library/core";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

export function ContactMethod({
  email,
  phone,
  action,
}: {
  email: string;
  phone?: string;
  action(formDat: FormData): Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={action}>
      <FormContent email={email} phone={phone} />
    </form>
  );
}

function FormContent({ email, phone }: { email: string; phone?: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <h1 className="text-xl font-normal text-primary">Contact Method</h1>
        <p>How would you like to stay informed?</p>
      </div>
      <div className="mt-8 flex flex-col gap-6 text-white">
        <Checkbox name="email" label="Email me periodically" />
        <Checkbox name="text" label="Text me with amazing offers" />
      </div>

      <Button className="mt-4" disabled={pending} type="submit">
        Continue
      </Button>
    </>
  );
}
