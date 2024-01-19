import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";
import { LogoSpace } from "@danklabs/cake/pattern-library/core";
import {
  createBrandPass,
  getMemberByIAM,
} from "@danklabs/cake/services/admin-service";
import { Button } from "@danklabs/pattern-library/core";
import { SanityImage } from "libs/cake/members/dashboard/src/SanityImage";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { SelectPassButton } from "./SelectPassButton";
import { auth } from "@clerk/nextjs";

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
    <div className="flex flex-col items-center ">
      <div className="md:max-w-[365px] min-h-screen bg-black w-full">
        <div
          className="w-full h-full max-w-[465px] rounded-lg shadow-2xl relative"
          style={{
            backgroundColor: brand.pass_color ? brand.pass_color.hex : "#000",
          }}
        >
          <div className="w-full aspect-[2/3] relative">
            {brand.passBackground && (
              <SanityImage
                alt={`${brand.name} Image`}
                image={brand.passBackground}
                height={0}
                width={0}
                style={{ height: "auto", width: "100%" }}
              />
            )}
            <div className="w-full h-full absolute top-0 margin-top-auto bg-gradient-to-t from-black to-black/50"></div>
            <div className="w-full h-full absolute top-0 mt-52 flex flex-col items-center">
              <div>
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
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm uppercase">Cake Benefits</h1>
                  <div className="p-4 rounded-md bg-[#111] w-full min-h-32 flex flex-col gap-4 items-center justify-center">
                    <div className="text-5xl text-[#FFE8A1] font-light">
                      $100
                    </div>
                    <div className="uppercase text-sm">
                      towards next purchase
                    </div>
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
                {passCount < 5 && !isMember && (
                  <div className="fixed bottom-10">
                    <SelectPassButton
                      claimPassAction={claimPassAction.bind(null, brand.slug)}
                    >
                      Add to My Passport
                    </SelectPassButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
