"use client";
import { ChevronRightIcon, Button } from "@danklabs/pattern-library/core";
import { Cart } from "./types";
import { MoneyRoll } from "./MoneyRoll";
import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import { useQueryStringUpdater } from "../util/searchParams";
import { LinkToStepButton } from "../LinkToStepButton";

const MAX_SELECTIONS = 4;

export function SelectionSummary({ cart }: { cart: Cart }) {
  if (!cart.loaded) {
    return undefined;
  }
  if (cart.selectionCount === 0) {
    return (
      <div className="px-4 py-2 bg-white text-black rounded-full flex flex-row  text-sm items-center">
        <div className="grow flex flex-row gap-4 text-xs items-center justify-center w-[3/4]">
          Choose your brands, or continue to account setup and add them later.
        </div>
        <div>
          <LinkToStepButton
            className="flex flex-col gap-0 bg-[#FFE3C5]"
            step="account"
          >
            <div className="text-xs uppercase">Choose Later</div>
          </LinkToStepButton>
        </div>
      </div>
    );
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
        <LinkToStepButton
          step="summary"
          className="flex flex-col gap-0 bg-[#FFE3C5]"
          disabled={cart.selectionCount > MAX_SELECTIONS}
        >
          <div className="text-sm uppercase ">Let's Go!</div>
        </LinkToStepButton>
      </div>
    </div>
  );
}
