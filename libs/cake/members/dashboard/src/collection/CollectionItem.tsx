import {
  SanityArtDirection,
  SanityImageServer,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";
import {
  MemberCollectionItem,
  brands,
} from "@danklabs/cake/services/admin-service";
import { Badge } from "@danklabs/pattern-library/core";
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
      <div className="flex flex-row md:flex-col text-dark-content">
        <div>
          <SanityImageServer
            alt={`${brandDetail.name} Logo`}
            image={brandDetail.passLogo!}
            height={100}
            width={200}
            className="w-auto h-[26px] md:max-h-[32px]"
          />
        </div>
        <div className="grow"></div>
        <div>
          <Badge>${item.value}</Badge>
        </div>
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
  return (
    <Link
      href={`/collection?collectionItem=${slug}`}
      className={`col-start-1 row-start-1 block mt-[${
        idx * 3
      }rem] p-4 w-full rounded-md bg-dark aspect-[3/2] relative overflow-hidden md:max-w-[455px] border border-[#9D9C9B] hover:z-40`}
    >
      <div className="absolute top-0 left-0">
        {image && (
          <SanityImageServer
            alt={`${slug} background image`}
            image={image}
            aspectRatio="wallet"
            width={455}
            height={(455 * 3) / 2}
          />
        )}
      </div>
      <div className="w-full absolute top-0 left-0">
        <div className="p-4 w-full">{children}</div>
      </div>
    </Link>
  );
}
