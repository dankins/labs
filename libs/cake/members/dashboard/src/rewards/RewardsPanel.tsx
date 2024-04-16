import {
  ArrowDownIcon,
  Heading4,
  RightArrow,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";

export async function RewardsPanel() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <Spinner />;
}

function Component() {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center font-bold">
        <Heading4 className="grow">Rewards</Heading4>
        <RightArrow />
      </div>
    </div>
  );
}
