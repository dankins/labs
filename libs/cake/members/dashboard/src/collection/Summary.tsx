import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import {
  AddIcon,
  Button,
  Heading1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import Link from "next/link";

export function Summary({
  items,
  maxItems,
  collectionValue,
}: {
  items: number;
  maxItems: number;
  collectionValue: number;
}) {
  return (
    <div className="pb-4 mb-4 flex md:flex-row items-center border-b-2 border-b-dark">
      <div className="grow">
        <Heading1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase">
          My Collection
        </Heading1>
        <div className="flex flex-row items-center gap-2 text-base md:text-xl font-medium md:font-bold">
          <WalletIcon className="fill-accent" /> {items} / {maxItems}
          <WalletIcon className="fill-accent" /> ${collectionValue}
          <span className="grow"></span>
          <Button
            icon={<AddIcon className="text-dark-content" />}
            background="dark"
          ></Button>
        </div>
      </div>
    </div>
  );
}
