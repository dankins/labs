import {
  ChevronRightIcon,
  StarIcon,
  Button,
} from "@danklabs/pattern-library/core";
import { Cart } from "./BrandGridClient";
import { useEffect } from "react";
import { MoneyRoll } from "./MoneyRoll";

export function SelectionSummary({ cart }: { cart: Cart }) {
  useEffect(() => {}, [cart]);
  return (
    <div className="px-4 py-2 bg-white text-black rounded-full flex flex-row  text-sm">
      <div className="grow flex flex-row gap-4">
        <div className="flex flex-row items-center gap-2">
          <ChevronRightIcon />
          <span>$100/year</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ChevronRightIcon />
          <MoneyRoll amount={cart.totalValue} duration={0.2} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <StarIcon />
          <span>{cart.selectionCount}</span>
        </div>
      </div>

      <div>
        <Button className="flex flex-col gap-0">
          <div className="text-sm uppercase">Let's Go!</div>
        </Button>
      </div>
    </div>
  );
}
