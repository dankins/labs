import {
  SanityArtDirection,
  SanityImageServer,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";
import {
  MemberCollectionItem,
  brands,
} from "@danklabs/cake/services/admin-service";
import {
  Badge,
  Heading4,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import Link from "next/link";
import { Suspense } from "react";

export async function CollectionItem({
  idx,
  item,
}: {
  idx: number;
  item: MemberCollectionItem;
}) {
  return (
    <Suspense fallback={<Loading item={item} idx={idx} />}>
      <Component item={item} idx={idx} />
    </Suspense>
  );
}

function Loading({ item, idx }: { item: MemberCollectionItem; idx: number }) {
  return <Shell idx={idx} slug={item.slug}></Shell>;
}

async function Component({
  item,
  idx,
}: {
  item: MemberCollectionItem;
  idx: number;
}) {
  const { cms: brandDetail } = await brands.getBrand(item.slug);
  return (
    <Shell
      idx={idx}
      slug={item.slug}
      image={brandDetail.passBackground || undefined}
    >
      <div className="flex flex-row items-center justify-center text-dark-content">
        <div>
          <SanityImageServer
            alt={`${brandDetail.name} Logo`}
            image={brandDetail.passLogo!}
            height={100}
            width={200}
            className="w-auto h-[26px] md:max-h-[32px] invert"
          />
        </div>
        <div className="grow"></div>
        <Heading4>${item.value}</Heading4>
      </div>
    </Shell>
  );
}

function Shell({
  children,
  idx,
  slug,
  image,
}: {
  children?: React.ReactNode;
  idx: number;
  slug: string;
  image?: SanityImageType;
}) {
  const mt = idx * 3;
  return (
    <div
      className={`col-start-1 row-start-1 block  mt-[${mt}rem] md:mt-0 md:col-start-auto md:row-start-auto flex flex-row justify-center md:justify-start md:gap-4 w-full`}
    >
      <Link
        href={`/collection?collectionItem=${slug}`}
        className={`p-4 block rounded-md bg-dark aspect-[3/2] w-full md:w-auto md:h-[200px] relative overflow-hidden  border border-[#9D9C9B] `}
      >
        <div className="absolute top-0 left-0">
          {image && (
            <SanityImageServer
              alt={`${slug} background image`}
              image={image}
              aspectRatio="wallet"
              sizes="(max-width: 425px) 425px, 768px"
              width={768}
              height={(768 * 3) / 2}
            />
          )}
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-black/30"></div>
        <div className="w-full absolute top-0 left-0">
          <div className="p-4 w-full">{children}</div>
        </div>
      </Link>
      <div className="hidden md:h-[210px] max-w-[220px] md:flex flex-col justify-center gap-3">
        <p>
          The link below will apply your Cake Card automatically at checkout.
        </p>
        <SecondaryButton>Shop Brand</SecondaryButton>
      </div>
    </div>
  );
}
