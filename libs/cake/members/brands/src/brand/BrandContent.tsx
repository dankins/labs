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
      <AddPassActionBar action={claimPassAction.bind(undefined, iam, slug)} />
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
              <MemberBenefits brand={brand} member={member} />
              <Products brand={brand} />
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
      <div className="lg:max-w-[420px] pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 lg:flex-col">
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
          <div className="my-4 flex flex-col gap-4 md:max-w-[350px] grow">
            <Heading4>About {brand.cms?.name}</Heading4>
            <Paragraph2>{brand.cms?.summary}</Paragraph2>
          </div>
          <div>
            <SecondaryButton
              icon={<RightArrow />}
              iconPosition="right"
              className="uppercase"
              href={brand.cms?.website?.replace("{DISCOUNT_CODE}", "cake")}
              target="_blank"
            >
              Visit {brand.cms?.name}
            </SecondaryButton>
          </div>
        </div>

        <FriendsWhoFollow slug={brand.db.slug} />
      </div>
    );
  }
}
