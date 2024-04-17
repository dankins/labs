import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import {
  Heading4,
  MobileNavSpacer,
  Paragraph2,
  SanityImageServer,
  SecondaryButton,
} from "@danklabs/cake/pattern-library/core";
import {
  Brand,
  brands,
  getMemberBrandStatus,
  members,
} from "@danklabs/cake/services/admin-service";

import { Header, HeaderLoading } from "./components/Header";
import { Content, ContentLoading } from "./components/Content";
import { ContainerWithBackground } from "./components/ContainerWithBackground";
import { AddPassActionBar } from "./AddPassActionBar";

import { claimPassAction } from "./actions";
import { Caption3, RightArrow } from "@danklabs/pattern-library/core";
import { TikTok } from "./components/TikTok";
import { Instagram } from "./components/Instagram";

export async function BrandContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return (
    <ContainerWithBackground loading>
      <MobileNavSpacer />
      <HeaderLoading />
      <ContentLoading />
    </ContainerWithBackground>
  );
}

async function Component({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();

  const [brand, member] = await Promise.all([
    brands.getBrand(slug),
    members.member.get(iam),
  ]);

  return (
    <>
      <MobileNavSpacer />
      <div className="flex flex-row justify-center">
        <div className="container max-w-[1280px]">
          <SanityImageServer
            image={brand.cms.passBackgroundDesktop!}
            alt={`Background image for ${brand.cms.name}`}
            aspectRatio="ultrawide"
            width={1280}
            height={549}
            className="rounded-sm overlfow-hidden"
          />

          <div className="p-6 lg:mt-[60px] flex flex-col lg:flex-row md:gap-4">
            <BrandDetails brand={brand} />
            <div className="flex flex-col gap-4">
              <Instagram brand={brand} />
              <TikTok brand={brand} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function BrandDetails({ brand }: { brand: NonNullable<Brand> }) {
    return (
      <div className="lg:max-w-[320px] pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 lg:flex-col">
          <div>
            {brand.cms?.passLogo && (
              <SanityImageServer
                alt={`Logo for ${brand.cms.name}`}
                image={brand.cms?.passLogo}
                width={760}
                height={760}
                style={{ width: "auto", height: "64px" }}
              />
            )}
          </div>
          <div className="my-4 flex flex-col gap-4">
            <Heading4>About {brand.cms?.name}</Heading4>
            <Paragraph2>{brand.cms?.summary}</Paragraph2>
          </div>
        </div>
        <div>
          <SecondaryButton
            icon={<RightArrow />}
            iconPosition="right"
            className="uppercase"
          >
            Visit {brand.cms?.name}
          </SecondaryButton>
        </div>
        <FriendsWhoFollow slug={brand.db.slug} />
      </div>
    );
  }

  async function FriendsWhoFollow({ slug }: { slug: string }) {
    const palette = [
      "bg-[#EF6447]",
      "bg-[#EB3D19]",
      "bg-[#615155]",
      "bg-[#F781CB]",
    ];

    return (
      <div className="my-6">
        <Heading4>Friends who follow</Heading4>
        <div className="pt-2 flex flex-row -space-x-2">
          <div
            className={`${palette[0]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
          >
            FU
          </div>
          <div
            className={`${palette[1]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
          >
            CK
          </div>
          <div
            className={`${palette[2]} rounded-full h-[46px] w-[46px] flex flex-col items-center justify-center text-white`}
          >
            YO
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <ContainerWithBackground brand={brand.cms!}>
  //     <MobileNavSpacer />
  //     <Header brand={brand.cms} />
  //     <Content memberId={memberId} brand={brand} isFavorite={isFavorite} />
  //     <div className="fixed bottom-5 px-3 left-0 flex flex-col justify-center w-full flex flex-col items-center z-20">
  //       <AddPassActionBar
  //         action={claimPassAction.bind(undefined, userIAM, brand.db.slug)}
  //       />
  //     </div>
  //   </ContainerWithBackground>
  // );
}
