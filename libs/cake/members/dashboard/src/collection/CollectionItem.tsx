import {
  SanityArtDirection,
  SanityImageServer,
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
  return <Shell idx={idx} slug={item.slug} images={[]}></Shell>;
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
      images={[
        {
          aspectRatio: "portrait",
          mediaQuery: "(min-width: 480px)",
          image: brandDetail.passBackground,
        },
        {
          aspectRatio: "landscape",
          mediaQuery: "(max-width: 480px)",
          image: brandDetail.passBackgroundDesktop,
        },
      ]}
    >
      <div className="md:h-full flex flex-row md:flex-col text-dark-content">
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
  images,
}: {
  children?: React.ReactNode;
  idx: number;
  slug: string;
  images: {
    aspectRatio: "landscape" | "portrait";
    mediaQuery: string;
    image: any;
  }[];
}) {
  return (
    <Link
      href={`/collection?collectionItem=${slug}`}
      className={`col-start-1 row-start-1 mt-[${
        idx * 3
      }rem] p-4 rounded-md bg-dark max-w-[360px] md:w-full md:h-full md:mt-0 aspect-[3/2] md:aspect-[4/5] relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full md:aspect-[4/5]">
        <SanityArtDirection alt={`${slug} background image`} images={images} />
      </div>
      <div className="md:h-full w-full absolute top-0 left-0">
        <div className="p-4 md:p-[24px] md:h-full w-full">{children}</div>
      </div>
    </Link>
  );
}
