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
    <div className="flex md:flex-row items-center ">
      <div
        className={classNames(
          "grow transition duration-300 ease-in-out",
          isItemActive && "opacity-0"
        )}
      >
        <Heading1 className="text-xl md:text-2xl uppercase">
          My Collection
        </Heading1>
        <div className="flex flex-row items-center gap-2 text-base text-lg font-medium md:font-bold">
          <WalletIcon className="text-xl fill-primary" /> {items} / {maxItems}
          <BagIcon className="text-xl fill-primary" /> ${collectionValue}
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
