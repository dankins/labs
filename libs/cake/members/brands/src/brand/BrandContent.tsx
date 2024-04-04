import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import {
  cachedGetBrandDetail,
  getMemberBrandStatus,
} from "@danklabs/cake/services/admin-service";

import { Header, HeaderLoading } from "./components/Header";
import { Content, ContentLoading } from "./components/Content";
import { ContainerWithBackground } from "./components/ContainerWithBackground";
import { AddPassActionBar } from "./AddPassActionBar";

import { claimPassAction } from "./actions";

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

  const [brand, { memberId, isFavorite, isInCollection }] = await Promise.all([
    cachedGetBrandDetail(slug),
    getMemberBrandStatus(userIAM, slug),
  ]);
  console.log(
    "hey dan - getMemberBrandStatus is not being cached at all, make sure you fix taht"
  );

  return (
    <ContainerWithBackground brand={brand.cms}>
      <MobileNavSpacer />
      <Header brand={brand.cms} />
      <Content
        memberId={memberId}
        brandId={brand.db.id}
        brand={brand.cms}
        isFavorite={isFavorite}
      />
      <div className="fixed bottom-5 px-3 left-0 flex flex-col justify-center w-full flex flex-col items-center z-20">
        <AddPassActionBar
          action={claimPassAction.bind(undefined, userIAM, brand.db.slug)}
        />
      </div>
    </ContainerWithBackground>
  );
}
