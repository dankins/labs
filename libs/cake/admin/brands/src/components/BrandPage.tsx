import { Suspense } from "react";
import { getBrand } from "../cms/queries/getBrand";
import { BrandOverview } from "./BrandOverview";

export function BrandPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Loaded slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading</div>;
}

async function Loaded({ slug }: { slug: string }) {
  const brand = await getBrand(slug);
  console.log({ brand, slug });

  return <BrandOverview {...brand} />;
}
