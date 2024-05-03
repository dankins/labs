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
import { MotionDiv } from "@danklabs/pattern-library/motion";
import { z } from "zod";

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
  activeIdx,
  member,
  brand,
}: {
  idx: number;
  item: MemberCollectionItem;
  isActive?: boolean;
  isOtherActive?: boolean;
  activeIdx?: number;
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
    `col-start-1 row-start-1 block flex flex-col justify-center md:justify-start md:gap-4 w-full group`,
    "transition-all duration-300 ease-in-out",
    "md:max-w-[1024px]"
  );
  let containerClass = baseClassnames;
  const isBehind = idx < (activeIdx || 0);
  const transitionDuration = (activeIdx || 1) * 0.06;

  const variants = {
    base: {
      marginTop: idx * 60,
      transition: { duration: transitionDuration },
      zIndex: idx + 1,
    },
    active: {
      marginTop: 0,
      transition: { duration: transitionDuration },
      zIndex: 40,
    },
    hidden: {
      scale: isBehind ? 0.8 : undefined,
      opacity: 0,
      filter: isBehind ? "blur(10px)" : undefined,
      y: isBehind ? -200 : 200,
      transition: {
        duration: 0.3,
        delay: isBehind ? idx * (0.1 / (activeIdx || 0.02)) : 0,
      },
      "pointer-events": "none",
    },
  };

  let state = "base";
  if (isActive) {
    state = "active";
  } else if (isOtherActive) {
    state = "hidden";
  }

  return (
    <div className={containerClass}>
      <MotionDiv variants={variants} initial={"base"} animate={state}>
        <Link href={`/collection?collectionItem=${slug}`}>
          <div
            className={`block rounded-md bg-dark aspect-[3.370/2.125] w-full md:w-full md:h-auto relative border border-[#9D9C9B]`}
          >
            {image && (
              <SanityImageServer
                alt={`${slug} background image`}
                image={image}
                aspectRatio="wallet"
                sizes="(max-width: 425px) 425px, 768px"
                width={768}
                height={(768 * 3) / 2}
                className="w-full h-full object-cover"
              />
            )}
            <div className="w-full h-full absolute top-0 left-0 bg-black/30 hover:drop-shadow-xl"></div>
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
          </div>
        </Link>
      </MotionDiv>
      {isActive && (
        <MotionDiv
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: transitionDuration + 0.2 }}
        >
          <div className="w-full my-4 p-4  flex flex-row gap-4 rounded-md darkSection bg-neutral text-neutral-content">
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
          <CakeCodeDisplay code={cakeCard?.code} />
          <FriendsWhoFollow slug={slug} />
          <Products brand={brand} />
        </MotionDiv>
      )}
    </div>
  );
}

function Margins() {
  // This is a placeholder component to add margin between CollectionItems
  return (
    <div className="mt-[60px] mt-[120px] mt-[180px] mt-[240px] mt-[300px] mt-[360px] mt-[420px] mt-[480px] mt-[540px] mt-[600px] mt-[660px] mt-[720px] mt-[780px] mt-[840px] mt-[900px] mt-[960px] mt-[1080px]"></div>
  );
}
