import {
  SanityArtDirection,
  SanityImageServer,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";
import {
  Member,
  MemberCollectionItem,
  brands,
} from "@danklabs/cake/services/admin-service";
import {
  Badge,
  ChevronDoubleRight,
  Heading4,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import Link from "next/link";
import { Suspense } from "react";

export async function CollectionItem({
  idx,
  item,
  member,
}: {
  idx: number;
  item: MemberCollectionItem;
  member: Member;
}) {
  const discountCode = item.offers.find((o) => o.offerType === "voucher")?.code;

  return (
    <Suspense fallback={<Loading item={item} idx={idx} />}>
      <Component item={item} idx={idx} discountCode={discountCode} />
    </Suspense>
  );
}

function Loading({ item, idx }: { item: MemberCollectionItem; idx: number }) {
  return <Shell idx={idx} slug={item.slug}></Shell>;
}

async function Component({
  item,
  idx,
  discountCode,
}: {
  item: MemberCollectionItem;
  idx: number;
  discountCode?: string;
}) {
  const brand = await brands.getBrand(item.slug);
  return (
    <Shell
      idx={idx}
      slug={item.slug}
      image={brand.cms.passBackground || undefined}
      website={brand.cms.website || undefined}
      discountCode={discountCode}
    >
      <div className="flex flex-row items-center justify-start text-dark-content h-[36px] md:h-[48px]">
        {brand.cms.passLogo && (
          <SanityImageServer
            alt={`Logo for ${brand.cms.name}`}
            image={brand.cms.passLogo}
            width={750}
            height={750}
            style={{
              height: "100%",
              maxWidth: "45%",
              objectFit: "contain",
              objectPosition: "left center",
            }}
            className="invert"
          />
        )}
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
  website,
  discountCode,
}: {
  children?: React.ReactNode;
  idx: number;
  slug: string;
  image?: SanityImageType;
  website?: string;
  discountCode?: string;
}) {
  return (
    <div
      className={`block md:mt-0 md:col-start-auto md:row-start-auto flex flex-row justify-center md:justify-start md:gap-4 w-full`}
    >
      <Link
        href={`/collection?collectionItem=${slug}`}
        className={`p-6 block rounded-md bg-dark aspect-[3/2] w-full md:w-auto md:h-[200px] relative overflow-hidden  border border-[#9D9C9B] `}
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
          <div className="py-2 px-4 w-full">{children}</div>
        </div>
      </Link>
      <div className="hidden md:h-[210px] max-w-[220px] md:flex flex-col justify-center gap-3">
        <p>
          The link below will apply your Cake Card automatically at checkout.
        </p>
        <SecondaryButton
          icon={<ChevronDoubleRight />}
          iconPosition="right"
          href={website?.replace("{DISCOUNT_CODE}", discountCode || "cake")}
          target="_blank"
        >
          Shop Brand
        </SecondaryButton>
      </div>
    </div>
  );
}
