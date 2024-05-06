import { BagIcon, WalletIcon } from "@danklabs/cake/pattern-library/core";
import {
  AddIcon,
  CircleButton,
  GhostButton,
  Heading4,
  LeftArrow,
} from "@danklabs/pattern-library/core";
import { MotionDiv } from "@danklabs/pattern-library/motion";
import classNames from "classnames";

export function Summary({
  items,
  maxItems,
  collectionValue,
  activeIdx,
}: {
  items: number;
  maxItems: number;
  collectionValue: number;
  activeIdx?: number;
}) {
  if (activeIdx !== undefined) {
    const transitionDuration = (activeIdx || 1) * 0.06;
    return (
      <MotionDiv
        initial={{ opacity: 0, x: 25 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: transitionDuration + 0.3, duration: 0.2 },
        }}
      >
        <GhostButton href={`/collection`} className="mb-2">
          <LeftArrow /> <Heading4>Return to collection</Heading4>
        </GhostButton>
      </MotionDiv>
    );
  }

  return (
    <div className="flex md:flex-row items-center mb-2">
      <div className={classNames("grow transition duration-300 ease-in-out")}>
        <span className="text-md font-sansSerif uppercase">Collection</span>
        <div className="flex flex-row items-center gap-2 text-base text-sm font-medium md:font-bold">
          <WalletIcon className="fill-primary" /> {items} / {maxItems}
          <BagIcon className="fill-primary" /> ${collectionValue}
        </div>
      </div>
      <CircleButton
        href={`/brands`}
        icon={<AddIcon className="text-dark-content" />}
      />
    </div>
  );
}
