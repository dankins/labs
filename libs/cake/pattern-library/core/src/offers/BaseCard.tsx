import classNames from "classnames";
import { Heading4 } from "../text";
import dayjs from "dayjs";
import { SecondaryButton } from "../buttons";

export type BaseCardProps = {
  size?: "lg" | "expanded";
  helperText?: string;
  amount?: number;
  name: string;
  expiration?: Date;
  topButton?: React.ReactNode;
  button?: React.ReactNode;
};

export function BaseCard({
  size = "lg",
  name,
  amount,
  expiration,
  topButton,
  button,
}: BaseCardProps) {
  let sizeClasses = "aspect-[3.370/2.125] w-full max-w-[382px]";
  if (size === "expanded") {
    sizeClasses = "w-full max-w-[382px]";
  }
  return (
    <div
      className={classNames(
        "p-4",
        "darkSection bg-[#292725] rounded-lg shadow-xl border border-[#888683]",
        "flex flex-col",
        sizeClasses
      )}
    >
      <div className="flex flex-row justify-end">{topButton}</div>
      <div className="grow w-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <span
            className={`text-[72px] font-selva font-light leading-[72px] text-[#FEFEFD]`}
          >
            <sup className="text-[36px]">$</sup>
            {amount}
          </span>
          <Heading4 className="text-[#E4D6C8] uppercase">{name}</Heading4>
        </div>

        {expiration && (
          <span className="uppercase text-[12px] text-[#545251] font-normal font-supreme">
            Valid until {dayjs(expiration).format("MM/YYYY")}{" "}
          </span>
        )}
        {button}
      </div>
    </div>
  );
}
