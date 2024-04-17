import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import {
  Heading4,
  MobileNavSpacer,
  Paragraph2,
  SanityArtDirection,
  SanityImageServer,
  SecondaryButton,
} from "@danklabs/cake/pattern-library/core";
import { Brand, brands, members } from "@danklabs/cake/services/admin-service";

import { Header, HeaderLoading } from "./components/Header";
import { ContainerWithBackground } from "./components/ContainerWithBackground";
import { AddPassActionBar } from "./AddPassActionBar";

import { claimPassAction } from "./actions";
import {
  AddIcon,
  Caption3,
  PrimaryButton,
  RightArrow,
  Spinner,
} from "@danklabs/pattern-library/core";
import { TikTok } from "./components/TikTok";
import { Instagram } from "./components/Instagram";
import { FriendsWhoFollow } from "./FriendsWhoFollow";
import { Products } from "./components/Products";
import { MemberBenefits } from "./components/MemberBenefits";

export async function BrandContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="w-full h-full min-h-screen flex flex-row justify-center darkSection bg-neutral text-neutral-content md:lightSection">
      <Spinner />
    </div>
  );
}

function ContentLoading() {
  return <Spinner />;
}

async function Component({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();

  const [brand, member] = await Promise.all([
    brands.getBrand(slug),
    members.member.get(iam),
  ]);

  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-row justify-center darkSection bg-neutral text-neutral-content md:lightSection">
        <div className="container max-w-[1280px]">
          <div className="relative z-1">
            <SanityArtDirection
              alt="Background image for brand page"
              className="absolute top-0 left-0 md:static w-full h-full"
              images={[
                {
                  image: brand.cms?.passBackgroundDesktop,
                  aspectRatio: "ultrawide",
                  mediaQuery: "(min-width: 426px)",
                },
                {
                  image: brand.cms?.passBackground,
                  aspectRatio: "portrait",
                  mediaQuery: "(max-width: 425px)",
                },
              ]}
            />
            <div className="md:hidden absolute top-0 left-0 w-full aspect-[2/3] bg-gradient-to-t from-neutral to-neutral/50"></div>
            <div className="relative  w-full h-full">
              <div className="p-6 pt-[180px] md:pt-0 lg:mt-[60px] flex flex-col lg:flex-row md:gap-4">
                <BrandDetails brand={brand} />
                <div className="flex flex-col gap-6 grow">
                  <MemberBenefits brand={brand} member={member} />
                  <Products brand={brand} />
                  <Instagram brand={brand} />
                  <TikTok brand={brand} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function BrandDetails({ brand }: { brand: NonNullable<Brand> }) {
    return (
      <div className="lg:max-w-[420px] pb-4">
        <div className="flex flex-col gap-6">
          <div>
            {brand.cms?.passLogo && (
              <SanityImageServer
                alt={`Logo for ${brand.cms.name}`}
                image={brand.cms?.passLogo}
                width={760}
                height={760}
                style={{ width: "auto", height: "64px" }}
                className="invert md:invert-0"
              />
            )}
          </div>
          <Paragraph2>{brand.cms?.summary}</Paragraph2>
          <PrimaryButton
            href={`?brand=${brand.db.slug}&action=add-to-collection`}
            className="uppercase w-[240px]"
            icon={<AddIcon />}
          >
            Add to Collection
          </PrimaryButton>
          <SecondaryButton
            iconPosition="right"
            className="uppercase w-[240px]"
            href={brand.cms?.website?.replace("{DISCOUNT_CODE}", "cake")}
            target="_blank"
          >
            <div className="w-full flex flex-row items-center">
              <span className="grow">Visit {brand.cms?.name}</span>
              <RightArrow />
            </div>
          </SecondaryButton>
        </div>

        <FriendsWhoFollow slug={brand.db.slug} />
      </div>
    );
  }
}
