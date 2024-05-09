import { Heading1, PrimaryButton } from "@danklabs/pattern-library/core";

export function Welcome({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <Heading1>Welcome to the world of CAKE</Heading1>
      <PrimaryButton onClick={onClick}>Continue</PrimaryButton>
    </div>
  );
}
