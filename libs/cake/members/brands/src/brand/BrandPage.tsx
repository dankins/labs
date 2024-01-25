import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";
import {
  Currency,
  LogoSpace,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";
import {
  createBrandPass,
  getMemberByIAM,
} from "@danklabs/cake/services/admin-service";
import { SanityImage } from "@danklabs/cake/pattern-library/core";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { SelectPassButton } from "./SelectPassButton";
import { auth } from "@clerk/nextjs";
import {
  AddIcon,
  ChevronRightIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";

export async function BrandPage({ slug }: { slug: string }) {
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

  const [brand, { isMember, passportId, passCount }] = await Promise.all([
    getBrandAdmin(slug),
    getMemberByIAM(userId, { passport: true }).then((member) => ({
      isMember: member?.passport.passes.map((p) => p.brand.slug).includes(slug),
      passportId: member?.passport.id,
      passCount: member?.passport.passes.length || 1000,
    })),
  ]);

  async function claimPassAction(slug: string) {
    "use server";
    if (!passportId) {
      throw new Error("unknown passport id");
    }
    await db.transaction(async (tx) => {
      await createBrandPass(tx, passportId, slug);
    });

    revalidatePath("/passport");
    revalidatePath("/brands");
    revalidatePath(`/brands/${slug}`);
  }

  return (
    <div className="flex flex-col items-center bg-black pb-52">
      {/* ADD TO PASSES BUTTON (FIXED POSITION) */}
      {passCount < 5 && !isMember && (
        <div className="fixed bottom-10 left-0 flex flex-col justify-center w-full flex flex-col items-center z-20">
          <div>
            <SelectPassButton
              claimPassAction={claimPassAction.bind(null, brand.slug)}
            >
              <AddIcon />
              Add to Passes
            </SelectPassButton>
          </div>
        </div>
      )}
      {/* MAIN CONTAINER */}
      <div className="w-full h-full max-w-[465px] rounded-lg shadow-2xl  bg-black relative">
        {/* HERO IMAGE / GRADIENT OVERLAY */}
        {brand.passBackground && (
          <div className="absolute top-0">
            <SanityImage
              alt={`${brand.name} Image`}
              image={brand.passBackground}
              height={0}
              width={0}
              style={{ height: "auto", width: "100%" }}
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute top-0 w-full h-full  margin-top-auto bg-gradient-to-t from-black to-black/50"></div>
          </div>
        )}

        {/* BRAND INFO */}
        <div className="absolute top-0 w-full h-full relative top-0 flex flex-col items-center">
          <div className="mt-[150px]">
            {brand.passLogo ? (
              <LogoSpace>
                <SanityImage
                  alt={`${brand.name} Logo`}
                  image={brand.passLogo}
                  height={0}
                  width={0}
                  style={{ height: "2.5rem", width: "auto" }}
                />
              </LogoSpace>
            ) : (
              <h1 className="text-white text-5xl">{brand.name}</h1>
            )}
          </div>
          <div className="w-full text-white mt-20 px-8 flex flex-col gap-4">
            <div className="text-base font-normal text-[#D5D5D5]">
              Reformation began selling vintage clothing out of a small Los
              Angeles storefront in 2009. We quickly expanded into making our
              own stuff, with a focus on sustainability. Today, we make
              effortless silhouettes that celebrate the feminine figure and
              pioneer sustainable practices, focusing on people and progress
              each step of the way.
            </div>
            <div>
              <OutlineButton
                background="transparent"
                textColor="white"
                className="text-xs"
              >
                <ChevronRightIcon /> <span>Shop {brand.name}</span>
              </OutlineButton>
            </div>
            <div className="flex flex-col gap-2">
              <SectionHeading>Cake Member Benefits</SectionHeading>
              <div className="p-4 rounded-md w-full min-h-32 flex flex-col gap-4 items-center justify-center">
                <WalletCard
                  content={
                    <div className="h-full flex flex-col justify-center items-center font-pizzaz gap-4">
                      <Currency amount={100} size={"5xl"} />
                      <div className="text-xs text-black font-semibold uppercase">
                        cake card
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
            <h1 className="text-sm uppercase">Social</h1>
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
              </div>
            </div>
            <h1 className="text-sm uppercase">{brand.name} Cake Content</h1>
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
                <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] flex flex-col gap-4 items-center justify-center">
                  <div className="uppercase text-sm">content</div>
                </div>
              </div>
            </div>
            {/* OFFERS */}
          </div>
        </div>
      </div>
    </div>
  );
}
