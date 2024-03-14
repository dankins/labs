import { unstable_cache } from "next/cache";
import { getBrandDetail } from "./getBrandDetail";
import { SanityImageType } from "libs/cake/pattern-library/core/src/images/utils";

export type getPublicBrandDetailReturnType = {
  name: string;
  logo: SanityImageType;
  heroPortrait: SanityImageType;
  heroLandscape: SanityImageType;
};
async function getPublicBrandDetail(
  slug: string
): Promise<getPublicBrandDetailReturnType> {
  const result = await getBrandDetail(slug);

  return {
    name: result.cms.name,
    logo: result.cms.passLogo!,
    heroPortrait: result.cms.passBackground!,
    heroLandscape: result.cms.passBackgroundDesktop!,
  };
}

export async function cachedGetPublicBrandInfo(slug: string) {
  const fn = unstable_cache(
    getPublicBrandDetail,
    [`get-public-brand-detail-${slug}`],
    {
      tags: [`get-public-brand-detail-${slug}`],
    }
  );

  return fn(slug);
}
