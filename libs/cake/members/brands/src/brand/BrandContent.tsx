import { Suspense } from "react";
import { auth } from "@clerk/nextjs";

import { getBrandAdmin } from "@danklabs/cake/cms";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import {
  getBrand,
  getMemberBrandStatus,
} from "@danklabs/cake/services/admin-service";

import { Header, HeaderLoading } from "./components/Header";
import { Content, ContentLoading } from "./components/Content";
import { ContainerWithBackground } from "./components/ContainerWithBackground";

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
  const { userId: userIAM } = auth();
  if (!userIAM) {
    throw new Error("userid not available");
  }

  const [brand, { memberId, isFavorite, isInCollection }, { id: brandId }] =
    await Promise.all([
      getBrandAdmin(slug),
      getMemberBrandStatus(userIAM, slug),
      getBrand(slug),
    ]);

  return (
    <ContainerWithBackground brand={brand}>
      <MobileNavSpacer />
      <Header brand={brand} />
      <Content
        memberId={memberId}
        brandId={brandId}
        brand={brand}
        isFavorite={isFavorite}
      />
    </ContainerWithBackground>
  );
}
