import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

export function useToast() {
  const ctx = useContext(ToastContext);

  return ctx;
}
