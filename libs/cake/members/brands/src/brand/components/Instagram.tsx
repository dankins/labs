import {
  Heading4,
  SecondaryButton,
  SectionHeading,
} from "@danklabs/cake/pattern-library/core";
import {
  Brand,
  InstagramPost,
  brands,
} from "@danklabs/cake/services/admin-service";
import { InstagramIcon } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

export async function Instagram({ brand }: { brand: NonNullable<Brand> }) {
  if (brand.db.settings.instagram?.status !== "active") {
    return <></>;
  }

  const { data } = await brands.getInstagramPosts(brand.db.slug);

  return (
    <>
      <div className="flex flex-row items-center">
        <Heading4 className="grow">{brand.cms?.name} on Instagram</Heading4>
        <SecondaryButton size="sm" icon={<InstagramIcon />}>
          <span className="hidden md:block">View on Instagram</span>
        </SecondaryButton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {data.map((post) => (
          <Item key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

function Item({ post }: { post: InstagramPost }) {
  if (post.media_type !== "IMAGE") {
    return (
      <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-2 items-center justify-center">
        <div className="uppercase text-sm">video</div>
      </div>
    );
  }
  return (
    <div className="rounded-md overflow-hidden bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-2 items-center justify-center">
      <div className="uppercase text-sm">
        <img
          src={post.media_url}
          height={"100%"}
          width="auto"
          alt={post.caption}
        />
      </div>
    </div>
  );
}

export function InstagramLoading() {
  return (
    <>
      <div></div>
      <Heading4>... on Instagram</Heading4>
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
