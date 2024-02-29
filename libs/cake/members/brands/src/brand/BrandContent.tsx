import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { Suspense, useMemo } from "react";
import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const [brand, { isMember, passportId, unclaimedPassCount, passes }] =
    await Promise.all([
      getBrandAdmin(slug),
      getMemberByIAM(userId, { passport: true }).then((member) => ({
        passes: member?.passport.passes || [],
        isMember: member?.passport.passes
          .map((p) => p.brand.slug)
          .includes(slug),
        passportId: member?.passport.id,
        passCount: member?.passport.passes.length || 1000,
        // TOOD(dankins): model this better
        unclaimedPassCount: 10 - (member?.passport.passes.length || 10),
      })),
    ]);

  const passportValue = passes.reduce((acc, cur) => {
    return (
      acc +
      cur.offers.reduce(
        (acc, cur) => acc + parseFloat(cur.template.offerValue),
        0
      )
    );
  }, 0);

  async function claimPassAction(slug: string) {
    "use server";
    console.log("claimPassAction", slug);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("ok");
      }, 4000);
    });
    // if (!passportId) {
    //   throw new Error("unknown passport id");
    // }
    // await db.transaction(async (tx) => {
    //   await createBrandPass(tx, passportId, slug);
    // });

    // revalidatePath("/passport");
    // revalidatePath("/brands");
    // revalidatePath(`/brands/${slug}`);
  }

  return (
    <ContainerWithBackground brand={brand}>
      <MobileNavSpacer />
      <Header brand={brand} />
      <Content brand={brand} />
    </ContainerWithBackground>
  );
}
