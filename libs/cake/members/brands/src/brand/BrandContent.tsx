import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";
import {
  Currency,
  LogoSpace,
  SanityArtDirection,
  SanityImageServer,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";
import {
  createBrandPass,
  getMemberByIAM,
} from "@danklabs/cake/services/admin-service";
import { SanityImage } from "@danklabs/cake/pattern-library/core";
import { revalidatePath } from "next/cache";
import { Suspense, useMemo } from "react";
import { SelectPassButton } from "./SelectPassButton";
import { auth } from "@clerk/nextjs";
import {
  AddIcon,
  ChevronRightIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { AddPassActionBar } from "./AddPassActionBar";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { ContainerWithBackground } from "./components/ContainerWithBackground";

export async function BrandContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>loading</div>;
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
      <Header brand={brand} />
      <Content brand={brand} />
    </ContainerWithBackground>
  );
}
