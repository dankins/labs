import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import { AddIcon, Button, PrimaryButton } from "@danklabs/pattern-library/core";
import Link from "next/link";

export function Summary({ collectionValue }: { collectionValue: number }) {
  return (
    <div className="flex md:flex-row items-center">
      <div className="grow">
        <h1 className="uppercase font-bold text-[20px] md:text-[32px]">
          My Collection
        </h1>
        <div className="flex flex-row items-center gap-2 text-base md:text-xl font-medium md:font-bold">
          <WalletIcon className="fill-accent" /> ${collectionValue}
        </div>
      </div>
      <div className="hidden md:block">
        <PrimaryButton href="/brands">
          <AddIcon />
          <span className="grow uppercase">Add to Collection</span>
        </PrimaryButton>
      </div>
      <div className="block md:hidden">
        <Button
          icon={<AddIcon className="text-dark-content" />}
          background="dark"
        ></Button>
      </div>
    </div>
  );
}
