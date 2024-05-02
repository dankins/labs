import { BagIcon, WalletIcon } from "@danklabs/cake/pattern-library/core";
import {
  AddIcon,
  Button,
  CancelIcon,
  CircleButton,
  Heading1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import classNames from "classnames";

export function Summary({
  items,
  maxItems,
  collectionValue,
  isItemActive,
}: {
  items: number;
  maxItems: number;
  collectionValue: number;
  isItemActive: boolean;
}) {
  return (
    <div className="flex md:flex-row items-center mb-2">
      <div
        className={classNames(
          "grow transition duration-300 ease-in-out",
          isItemActive && "opacity-0"
        )}
      >
        <span className="text-md font-sansSerif uppercase">Collection</span>
        <div className="flex flex-row items-center gap-2 text-base text-sm font-medium md:font-bold">
          <WalletIcon className="fill-primary" /> {items} / {maxItems}
          <BagIcon className="fill-primary" /> ${collectionValue}
        </div>
      </div>
      {isItemActive ? (
        <CircleButton
          href={`/collection`}
          icon={<CancelIcon className="text-dark-content" />}
        />
      ) : (
        <CircleButton
          href={`/brands`}
          icon={<AddIcon className="text-dark-content" />}
        />
      )}
    </div>
  );
}
