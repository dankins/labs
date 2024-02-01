import {
  ChevronRightIcon,
  StarIcon,
  Button,
} from "@danklabs/pattern-library/core";
import { Cart } from "./BrandGridClient";
import { useEffect } from "react";
import { MoneyRoll } from "./MoneyRoll";
import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import { useQueryStringUpdater } from "../util/searchParams";

const MAX_SELECTIONS = 4;

export function SelectionSummary({ cart }: { cart: Cart }) {
  const updateQueryString = useQueryStringUpdater();
  useEffect(() => {}, [cart]);
  if (cart.selectionCount === 0) {
    return (
      <div className="px-4 py-2 bg-white text-black rounded-full flex flex-row  text-sm">
        <div className="grow flex flex-row gap-4">null state</div>
        <div>
          <Button
            className="flex flex-col gap-0 bg-[#FFE3C5]"
            onClick={handleContinue}
          >
            <div className="text-sm uppercase">Choose Later</div>
          </Button>
        </div>
      </div>
    );
  }

  function handleContinue() {
    updateQueryString("brands", Object.keys(cart.selectionMap).join(","));
    updateQueryString("step", "checkout");
  }

  return (
    <div className="px-4 py-2 bg-white text-black rounded-full flex flex-row text-sm font-heading">
      <div className="grow flex flex-row gap-4  items-center">
        <div className="flex flex-row items-center gap-2 items-center">
          <WalletIcon className="fill-[#FFE3C5] text-lg" />
          <MoneyRoll amount={cart.totalValue} duration={0.2} />
        </div>
        <div className="flex flex-row items-center gap-2 items-center">
          <WalletIcon className="fill-[#FFE3C5] text-lg" />
          <span>
            {cart.selectionCount < 10 && "0"}
            {cart.selectionCount} / {MAX_SELECTIONS}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2 items-center">
          <ChevronRightIcon className="fill-[#FFE3C5] text-lg" />
          <span>$100/year</span>
        </div>
      </div>

      <div>
        <Button
          className="flex flex-col gap-0 bg-[#FFE3C5]"
          onClick={handleContinue}
          disabled={cart.selectionCount > MAX_SELECTIONS}
        >
          <div className="text-sm uppercase ">Let's Go!</div>
        </Button>
      </div>
    </div>
  );
}
