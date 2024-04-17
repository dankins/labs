import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import { BrandContent } from "./BrandContent";

export async function BrandPage({ slug }: { slug: string }) {
  return (
    <>
      <MobileNavSpacer />
      <BrandContent slug={slug} />
    </>
  );
}
