import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { SkeletonImage } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Brand } from "@danklabs/cake/services/admin-service";

export function TikTok({ brand }: { brand: Brand["cms"] }) {
  return (
    <>
      <SectionHeading>{brand.name} on Tiktok</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}

function Item() {
  return (
    <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-4 items-center justify-center">
      <div className="uppercase text-sm">content</div>
    </div>
  );
}

export function TikTokLoading() {
  return (
    <>
      <SectionHeading>... on Tiktok</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ItemLoading />
        <ItemLoading />
        <ItemLoading />
      </div>
    </>
  );
}

function ItemLoading() {
  return (
    <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-4 items-center justify-center">
      <Spinner />
    </div>
  );
}
