import {
  Currency,
  SanityImageServer,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";
import {
  Brand,
  Member,
  MemberCollectionItem,
  brands,
} from "@danklabs/cake/services/admin-service";
import {
  Caption3,
  ChevronDoubleRight,
  Heading4,
  PrimaryButton,
  SecondaryButton,
  Text,
} from "@danklabs/pattern-library/core";
import classNames from "classnames";
import Link from "next/link";
import { CakeCodeDisplay } from "./CakeCodeDisplay";
import { FriendsWhoFollow } from "./FriendsWhoFollow";
import { Products } from "libs/cake/members/brands/src/brand/components/Products";

const margins = [
  "mt-[0px]",
  "mt-[60px]",
  "mt-[120px]",
  "mt-[180px]",
  "mt-[240px]",
  "mt-[300px]",
  "mt-[360px]",
  "mt-[420px]",
  "mt-[480px]",
  "mt-[540px]",
  "mt-[600px]",
  "mt-[660px]",
  "mt-[720px]",
  "mt-[780px]",
  "mt-[840px]",
  "mt-[900px]",
  "mt-[960px]",
  "mt-[1080px]",
];

export async function CollectionItem({
  idx,
  item,
  isActive,
  isOtherActive,
  member,
  brand,
}: {
  idx: number;
  item: MemberCollectionItem;
  isActive?: boolean;
  isOtherActive?: boolean;
  member: Member;
  brand: Brand;
}) {
  const cakeCard = item.offers.find((o) => o.offerType === "voucher");
  const website = brand.cms?.website;
  const image = brand.cms?.passBackground;
  const slug = brand.db?.slug;
  if (!slug) {
    throw new Error("error loading brand");
  }

  let baseClassnames = classNames(
    `col-start-1 row-start-1 block md:mt-0 flex flex-col justify-center md:justify-start md:col-start-auto md:row-start-auto !md:mt-0 md:gap-4 w-full group`,
    "transition-all duration-300 ease-in-out",
    "md:max-w-[1024px]"
  );
  let containerClass = classNames(
    baseClassnames,
    margins[idx],
    "md:mt-0",
    `z-${idx}`
  );
  let expandedClass = classNames("h-0 opacity-0");
  if (isActive) {
    containerClass = classNames(
      baseClassnames,
      "md:col-start-1 md:row-start- 1 md:col-span-3",
      "bg-neutral",
      "z-40"
    );
    expandedClass = classNames(
      "transition duration-300 delay-300 ease-in-out  opacity-1"
    );
  }
  if (isOtherActive) {
    containerClass = classNames(baseClassnames, "opacity-0");
  }
  return (
    <div className={containerClass}>
      <div className="flex flex-col md:flex-row md:gap-4 md:items-stretch">
        <Link
          href={`/collection?collectionItem=${slug}`}
          className={`block rounded-md bg-dark aspect-[3.370/2.125] w-full md:w-full md:h-auto relative border border-[#9D9C9B] transition-transform duration-300 ease-in-out`}
        >
          {image && (
            <SanityImageServer
              alt={`${slug} background image`}
              image={image}
              aspectRatio="wallet"
              sizes="(max-width: 425px) 425px, 768px"
              width={768}
              height={(768 * 3) / 2}
              className="w-full h-full transition-transform duration-300 ease-in-out object-cover"
            />
          )}
          <div className="w-full h-full absolute top-0 left-0 bg-black/30 hover:drop-shadow-xl  transition-transform duration-300 ease-in-out"></div>
          <div className="w-full h-full absolute top-0 left-0">
            <div className="p-4 flex flex-row items-center justify-start text-dark-content h-[60px] md:h-[33%]">
              {brand.cms?.passLogo && (
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
          </div>
        </Link>
        <div className={expandedClass}>
          <div className="w-full my-4 p-4  flex flex-row gap-4 rounded-md darkSection bg-neutral text-neutral-content ">
            <div className="flex flex-col justify-center items-center p-3 border-r border-r-[#545251]">
              <Currency
                amount={cakeCard?.offerValue || "-"}
                size="lg"
                className="text-[#F7F4EF]"
              />
              <Caption3 className="whitespace-nowrap text-[#A2988E]">
                Cake Card
              </Caption3>
            </div>
            <div className="flex flex-col gap-4">
              <Text size="sm" className="text-[#C2BCBD]">
                Automatically apply your Cake Card to your next Reformation
                purchase by using the “Shop & Apply” link below.
              </Text>
              <PrimaryButton
                className="w-full"
                align="center"
                href={website?.replace(
                  "{DISCOUNT_CODE}",
                  cakeCard?.code || "cake"
                )}
              >
                Shop & Apply
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <div className={expandedClass}>
        <CakeCodeDisplay code={cakeCard?.code} />
        <FriendsWhoFollow slug={slug} />
        <Products brand={brand} />
      </div>
    </div>
  );
}

function Margins() {
  // This is a placeholder component to add margin between CollectionItems
  return (
    <div className="mt-[60px] mt-[120px] mt-[180px] mt-[240px] mt-[300px] mt-[360px] mt-[420px] mt-[480px] mt-[540px] mt-[600px] mt-[660px] mt-[720px] mt-[780px] mt-[840px] mt-[900px] mt-[960px] mt-[1080px]"></div>
  );
}
