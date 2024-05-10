import { Heading1, PrimaryButton } from "@danklabs/pattern-library/core";

export async function Verified() {
  return (
    <div className="flex flex-col items-center text-center">
      <Heading1 className="text-[64px]">Welcome to the world of CAKE</Heading1>
      <div className="h-[116px]" />
      <PrimaryButton href="/invitation?step=welcome">Ready...</PrimaryButton>
    </div>
  );
}
