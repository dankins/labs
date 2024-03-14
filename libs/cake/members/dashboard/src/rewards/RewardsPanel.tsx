import { ArrowDownIcon, RightArrow } from "@danklabs/pattern-library/core";
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
      <div className="flex flex-row items-center font-bold text-[32px]">
        <h1 className="grow uppercase font-bold text-[20px] md:text-[32px]">
          Rewards
        </h1>
        <RightArrow />
      </div>
    </div>
  );
}
