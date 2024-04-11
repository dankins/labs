import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import {
  brands,
  cachedGetBrandAdminOptions,
} from "@danklabs/cake/services/admin-service";
import { SanityImageServer } from "@danklabs/cake/pattern-library/core";

export async function BrandSwitcher({
  currentBrand,
}: {
  currentBrand: string;
}) {
  return (
    <Suspense>
      <BrandSwitcherComponent currentBrand={currentBrand} />
    </Suspense>
  );
}

function BrandSwitcherLoading() {
  return;
}

async function BrandSwitcherComponent({
  currentBrand,
}: {
  currentBrand: string;
}) {
  const { userId } = auth();
  const orgs = await cachedGetBrandAdminOptions(userId!);
  const adminBrands = await brands.getBrandsBySlug(orgs);
  return (
    <div className="h-[64px] w-full flex flex-row items-center p-3 bg-black">
      {Object.keys(adminBrands)
        .filter((brandSlug) => brandSlug === currentBrand)
        .map((brandSlug) => {
          return (
            <SanityImageServer
              key={brandSlug}
              alt={`${adminBrands[brandSlug].cms?.name} Logo`}
              image={adminBrands[brandSlug].cms?.passLogo!}
              width={257}
              height={48}
              style={{ height: "48px", width: "auto" }}
            />
          );
        })}
    </div>
  );
}
