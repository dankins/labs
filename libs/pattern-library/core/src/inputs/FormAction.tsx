"use client";

import { Paragraph3, PrimaryButton } from "@danklabs/pattern-library/core";
import { form } from "@segment/analytics-next/dist/types/core/auto-track";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export type FormState =
  | { status: "start" }
  | { status: "success"; message?: string }
  | {
      status: "error";
      fieldErrors?: { [name: string]: { message: string } };
      message: string;
    };

const initialState: FormState = {
  status: "start",
};

export function FormAction({
  action,
  cta,
  children,
  className,
}: {
  action(previousState: FormState, formData: FormData): Promise<FormState>;
  cta: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [formValid, setFormValid] = useState(false);
  const [state, formAction] = useFormState(handler, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  async function handler(
    previousState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const result = await action(previousState, formData);

    if (result.status === "success" && formRef && formRef.current) {
      formRef.current.reset();
    }
    return result;
  }

  function handleChange() {
    if (formRef && formRef.current) {
      const newFormValid = formRef.current.checkValidity();
      if (newFormValid !== formValid) {
        setFormValid(newFormValid);
      }
    }
  }

  return (
    <form
      action={formAction}
      className={className}
      ref={formRef}
      onChange={handleChange}
    >
      {children}
      {state.status === "error" && (
        <Paragraph3 className="text-secondary">{state.message}</Paragraph3>
      )}
      <SubmitButton cta={cta} formValid={formValid} />
      {state.status === "success" && <Paragraph3>{state.message}</Paragraph3>}
    </form>
  );
}

function SubmitButton({
  cta,
  formValid,
}: {
  cta: React.ReactNode;
  formValid: boolean;
}) {
  const status = useFormStatus();
  return (
    <div className="flex flex-row justify-center">
      <PrimaryButton
        type="submit"
        loading={status.pending}
        disabled={status.pending || !formValid}
      >
        {cta}
      </PrimaryButton>
    </div>
  );
}
