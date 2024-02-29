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
import { AddPassActionBar } from "./AddPassActionBar";

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
    <div className="flex flex-col items-center bg-black pb-52 text-white">
      {/* ADD TO PASSES BUTTON (FIXED POSITION) */}
      <div className="fixed bottom-5 px-3 left-0 flex flex-col justify-center w-full flex flex-col items-center z-20">
        <AddPassActionBar
          action={claimPassAction.bind(undefined, brand.slug)}
        />
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full h-full rounded-lg shadow-2xl  bg-black relative">
        {/* HERO IMAGE / GRADIENT OVERLAY */}
        {brand.passBackground && (
          <div className="absolute top-0">
            <SanityArtDirection
              className="block w-screen h-auto"
              alt={"Background image"}
              images={[
                /*  DESKTOP */
                {
                  aspectRatio: "landscape",
                  mediaQuery: "(min-width:  764px)",
                  image: brand.passBackgroundDesktop,
                },
                /* MOBILE */
                {
                  aspectRatio: "portrait",
                  mediaQuery: "(max-width: 768px)",
                  image: brand.passBackground,
                },
              ]}
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute top-0 w-full h-full  margin-top-auto bg-gradient-to-t from-black to-black/50"></div>
          </div>
        )}

        {/* BRAND INFO */}
        <div className="absolute top-0 w-full h-full relative top-0 flex flex-col items-center md:flex-row md:items-start">
          {/* DESKTOP RIGHT PANEL */}
          <div className="md:p-[32px] md:min-w-[300px] md:max-w-[460px]">
            {/** LOGO */}
            <div className="mt-[150px] md:mt-0">
              {brand.passLogo ? (
                <LogoSpace>
                  <SanityImageServer
                    alt={`${brand.name} Logo`}
                    image={brand.passLogo}
                    height={0}
                    width={0}
                    style={{ height: "2.5rem", width: "auto" }}
                    sizes="(max-width: 768px) 480px, 1024px"
                  />
                </LogoSpace>
              ) : (
                <h1 className="text-white text-5xl">{brand.name}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
