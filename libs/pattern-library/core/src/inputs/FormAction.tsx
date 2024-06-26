"use client";

import { PrimaryButton } from "../buttons";
import { FormState } from "@danklabs/utils";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Paragraph3 } from "../text";

export type { FormState } from "@danklabs/utils";

const initialState: FormState = {
  status: "start",
};

export function FormAction({
  action,
  cta,
  inline = false,
  children,
  className,
}: {
  action(previousState: FormState, formData: FormData): Promise<FormState>;
  cta: React.ReactNode;
  inline?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [formValid, setFormValid] = useState(false);
  const [state, formAction] = useFormState(handler, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handler(
    previousState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const result = await action(previousState, formData);

    if (result.status === "success" && formRef && formRef.current) {
      formRef.current.reset();
      if (result.redirect) {
        router.push(result.redirect);
      }
    }
    return result;
  }

  useEffect(() => {
    // check if form is valid on mount
    if (formRef && formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [formRef]);

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
      className={classNames(
        inline && "flex flex-row items-center gap-2",
        className
      )}
      ref={formRef}
      onChange={handleChange}
    >
      {children}
      <SubmitFormButton cta={cta} formValid={formValid} />
      {state.status === "error" && (
        <Paragraph3 className="text-secondary">{state.message}</Paragraph3>
      )}
      {state.status === "success" && <Paragraph3>{state.message}</Paragraph3>}
    </form>
  );
}

export function SubmitFormButton({
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
