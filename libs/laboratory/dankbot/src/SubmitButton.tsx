"use client";

import { Button } from "@danklabs/pattern-library/core";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Submit
    </Button>
  );
}
