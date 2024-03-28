import { copy } from "@danklabs/utils";
import { useToast } from "@danklabs/pattern-library/motion";
import {
  Button,
  ButtonProps,
  PrimaryButton,
} from "@danklabs/pattern-library/core";

type StringOrFunc = string | (() => string);

export function CopyButton({
  text,
  children,
  ...props
}: ButtonProps & { text: StringOrFunc }) {
  const { addToast } = useToast();
  function handleClick() {
    if (typeof text === "string") {
      copy(text);
    } else {
      copy(text());
    }
    addToast("Copied!");
  }
  return <PrimaryButton onClick={handleClick}>{children}</PrimaryButton>;
}
