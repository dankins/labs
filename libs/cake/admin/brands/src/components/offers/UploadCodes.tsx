"use client";

import { Button, TextArea } from "@danklabs/pattern-library/core";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

export function UploadCodes({
  createCodesAction,
}: {
  createCodesAction(formData: FormData): Promise<void>;
}) {
  const ref = useRef<HTMLFormElement>(null);
  async function handleSubmit(formData: FormData) {
    await createCodesAction(formData);
    ref.current?.reset();
  }
  return (
    <form className="flex flex-col gap-3" action={handleSubmit} ref={ref}>
      <FormBody />
    </form>
  );
}

function FormBody() {
  const { pending } = useFormStatus();
  return (
    <>
      <TextArea
        label="Codes, one per line"
        placeholder="Copy and paste codes, one per line"
        name="codes"
        disabled={pending}
      />
      <Button disabled={pending}>Upload Codes</Button>
    </>
  );
}
