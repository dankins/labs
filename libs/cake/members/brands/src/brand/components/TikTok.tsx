import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import {
  Heading4,
  SecondaryButton,
  SkeletonImage,
  TikTokIcon,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Brand, brands } from "@danklabs/cake/services/admin-service";

export async function TikTok({ brand }: { brand: NonNullable<Brand> }) {
  if (brand.db.settings.tiktok?.status !== "active") {
    return <></>;
  }

  const result = await brands.getTikTokPosts(brand.db.slug);

  return (
    <>
      <div className="flex flex-row items-center">
        <Heading4 className="grow">{brand.cms?.name} on Tiktok</Heading4>
        <SecondaryButton size="sm" icon={<TikTokIcon />}>
          <span className="hidden md:block">View on TikTok</span>
        </SecondaryButton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {result.videos.map((video) => (
          <Item video={video} />
        ))}
      </div>
    </>
  );
}

function Item({ video }: { video: any }) {
  return (
    <div className="rounded-md overflow-hidden bg-[#111] w-full aspect-[9/16] max-w-[300px] flex flex-col gap-2 items-center justify-center">
      <img src={video.cover_image_url} height={"100%"} width="100%" />
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
