import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { CashIcon, StarIcon } from "@danklabs/pattern-library/core";

export const CARD_HEIGHT = 230;
export const CARD_REVEAL = 52;

export type PassportType = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"];

export function PassportSummary({ passport }: { passport: PassportType }) {
  const totalValue =
    "$" +
    passport.passes
      .reduce((acc, cur) => {
        return (
          acc +
          cur.offers.reduce(
            (acc, cur) => acc + parseFloat(cur.template.offerValue),
            0
          )
        );
      }, 0)
      .toLocaleString();
  const perkCount = 3;

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-row gap-1 items-center">
        <CashIcon className="text-primary text-2xl" /> <span>{totalValue}</span>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <StarIcon className="text-primary text-2xl" /> <span>{perkCount}</span>
      </div>
    </div>
  );
}
