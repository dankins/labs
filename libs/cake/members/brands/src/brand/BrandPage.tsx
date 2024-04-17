import { BrandContent } from "./BrandContent";

export async function BrandPage({ slug }: { slug: string }) {
  return (
    <div className="">
      <BrandContent slug={slug} />
    </div>
  );
}
