"use client";

import { Spinner } from "@danklabs/pattern-library/core";
import { useFormStatus } from "react-dom";

export function IconLoading({ children }: { children?: React.ReactNode }) {
  const formState = useFormStatus();
  if (formState.pending) {
    return <Spinner />;
  }
  return children;
}
