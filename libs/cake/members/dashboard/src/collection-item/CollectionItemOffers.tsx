import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";

export async function CollectionItemOffers({ slug }: { slug: string }) {
  return (
    <Suspense>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

function Component({ slug }: { slug: string }) {
  return <div>collection item offer {slug}</div>;
}
