import { Heading4 } from "@danklabs/pattern-library/core";

export async function FriendsWhoFollow({ slug }: { slug: string }) {
  const palette = [
    "bg-[#EF6447]",
    "bg-[#EB3D19]",
    "bg-[#615155]",
    "bg-[#F781CB]",
  ];

  return (
    <div className="my-6">
      <Heading4>Friends who follow</Heading4>
      <div className="pt-2 flex flex-row -space-x-2">
        <div
          className={`${palette[0]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          FU
        </div>
        <div
          className={`${palette[1]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          CK
        </div>
        <div
          className={`${palette[2]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
        >
          U
        </div>
      </div>
    </div>
  );
}
