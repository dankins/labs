import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { CMSBrand } from "./types";

export function TikTok({ brand }: { brand: CMSBrand }) {
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
