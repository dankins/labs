import { Caption3, Heading4 } from "@danklabs/pattern-library/core";
import { Suspense } from "react";

export async function FriendsWhoFollow({ slug }: { slug: string }) {
  return (
    <Suspense>
      <Component slug={slug} />
    </Suspense>
  );
}

export async function Component({ slug }: { slug: string }) {
  const palette = [
    "bg-[#EF6447]",
    "bg-[#EB3D19]",
    "bg-[#615155]",
    "bg-[#F781CB]",
  ];

  return (
    <div className="my-6">
      <Caption3>Friends who follow</Caption3>
      <div className="pt-2 flex flex-row -space-x-2">
        <div
          className={`${palette[0]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          CA
        </div>
        <div
          className={`${palette[1]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          KE
        </div>
        <div
          className={`${palette[2]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          PLS
        </div>
      </div>
    </div>
  );
}
