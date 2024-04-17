import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import {
  Heading4,
  SecondaryButton,
  SkeletonImage,
  TikTokIcon,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Brand } from "@danklabs/cake/services/admin-service";

export function TikTok({ brand }: { brand: NonNullable<Brand> }) {
  return (
    <>
      <div className="flex flex-row items-center">
        <Heading4 className="grow">{brand.cms?.name} on Tiktok</Heading4>
        <SecondaryButton size="sm" icon={<TikTokIcon />}>
          View on TikTok
        </SecondaryButton>
      </div>
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
      <Heading4>... on Tiktok</Heading4>
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
