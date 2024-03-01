import { BrandContent } from "./BrandContent";

export async function BrandPage({ slug }: { slug: string }) {
  return <BrandContent slug={slug} />;
}
