import { BagIcon, WalletIcon } from "@danklabs/cake/pattern-library/core";
import {
  AddIcon,
  Button,
  CircleButton,
  Heading1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";

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
          <WalletIcon className="text-2xl fill-primary" /> {items} / {maxItems}
          <BagIcon className="text-2xl fill-primary" /> ${collectionValue}
          <span className="grow"></span>
          <CircleButton
            href={`/brands`}
            icon={<AddIcon className="text-dark-content" />}
          />
        </div>
      </div>
    </div>
  );
}
