import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { Summary } from "./Summary";
import { CardGrid } from "./CardGrid";
import { brands, members } from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs/server";

export async function CollectionPanel({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Component searchParams={searchParams} />
    </Suspense>
  );
}

function Loading() {
  return <Spinner />;
}

async function Component({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth().protect();
  const member = await members.member.get(userId);

  const memberBrands = await brands.getBrandsBySlug(
    member.collection.brandSlugs
  );
  return (
    <div className="flex flex-col md:p-4 md:max-w-[720px] md:flex-wrap xl:w-[720px]">
      <Summary
        items={member.collection.count}
        maxItems={member.collection.maxCollectionItems}
        collectionValue={member.collection.value}
        isItemActive={!!searchParams?.collectionItem}
      />
      <CardGrid
        member={member}
        memberBrands={memberBrands}
        searchParams={searchParams}
      />
    </div>
  );
}
