import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import { CardRoll } from "./CardRoll";
import { cookies } from "next/headers";
import { Cart, CartCookie } from "../brand-selection/types";
import {
  Button,
  ChevronRightIcon,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import Link from "next/link";
import { LinkToStepButton } from "../LinkToStepButton";

// also set in SelectionSummary
const MAX_SELECTIONS = 4;

export function Summary() {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("invitation-cart");
  if (!cartCookie) {
    throw new Error("cart not available");
  }
  const cart: CartCookie = JSON.parse(cartCookie.value);

  return (
    <div>
      <CardRoll brandSlugs={cart.selectedBrands} />
      {/** CONGRATS */}
      <div className="flex flex-col justify-center text-center gap-4">
        <h1 className="font-fancy text-primary text-5xl text-normal">
          Nicely Done.
        </h1>
        <p>
          We couldn’t have done it better ourselves! Now, just complete your
          account setup to access and enjoy these sweet Cake privileges.
        </p>
      </div>
      {/** SUMMARY */}
      <div className="px-4 my-10 flex flex-row w-full justify-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <WalletIcon className="fill-primary text-lg  font-poppins uppercase" />
            Cake Cards
          </div>
          <div className="text-5xl">${cart.totalValue}</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="76"
          viewBox="0 0 45 76"
          fill="none"
        >
          <path
            d="M44 0.760925L0.999999 75.2391"
            stroke="#FEDFDD"
            strokeWidth="2"
          />
        </svg>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 font-poppins uppercase">
            <TicketIcon className="fill-primary text-lg" />
            Brands
          </div>

          <div className="text-5xl">{cart.selectedBrands.length} / 10</div>
        </div>
      </div>
      {/** FINISH */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <LinkToStepButton className="text-2xl" step="account">
            Continue <ChevronRightIcon />
          </LinkToStepButton>
        </div>
        <div>
          <LinkToStepButton
            className="text-sm"
            background="transparent"
            textColor="white"
            step="brand_selection"
          >
            Add More Brands
          </LinkToStepButton>
        </div>
      </div>
    </div>
  );
}
